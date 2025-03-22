'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

export default function ManufacturingCell() {
  const [currentStage, setCurrentStage] = useState<number | null>(null);

  const stages = [
    {
      name: 'Stamping',
      href: '/manufacturing-cell/stamping',
      description: 'Metal is stamped to form a new Honda frame.',
      details: 'High-pressure stamping dies shape flat sheet metal into three-dimensional components with precision measured in microns. Using forces up to 5,000 tons, these massive presses transform raw steel into structural elements that will provide the vehicle\'s strength and safety. Each press stroke is carefully monitored by advanced sensors to ensure consistent quality across thousands of parts produced daily.',
      career: 'Process Engineer - Designs and optimizes stamping workflows, analyzing material flow and reducing waste while maintaining structural integrity.',
      skills: 'CAD, Material Science, Quality Control, Finite Element Analysis, Lean Manufacturing',
      image: '/process/stamping.avif',
      machineId: 'stamping-press',
    },
    {
      name: 'Welding',
      href: '/manufacturing-cell/welding',
      description: 'A robot welds a Honda vehicle\'s frame.',
      details: 'Advanced robotic welding systems use a combination of spot welding, laser welding, and MIG welding techniques to join stamped components into a rigid unibody structure. Each Honda vehicle contains approximately 5,000 welds, with robotic precision ensuring perfect placement within 0.1mm accuracy. The welding process generates temperatures exceeding 1,500°C, transforming separate metal pieces into a single structural unit designed to protect occupants in collisions.',
      career: 'Robotics Technician - Programs and maintains welding robots, calibrates welding parameters, and troubleshoots production issues to maintain quality standards.',
      skills: 'Robotics, Programming, Mechanical Systems, Metallurgy, Electrical Maintenance, Automation',
      image: '/process/welding.avif',
      machineId: 'robotic-welder',
    },
    {
      name: 'Painting',
      href: '/manufacturing-cell/painting',
      description: 'A freshly painted Honda frame.',
      details: 'The painting process involves multiple precise layers: phosphate coating for corrosion resistance, electrodeposition primer applied using electrical current, sealer for waterproofing, basecoat for color, and clearcoat for UV protection and gloss. The entire vehicle body passes through immersion tanks and specially-designed spray booths where electrostatic applicators ensure even coverage with minimal overspray. Between coats, the body undergoes carefully controlled curing in ovens that reach temperatures of 140°C to catalyze chemical bonding of the paint molecules.',
      career: 'Paint Process Specialist - Ensures coating quality and efficiency, monitors environmental controls, and develops solutions for complex finishing challenges.',
      skills: 'Chemical Engineering, Automation, Safety Standards, Environmental Management, Color Theory, Process Control',
      image: '/process/painting.webp',
      machineId: 'painting-robot',
    },
    {
      name: 'Final Assembly',
      href: '/manufacturing-cell/final-assembly',
      description: 'A Honda associate inspects a new vehicle.',
      details: 'Final assembly represents the culmination of thousands of precision operations as the painted body structure is united with the powertrain, interior components, electronics systems, and exterior trim. Following a carefully choreographed sequence, both robotic systems and skilled associates install over 30,000 individual parts. Each vehicle moves along the assembly line at a precisely calculated pace, with specific operations timed to the second. Quality verification occurs at every stage, with multiple inspection points using computer vision systems, dimensional scanners, and tactile testing to verify fit, finish, and functionality.',
      career: 'Assembly Line Supervisor - Oversees production flow and quality standards, coordinates team activities, and implements continuous improvement initiatives to enhance efficiency and product quality.',
      skills: 'Team Management, Lean Manufacturing, Attention to Detail, Process Optimization, Problem Solving, Technical Troubleshooting, Safety Leadership',
      image: '/process/final-assembly.avif',
      machineId: 'conveyor',
    },
  ];

  const handleStart = () => setCurrentStage(0);
  const handleNext = () => setCurrentStage((prev) => (prev !== null && prev < stages.length - 1 ? prev + 1 : prev));
  const handleBack = () => setCurrentStage((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  const handleExit = () => setCurrentStage(null);

  return (
    <div className="min-h-screen bg-gray-200 overflow-hidden">
      <header className="py-8 text-center bg-gradient-to-b from-gray-950 to-gray-900">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Journey Through Manufacturing</h1>
      </header>

      {currentStage === null ? (
        <div className="flex items-center justify-center min-h-[50vh] bg-gradient-to-b from-gray-900 to-gray-950">
          <motion.button
            className="inline-flex items-center px-6 py-5 bg-red-500 text-gray-900 font-medium rounded-md hover:bg-red-400 transition-colors duration-300"
            onClick={handleStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Start Your Journey
          </motion.button>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-300 py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              className="bg-gray-200 p-8 rounded-lg border border-gray-800 w-full max-w-4xl mx-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">{stages[currentStage].name}</h2>
              <div className="mb-6 relative h-64 overflow-hidden rounded-md">
                <Image
                  src={stages[currentStage].image}
                  alt={stages[currentStage].description}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-400 mb-6">{stages[currentStage].description}</p>
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-red-500 mb-2">Process:</h3>
                  <p className="text-gray-400 text-sm">{stages[currentStage].details}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-red-500 mb-2">Career Spotlight:</h3>
                  <p className="text-gray-400 text-sm">{stages[currentStage].career}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-red-500 mb-2">Skills to Learn:</h3>
                  <p className="text-gray-400 text-sm">{stages[currentStage].skills}</p>
                </div>
              </div>
              <Link
                href={`${stages[currentStage].href}/3d/${stages[currentStage].machineId}`}
                className="inline-flex items-center px-4 py-2 bg-cyan-500 text-gray-900 font-medium rounded-md hover:bg-cyan-400 transition-colors duration-300 mb-6"
              >
                View 3D Model
              </Link>
              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                <button
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleBack}
                  disabled={currentStage === 0}
                >
                  Back
                </button>
                <span className="text-gray-400 text-sm">
                  Step {currentStage + 1} of {stages.length}
                </span>
                {currentStage < stages.length - 1 ? (
                  <button 
                    className="px-4 py-2 bg-red-500 text-gray-900 rounded-md hover:bg-red-400" 
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  <Link 
                    href="question" 
                    className="px-4 py-2 bg-red-500 text-gray-900 rounded-md hover:bg-red-400"
                  >
                    Check Your Knowledge
                  </Link>
                )}
              </div>
              <button 
                className="w-full mt-6 py-2 border border-gray-800 text-gray-400 rounded-md hover:border-red-700 hover:text-red-500 transition-colors" 
                onClick={handleExit}
              >
                Exit Journey
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <footer className="bg-gray-300 py-6 text-center border-t border-gray-800">
        <p className="text-gray-500 text-sm">© 2025 Otto. All rights reserved.</p>
      </footer>
    </div>
  );
}