from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import os
import aiofiles
from fastapi.responses import FileResponse
import time
import uvicorn
import anthropic
import json
from pydantic import BaseModel
from typing import Optional
from dotenv import dotenv_values
import base64 
import urllib

config = dotenv_values(".env") 
# Initialize FastAPI app
app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# File paths
LATEX_FILE = "latex.tex"
PDF_FILE = "latex.pdf"

# Initialize Anthropic client (you'll need to set the ANTHROPIC_API_KEY in your environment)
client = anthropic.Anthropic(
    api_key= config.get('ANTHROPIC_API_KEY')
)

def clean_latex_code(code: str) -> str:
    """Remove empty or whitespace-only lines from LaTeX code."""
    lines = code.splitlines()
    cleaned_lines = [line for line in lines if line.strip() != ""]
    return "\n".join(cleaned_lines)

class EngineeringPromptRequest(BaseModel):
    prompt: str
    document_type: Optional[str] = "general"
    complexity: Optional[str] = "standard"

@app.post("/generate-latex/")
async def generate_latex(request: EngineeringPromptRequest):
    try:
        # Craft the prompt for Claude with specific engineering document instructions
        system_prompt = f"""You are a LaTeX expert specialized in creating automotive engineering documents. 
        You will be given a description of an engineering document or drawing to create.
        You must respond ONLY with valid, compilable LaTeX code for a complete document.
        
        Document type: {request.document_type}
        Length of Document: {request.complexity}
        
        Guidelines:
        - Include all necessary LaTeX packages for engineering documents (tikz, amsmath, siunitx, etc.)
        - Structure the document with proper sections
        - Include a document class, begin and end document tags
        - For diagrams, use TikZ or similar LaTeX-native solutions. Make diagrams detailed and accurate.
        - Ensure all equations are properly formatted.
        - Do not explain the code, just provide the complete LaTeX document
        - Make sure the document is professional and well-structured.
        
        Respond with ONLY the LaTeX code, nothing else."""

        # Call the Claude API
        message = client.messages.create(
            model="claude-3-7-sonnet-20250219",
            max_tokens=4000,
            system=system_prompt,
            messages=[
                {"role": "user", "content": request.prompt}
            ]
        )

        # Extract LaTeX code from Claude's response
        latex_code = message.content[0].text
        
        # Clean and save the LaTeX code
        cleaned_code = clean_latex_code(latex_code)
        async with aiofiles.open(LATEX_FILE, "w", encoding="utf-8") as f:
            await f.write(cleaned_code)
            
        # Compile the LaTeX code into a PDF
        compile_result = compile_latex()
        
        if "error" in compile_result:
            return {
                "status": "error", 
                "message": compile_result["error"],
                "latex_code": cleaned_code
            }
        
       # Change the return statement to properly URL encode the LaTeX code
        return {
            "status": "success",
            "message": "Drawing processed and converted successfully",
            "latex_code": urllib.parse.quote(latex_code),  # Add this encoding
            "pdf_url": "/latex-pdf"
        }
            
    except Exception as e:
        return {"status": "error", "message": f"Failed to generate LaTeX: {str(e)}"}

@app.post("/update-latex/")
async def update_latex(latex_code: str = Form(...)):
    try:
        cleaned_code = clean_latex_code(latex_code)
        async with aiofiles.open(LATEX_FILE, "w", encoding="utf-8") as f:
            await f.write(cleaned_code)
        return {"message": "LaTeX code saved successfully"}
    except Exception as e:
        return {"error": f"Failed to save LaTeX code: {str(e)}"}

@app.post("/compile-latex/")
def compile_latex():
    if not os.path.exists(LATEX_FILE):
        return {"error": "LaTeX file not found"}
    
    try:
        result = subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", "-halt-on-error", LATEX_FILE],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Save logs for debugging
        with open("latex_output.log", "w", encoding="utf-8") as log_file:
            log_file.write(result.stdout + "\n" + result.stderr)
        
        # Optionally add a short delay to ensure the PDF is written fully
        time.sleep(2)
        
        if os.path.exists(PDF_FILE):
            return {"message": "PDF compiled successfully", "pdf_url": "/latex-pdf"}
        else:
            return {"error": "PDF file not found after compilation", "log": result.stdout}
    
    except subprocess.CalledProcessError as e:
        return {
            "error": "Compilation failed",
            "details": e.stderr
        }

@app.get("/latex-pdf/")
def get_pdf():
    if not os.path.exists(PDF_FILE):
        return {"error": "PDF file not found"}
    return FileResponse(PDF_FILE, media_type="application/pdf")


# Add these to your existing FastAPI app
class DrawingRequest(BaseModel):
    image_data: str  # Base64 encoded image
    description: str
    drawing_mode: str  # "engineering" or "math"

@app.post("/process-drawing/")
async def process_drawing(request: DrawingRequest):
    try:
        # Clean up the base64 data
        image_data = request.image_data
        if "," in image_data:
            image_data = image_data.split(",")[1]
        
        # Decode the base64 image
        image_bytes = base64.b64decode(image_data)
        
        # Save the image (optional, for debugging)
        image_path = "drawing.png"
        with open(image_path, "wb") as f:
            f.write(image_bytes)
        
      
        
        # Create different system prompts based on the drawing mode
        if request.drawing_mode == "engineering":
            system_prompt = """You are an expert engineering document creator. You'll receive a hand-drawn engineering sketch.
            
            Your task is to:
            1. Analyze the sketch and identify what type of engineering drawing it is (circuit diagram, mechanical part, flowchart, etc.)
            2. Generate complete, compilable LaTeX code that recreates the drawing in a professional format
            3. Use appropriate LaTeX packages like TikZ, circuitikz, or similar depending on the drawing type
            4. Improve upon the sketch by adding proper labels, dimensions, and technical details
            5. Include a complete LaTeX document structure with appropriate document class
            
            Respond with ONLY the complete LaTeX code, nothing else. Make sure it's compilable with pdflatex."""
        else:  # math mode
            system_prompt = """You are an expert in LaTeX mathematics. You'll receive a hand-drawn mathematical formula or equation.
            
            Your task is to:
            1. Analyze the sketch and identify the mathematical formula/equation
            2. Convert it to proper LaTeX math notation
            3. Generate a complete, compilable LaTeX document that shows the formula beautifully typeset
            4. Improve upon any unclear parts of the handwritten formula
            5. Add explanatory text around the formula if appropriate
            
            Respond with ONLY the complete LaTeX code, nothing else. Make sure it's compilable with pdflatex."""
        
        # Convert image to base64 for API
        image_base64 = base64.b64encode(image_bytes).decode("utf-8")
        
        # Call Claude with the image
        message = client.messages.create(
            model="claude-3-7-sonnet-20250219",
            max_tokens=4000,
            system=system_prompt,
            messages=[
                {
                    "role": "user", 
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/png",
                                "data": image_base64
                            }
                        },
                        {
                            "type": "text",
                            "text": f"Please convert this {request.drawing_mode} sketch into a professional LaTeX document."
                        }
                    ]
                }
            ]
        )
        
        # Extract LaTeX code from Claude's response
        latex_code = message.content[0].text
        
        # Save the LaTeX code
        async with aiofiles.open(LATEX_FILE, "w", encoding="utf-8") as f:
            await f.write(latex_code)
        
        # Compile the LaTeX to PDF
        result = subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", "-halt-on-error", LATEX_FILE],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Save logs for debugging
        with open("latex_output.log", "w", encoding="utf-8") as log_file:
            log_file.write(result.stdout + "\n" + result.stderr)
        
        # Check if PDF was created
        time.sleep(2)  # Small delay to ensure file is written
        
        if os.path.exists(PDF_FILE):
            return {
                "status": "success",
                "message": "Drawing processed and converted successfully",
                "latex_code": latex_code,
                "pdf_url": "/latex-pdf"
            }
        else:
            return {
                "status": "error",
                "message": "Failed to compile the LaTeX code",
                "latex_code": latex_code
            }
    
    except Exception as e:
        return {"status": "error", "message": f"Failed to process drawing: {str(e)}"}
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)