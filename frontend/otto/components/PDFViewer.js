"use client";  // Required for Next.js 13+ (App Router) to use hooks

import { useState, useEffect } from "react";
import { updateLatex, compileLatex, getPDFUrl } from "../utils/api";

export default function PDFViewer() {
    const [prompt, setPrompt] = useState("");
    const [latexCode, setLatexCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [pdfReady, setPdfReady] = useState(false);
    const [error, setError] = useState("");
    const [documentType, setDocumentType] = useState("general");
    const [complexity, setComplexity] = useState("standard");
    const [pdfUrl, setPdfUrl] = useState("http://127.0.0.1:8000/latex-pdf/");
    const [isDemoMode, setIsDemoMode] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Please describe your dream design");
            return;
        }

        try {
            setError("");
            setLoading(true);
            setPdfReady(false);

            // Check for demo shortcut phrase
            if (prompt.trim().toLowerCase() === "make shaft component") {
                setIsDemoMode(true);
                // Use setTimeout to simulate a brief loading period
                setTimeout(() => {
                    // Set the PDF URL to the static file in the public folder
                    setPdfUrl("/static/shaft-component.pdf");
                    setLatexCode("% Demo LaTeX code for shaft component\n\\documentclass{article}\n\\usepackage{tikz}\n\\begin{document}\n\\section{Shaft Component Specifications}\n% Full LaTeX code hidden for demo purposes\n\\end{document}");
                    setPdfReady(true);
                    setLoading(false);
                }, 3000); // 3 second delay for demo mode

                return;
            }

            setIsDemoMode(false);
            // Reset to default PDF URL for normal operation
            setPdfUrl("http://127.0.0.1:8000/latex-pdf/");

            // Call the normal AI endpoint
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
            setError("An error occurred during engineering plan generation");
            console.error(err);
        } finally {
            if (!isDemoMode) {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-red-600 px-6 py-4">
                    <h1 className="text-2xl font-bold text-white">Dreammaker</h1>
                    <p className="text-white text-sm mt-1">Where students' design dreams become engineering reality</p>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                            Describe your dream design
                        </label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Example: A solar-powered drone with foldable wings that can monitor crop health in agricultural fields..."
                            className="w-full h-36 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                                    Document Detail Level
                                </label>
                                <select
                                    id="complexity"
                                    value={complexity}
                                    onChange={(e) => setComplexity(e.target.value)}
                                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="simple">Basic</option>
                                    <option value="standard">Standard</option>
                                    <option value="complex">Detailed and Complex</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating your design...
                            </span>
                        ) : (
                            "Make My Dream"
                        )}
                    </button>
                </div>

                {pdfReady && (
                    <div className="mt-4 border-t border-gray-200 p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Your Engineering Plan</h2>
                        <div className="bg-gray-100 p-1 rounded-lg shadow-inner">
                            <iframe
                                src={pdfUrl}
                                width="100%"
                                height="600"
                                title="Generated Engineering Plan"
                                className="border-0 rounded"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
                Dreammaker - Turning imagination into detailed engineering specifications
            </div>
        </div>
    );
}