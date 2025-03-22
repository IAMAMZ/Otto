// pages/questionnaire.tsx
'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Types remain the same
interface Question {
  id: number;
  text: string;
}

interface Feedback {
  overallFeedback: string;
  score: number;
  detailedFeedback: string[];
  improvementSuggestions: string[];
}

const ManufacturingQuestionnairePage = () => {
  const questions: Question[] = [
    { id: 1, text: "How do you approach the STAMPING phase of your manufacturing process?" },
    { id: 2, text: "How do you handle the WELDING phase of your manufacturing process?" },
    { id: 3, text: "How do you manage the PAINTING phase of your manufacturing process?" },
    { id: 4, text: "How do you conduct the ASSEMBLY phase of your manufacturing process?" },
  ];

  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const submitAnswers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = `...`; // Keep your existing prompt
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
      const data = await response.json();
      setFeedback(data.feedback);
      setShowFeedback(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to evaluate answers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setShowFeedback(false);
  };

  const proceedToDesigner = () => {
    const router = useRouter();
    // Using router with query parameters
    router.push({
      pathname: '/learning-guide',
      query: {
        answers: JSON.stringify(answers),
        feedback: JSON.stringify(feedback)
      }
    });
  };

  const allQuestionsAnswered = answers.every(answer => answer.trim() !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Manufacturing Process Assessment</title>
        <meta name="description" content="Stamping, Welding, Painting, and Assembly Manufacturing Process Assessment" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10">
            {!showFeedback ? (
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Manufacturing Process Assessment
                  </h1>
                  <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                    Share details about your manufacturing phases to receive AI-powered feedback
                  </p>
                </div>

                {questions.map((question, qIndex) => (
                  <div key={question.id} className="space-y-4">
                    <label 
                      htmlFor={`question-${qIndex}`}
                      className="block text-lg font-medium text-gray-900"
                    >
                      <span className="text-blue-600">{question.id}.</span> {question.text}
                    </label>
                    <textarea
                      id={`question-${qIndex}`}
                      value={answers[qIndex]}
                      onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                      className="w-full min-h-[120px] p-4 border border-gray-200 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        transition-all duration-200 resize-y shadow-sm
                        hover:border-gray-300"
                      placeholder="Describe your process in detail..."
                    />
                  </div>
                ))}

                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}

                <button
                  onClick={submitAnswers}
                  disabled={!allQuestionsAnswered || isLoading}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg
                    font-medium disabled:bg-gray-400 disabled:cursor-not-allowed
                    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:ring-offset-2 transition-all duration-200 flex items-center justify-center
                    mx-auto"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Evaluating...
                    </>
                  ) : (
                    'Get Assessment'
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Assessment Results
                  </h1>
                  <p className="mt-3 text-gray-600">Your manufacturing process evaluation</p>
                </div>

                {feedback && (
                  <>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-100">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-blue-900">
                          Score: {feedback.score}/20
                        </h2>
                        <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium">
                          {Math.round((feedback.score / 20) * 100)}%
                        </span>
                      </div>
                      <p className="text-gray-700">{feedback.overallFeedback}</p>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900">Phase Feedback</h3>
                      {questions.map((question, index) => (
                        <div key={question.id} className="bg-gray-50 p-5 rounded-xl">
                          <p className="font-medium text-gray-900">{question.text}</p>
                          <p className="mt-2 text-gray-600">
                            <span className="font-medium">Your response:</span> {answers[index]}
                          </p>
                          <p className="mt-2 text-blue-700 font-medium">
                            Feedback: {feedback.detailedFeedback[index]}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-100">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">
                        Improvement Recommendations
                      </h3>
                      <ul className="space-y-3">
                        {feedback.improvementSuggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-2 h-2 mt-2 bg-green-500 rounded-full"></span>
                            <span className="text-gray-700">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleEdit}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg
                      hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500
                      transition-all duration-200 font-medium"
                  >
                    Edit Responses
                  </button>
                  <button
                    onClick={proceedToDesigner}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg
                      hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
                      transition-all duration-200 font-medium"
                  >
                    Proceed to Designer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturingQuestionnairePage;