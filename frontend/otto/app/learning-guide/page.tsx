// pages/expert-answers.tsx
'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

interface ExpertAnswer {
  id: number;
  phase: string;
  summary: string;
  detailedExplanation: string;
  bestPractices: string[];
  color: string;
}

const ExpertAnswersPage = () => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<ExpertAnswer | null>(null);

  const expertAnswers: ExpertAnswer[] = [
    {
      id: 1,
      phase: "Stamping",
      summary: "CNC-controlled precision stamping",
      detailedExplanation: "Expert stamping utilizes computer numerical control (CNC) presses with automated die protection and real-time force monitoring. Integrated quality control systems check tolerances post-stamping, reducing waste and ensuring consistent part quality across production runs.",
      bestPractices: [
        "Automated material feeding",
        "Die protection sensors",
        "Regular calibration",
        "Detailed production logging"
      ],
      color: "bg-blue-500"
    },
    {
      id: 2,
      phase: "Welding",
      summary: "Robotic welding with safety systems",
      detailedExplanation: "Professional welding employs robotic arms for precision and consistency, using advanced shielding gases. Comprehensive ventilation removes fumes, while regular maintenance and multi-technique training ensure high-quality welds.",
      bestPractices: [
        "Robotic welding for volume",
        "Fume extraction systems",
        "Weld strength testing",
        "Staff training programs"
      ],
      color: "bg-green-500"
    },
    {
      id: 3,
      phase: "Painting",
      summary: "Automated electrostatic painting",
      detailedExplanation: "Expert painting uses automated spray booths with controlled conditions and electrostatic technology for even coating. Paint thickness is monitored automatically, and recovery systems minimize waste during application.",
      bestPractices: [
        "Environmental control",
        "Electrostatic application",
        "Paint recycling",
        "Thickness monitoring"
      ],
      color: "bg-purple-500"
    },
    {
      id: 4,
      phase: "Assembly",
      summary: "Lean assembly with standardization",
      detailedExplanation: "Professional assembly follows lean principles with ergonomic workstations and digital instructions. Jigs and fixtures ensure consistency, while AGVs deliver parts just-in-time, and quality checks occur at each station.",
      bestPractices: [
        "Ergonomic workstations",
        "Assembly jigs",
        "Digital instructions",
        "Time studies"
      ],
      color: "bg-orange-500"
    }
  ];

  const handleTileClick = (answer: ExpertAnswer) => {
    setSelectedAnswer(selectedAnswer?.id === answer.id ? null : answer);
  };

  const handleBackToLearning = () => {
    router.push('/learning-guide');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Expert Manufacturing Answers</title>
        <meta name="description" content="Expert answers for manufacturing processes" />
      </Head>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Expert Manufacturing Answers
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-lg">
            Click a tile to explore expert approaches to each phase
          </p>
        </div>

        {/* Tile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertAnswers.map((answer) => (
            <div
              key={answer.id}
              className={`group relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300
                ${answer.color} hover:scale-105 hover:shadow-xl`}
              onClick={() => handleTileClick(answer)}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="relative p-6 h-full flex flex-col justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{answer.phase}</h2>
                  <p className="text-sm opacity-90">{answer.summary}</p>
                </div>
                <div className="text-sm font-medium bg-white bg-opacity-20 rounded-full px-3 py-1 w-fit">
                  Click to Review
                </div>
              </div>

              {/* Expanded View */}
              {selectedAnswer?.id === answer.id && (
                <div className="absolute inset-0 bg-white p-6 overflow-y-auto z-10">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">{answer.phase}</h3>
                    
                    <div>
                      <h4 className="text-gray-800 font-medium">Expert Approach</h4>
                      <p className="mt-1 text-gray-600 text-sm">{answer.detailedExplanation}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-gray-800 font-medium">Best Practices</h4>
                      <ul className="mt-1 space-y-2 text-sm">
                        {answer.bestPractices.map((practice, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className={`flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full ${answer.color}`}></span>
                            <span className="text-gray-600">{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleBackToLearning}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg
              hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500
              transition-all duration-200 font-medium text-lg"
          >
            Back to Learning Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertAnswersPage;