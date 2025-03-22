# LaTeX Render Backend

## Installation

```bash
pip install -r requirements.txt
```

## Setup Environment Variables

Create a `.env` file in the root directory and add the following variables:

```bash
ANTHROPIC_API_KEY=your_api_key
```

## Running the Application

```bash
python -m uvicorn main:app --reload
```
**NOTE:**
- The uvicorn command is not available in the virtual environment. Use the python -m uvicorn command instead.

## API Endpoints

- `POST /generate-latex/`: Generate LaTex code
- `POST /update-latex/`: Update LaTeX code
- `POST /compile-latex/`: Compile LaTeX code
- `POST /latex-pdf/`: Get compiled PDF
- `POST /process-drawing/`: Process hand-drawn image 


## Install Latex
- Istall MiKTeX or similar tool that make `pdflatex` command is available in cli. 
- Set the system PATH of the `pdflatex` tool it if not already accessible.

### For Windows
- Download and Install MiKTeX software

### For Mac
```
brew install basictex
```
```
sudo tlmgr update --self
sudo tlmgr install collection-latexextra
```