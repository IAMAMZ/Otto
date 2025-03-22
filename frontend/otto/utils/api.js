import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// utils/api.js

// utils/api.js

export async function updateLatex(latexCode) {
    try {
        const formData = new FormData();
        formData.append('latex_code', latexCode);

        const response = await fetch('http://127.0.0.1:8000/update-latex/', {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error('Error updating LaTeX:', error);
        return { error: 'Failed to send LaTeX to server' };
    }
}

export async function compileLatex() {
    try {
        const response = await fetch('http://127.0.0.1:8000/compile-latex/', {
            method: 'POST',
        });

        return await response.json();
    } catch (error) {
        console.error('Error compiling LaTeX:', error);
        return { error: 'Failed to compile LaTeX' };
    }
}




export function getPDFUrl() {
    return `${BASE_URL}/latex-pdf/`;
}