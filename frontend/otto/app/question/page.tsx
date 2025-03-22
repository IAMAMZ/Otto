// pages/questionnaire.tsx
'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

// Types
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
  const router = useRouter();
  
  const questions: Question[] = [
    { id: 1, text: "How do you approach the STAMPING phase of your manufacturing process?" },
    { id: 2, text: "How do you handle the WELDING phase of your manufacturing process?" },
    { id: 3, text: "How do you manage the PAINTING phase of your manufacturing process?" },
    { id: 4, text: "How do you conduct the ASSEMBLY phase of your manufacturing process?" },
  ];

  // Example high-quality answers
  const exampleAnswers = [
    "Our stamping process uses precision dies with tolerances of +/-0.05mm to create structural components. We've implemented real-time monitoring systems that analyze pressure distribution and material flow during each press stroke. This allows us to detect and correct deviations before they impact part quality. We currently operate with a 99.7% first-time quality rate and cycle times of 12 seconds per component across our stamping lines.",
    
    "For welding, we employ a combination of robotic MIG and laser welding systems with 6-axis movement capability. Each vehicle frame undergoes 4,200+ precision welds monitored by thermal imaging and ultrasonic testing. Our proprietary weld sequencing minimizes heat distortion while maximizing structural integrity. We've reduced spatter by 85% through advanced parameter optimization and maintain 99.9% weld integrity rates across all safety-critical joints.",
    
    "Our painting process utilizes waterborne basecoats and low-VOC clearcoats applied in climate-controlled spray booths with HEPA filtration. We maintain strict environmental parameters (humidity at 65% ±3%, temperature at 23°C ±1°C) during application. Advanced electrostatic sprayers achieve 94% transfer efficiency, significantly reducing material waste. Every vehicle undergoes automated thickness and uniformity testing, with results digitally logged for traceability.",
    
    "Our assembly operations combine skilled associates with collaborative robots in a synchronized workflow. We use electronic torque monitoring for all critical fasteners, with 100% verification and data logging. Modular sub-assembly stations feed the main line using just-in-time delivery systems. Each vehicle passes through 32 quality verification stations before completion, including dimensional scanning, electrical testing, water ingress evaluation, and dynamic performance assessment. Our first-time-through rate exceeds 98.5%."
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
      // Simulating API response for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate feedback based on answers
      const feedbackData: Feedback = {
        overallFeedback: "Your manufacturing process shows a good understanding of core principles with opportunities for further optimization in precision, automation, and quality verification systems.",
        score: Math.floor(Math.random() * 6) + 15, // Random score between 15-20
        detailedFeedback: [
          "Your stamping approach demonstrates technical knowledge. Consider implementing real-time monitoring systems for predictive maintenance.",
          "Your welding process is well-articulated. Exploring automated weld quality verification could further enhance reliability.",
          "Your painting process shows attention to detail. Integrating more environmental sustainability metrics would strengthen this phase.",
          "Your assembly process is comprehensive. Further automation in quality verification could improve consistency and traceability."
        ],
        improvementSuggestions: [
          "Implement IoT sensors for predictive maintenance across all manufacturing phases",
          "Enhance real-time quality verification with machine learning algorithms",
          "Develop digital twin technology to simulate process improvements before implementation",
          "Optimize material flow and reduce work-in-progress inventory between manufacturing phases",
          "Implement advanced data analytics for cross-phase process optimization"
        ]
      };
      
      setFeedback(feedbackData);
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
    router.push('/drawing');
  };

  const fillExampleAnswers = () => {
    setAnswers([...exampleAnswers]);
  };

  const allQuestionsAnswered = answers.every(answer => answer.trim() !== '');

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Manufacturing Process Assessment</title>
        <meta name="description" content="Stamping, Welding, Painting, and Assembly Manufacturing Process Assessment" />
      </Head>

      <header className="py-8 text-center bg-gradient-to-r from-red-600 to-red-800">
        <h1 className="text-4xl font-bold text-white">
          Manufacturing Process Assessment
        </h1>
        <p className="mt-3 text-blue-100 max-w-2xl mx-auto">
          Share details about your manufacturing phases to receive AI-powered feedback
        </p>
      </header>

      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="p-8">
            {!showFeedback ? (
              <div className="space-y-8">
                <button
                  onClick={fillExampleAnswers}
                  className="text-sm px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors border border-gray-300"
                >
                  Fill with Example Answers
                </button>

                {questions.map((question, qIndex) => (
                  <div key={question.id} className="space-y-3">
                    <label 
                      htmlFor={`question-${qIndex}`}
                      className="block text-lg font-medium text-gray-800"
                    >
                      <span className="text-blue-600 font-bold">{question.id}.</span> {question.text}
                    </label>
                    <textarea
                      id={`question-${qIndex}`}
                      value={answers[qIndex]}
                      onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                      className="w-full min-h-[120px] p-4 bg-gray-50 border border-gray-300 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        transition-all duration-200 resize-y shadow-sm text-gray-800"
                      placeholder="Describe your process in detail..."
                    />
                  </div>
                ))}

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-center gap-2">
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
                    font-medium disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
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
                  <h2 className="text-2xl font-bold text-blue-700">
                    Assessment Results
                  </h2>
                  <p className="mt-2 text-gray-600">Your manufacturing process evaluation</p>
                </div>

                {feedback && (
                  <>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-blue-800">
                          Score: {feedback.score}/20
                        </h2>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {Math.round((feedback.score / 20) * 100)}%
                        </span>
                      </div>
                      <p className="text-gray-700">{feedback.overallFeedback}</p>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-800">Phase Feedback</h3>
                      {questions.map((question, index) => (
                        <div key={question.id} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                          <p className="font-medium text-blue-700">{question.text}</p>
                          <p className="mt-2 text-gray-700">
                            <span className="font-medium text-gray-900">Your response:</span> {answers[index]}
                          </p>
                          <p className="mt-4 text-blue-600 font-medium">
                            Feedback: {feedback.detailedFeedback[index]}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold text-green-700 mb-4">
                        Improvement Recommendations
                      </h3>
                      <ul className="space-y-3">
                        {feedback.improvementSuggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
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
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg border border-gray-300
                      hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400
                      transition-all duration-200 font-medium"
                  >
                    Edit Responses
                  </button>
                  <button
                    onClick={proceedToDesigner}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg
                      hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                      transition-all duration-200 font-medium"
                  >
                    Proceed to the Dream Space
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 py-6 text-center border-t border-gray-200 mt-8">
        <p className="text-gray-600">© 2025 Otto. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ManufacturingQuestionnairePage;