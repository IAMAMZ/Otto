"use client";  // Required for Next.js 13+ (App Router) to use hooks

import { useState } from "react";
import { updateLatex, compileLatex, getPDFUrl } from "../utils/api";

export default function PDFViewer() {
    const [prompt, setPrompt] = useState("");
    const [latexCode, setLatexCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [pdfReady, setPdfReady] = useState(false);
    const [error, setError] = useState("");
    const [mode, setMode] = useState("ai"); // "ai" or "manual"
    const [documentType, setDocumentType] = useState("general");
    const [complexity, setComplexity] = useState("standard");

    const handleGenerateAI = async () => {
        if (!prompt.trim()) {
            setError("Please enter a description of the engineering document you need");
            return;
        }

        try {
            setError("");
            setLoading(true);
            setPdfReady(false);

            // Call the new AI endpoint
            const response = await fetch("http://127.0.0.1:8000/generate-latex/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt,
                    document_type: documentType,
                    complexity: complexity
                }),
            });

            const data = await response.json();

            if (data.status === "error") {
                setError(data.message);
                if (data.latex_code) {
                    setLatexCode(data.latex_code);
                }
            } else {
                setLatexCode(data.latex_code);
                setPdfReady(true);
            }
        } catch (err) {
            setError("An error occurred during PDF generation");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateManual = async () => {
        if (!latexCode.trim()) {
            setError("Please enter LaTeX code");
            return;
        }

        try {
            setError("");
            setLoading(true);
            setPdfReady(false);

            // 1) Send LaTeX code to backend
            const saveRes = await updateLatex(latexCode);
            if (saveRes.error) {
                setError(saveRes.error);
                return;
            }

            // 2) Compile the PDF
            const compileRes = await compileLatex();
            if (compileRes.error) {
                setError(compileRes.error);
            } else if (compileRes.pdf_url) {
                setPdfReady(true);
            } else {
                setError("Failed to generate PDF");
            }
        } catch (err) {
            setError("An error occurred during PDF generation");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-indigo-600 px-6 py-4">
                    <h1 className="text-2xl font-bold text-white">Engineering Document Generator</h1>
                </div>

                <div className="p-6">
                    <div className="mb-6 flex space-x-4">
                        <button
                            onClick={() => setMode("ai")}
                            className={`px-4 py-2 rounded-md font-medium transition-colors ${mode === "ai"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            AI Assistant
                        </button>
                        <button
                            onClick={() => setMode("manual")}
                            className={`px-4 py-2 rounded-md font-medium transition-colors ${mode === "manual"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            Manual LaTeX
                        </button>
                    </div>

                    {mode === "ai" && (
                        <div className="mb-6">
                            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                                Describe the engineering document you need
                            </label>
                            <textarea
                                id="prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Example: Create a circuit diagram for a simple RC filter with a 10k resistor and 0.1uF capacitor..."
                                className="w-full h-36 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-2">
                                        Document Type
                                    </label>
                                    <select
                                        id="documentType"
                                        value={documentType}
                                        onChange={(e) => setDocumentType(e.target.value)}
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="general">General</option>
                                        <option value="circuit_diagram">Circuit Diagram</option>
                                        <option value="mechanical_drawing">Mechanical Drawing</option>
                                        <option value="flow_chart">Flow Chart</option>
                                        <option value="technical_report">Technical Report</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="complexity" className="block text-sm font-medium text-gray-700 mb-2">
                                        Complexity
                                    </label>
                                    <select
                                        id="complexity"
                                        value={complexity}
                                        onChange={(e) => setComplexity(e.target.value)}
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="simple">Simple</option>
                                        <option value="standard">Standard</option>
                                        <option value="complex">Complex</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {(mode === "manual" || latexCode) && (
                        <div className="mb-6">
                            <label htmlFor="latexCode" className="block text-sm font-medium text-gray-700 mb-2">
                                LaTeX Code
                            </label>
                            <textarea
                                id="latexCode"
                                value={latexCode}
                                onChange={(e) => setLatexCode(e.target.value)}
                                placeholder="Enter your LaTeX code here..."
                                className="w-full h-64 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                            />
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={mode === "ai" ? handleGenerateAI : handleGenerateManual}
                        disabled={loading}
                        className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {mode === "ai" ? "Generating..." : "Compiling..."}
                            </span>
                        ) : (
                            mode === "ai" ? "Generate Document" : "Compile PDF"
                        )}
                    </button>
                </div>

                {pdfReady && (
                    <div className="mt-4 border-t border-gray-200 p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Generated PDF</h2>
                        <div className="bg-gray-100 p-1 rounded-lg shadow-inner">
                            <iframe
                                src="http://127.0.0.1:8000/latex-pdf/"
                                width="100%"
                                height="600"
                                title="Generated PDF"
                                className="border-0 rounded"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
                Generate professional engineering documents from simple descriptions
            </div>
        </div>
    );
}