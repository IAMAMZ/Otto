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
      handsOn: 'Try our interactive stamping simulation where you can adjust pressure settings and observe how different metal gauges respond. Using our tactile feedback controller, feel the resistance as metal forms into complex shapes. You can also examine actual stamped parts at different stages of production to understand the progressive die process.',
      funFacts: 'A single Honda vehicle contains over 300 stamped parts. The largest stamping presses stand over 30 feet tall and weigh as much as 3,000 tons - equivalent to 500 elephants!',
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
      handsOn: 'Experience our virtual welding booth where you can practice MIG and spot welding techniques using AR technology. Wear our haptic gloves to feel simulated resistance and heat as you practice creating the perfect weld. Examine cross-sectioned welds under a digital microscope to understand the molecular bonding that occurs during the process.',
      funFacts: 'Honda\'s welding robots can perform up to 160 welds per minute. The entire vehicle body structure is assembled in less than 60 seconds. Modern welding robots have six axes of movement, allowing them to reach virtually any position around the vehicle frame.',
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
      handsOn: 'Use our paint viscosity testing station to understand how paint composition affects finish quality. Try the electrostatic spray simulator to see how charged particles create even coverage. In our color lab, mix virtual paint formulas to create Honda\'s signature colors and observe how different lighting conditions affect color perception.',
      funFacts: 'A typical Honda vehicle receives seven distinct layers of coatings, totaling just 0.1mm in thickness. The painting facility uses water-based paints that reduce volatile organic compounds by 80% compared to solvent-based systems. Honda\'s paint booths filter air to be cleaner than hospital operating rooms, ensuring a flawless finish.',
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
      handsOn: 'Try our timed assembly challenge where you can install components following the same procedures used on the production line. Use our torque-sensing tools to experience the precise specifications required for each fastener. Participate in our virtual quality inspection station to identify production anomalies using the same criteria as Honda inspectors.',
      funFacts: 'Honda\'s assembly lines are balanced to produce a complete vehicle every 60 seconds. Each associate is empowered to stop the production line if they detect a quality issue. The average Honda vehicle contains more computing power than the Apollo spacecraft that landed on the moon.',
    },
  ];

  const handleStart = () => setCurrentStage(0);
  const handleNext = () => setCurrentStage((prev) => (prev !== null && prev < stages.length - 1 ? prev + 1 : prev));
  const handleBack = () => setCurrentStage((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  const handleExit = () => setCurrentStage(null);

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Journey Through Manufacturing</h1>
      </header>

      {currentStage === null ? (
        <motion.button
          className="start-button"
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Start Your Journey
        </motion.button>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            className="stage-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="stage-title">{stages[currentStage].name}</h2>
            <div className="stage-image-container">
              <Image
                src={stages[currentStage].image}
                alt={stages[currentStage].description}
                width={400}
                height={200}
                className="stage-image"
              />
            </div>
            <p className="stage-description">{stages[currentStage].description}</p>
            <div className="stage-details">
              <p><strong>Process:</strong> {stages[currentStage].details}</p>
              <p><strong>Career Spotlight:</strong> {stages[currentStage].career}</p>
              <p><strong>Skills to Learn:</strong> {stages[currentStage].skills}</p>
              <div className="hands-on-section">
                <h3>Hands-On Experience:</h3>
                <p>{stages[currentStage].handsOn}</p>
              </div>
              <div className="fun-facts-section">
                <h3>Did You Know?</h3>
                <p>{stages[currentStage].funFacts}</p>
              </div>
            </div>
            <Link
              href={`${stages[currentStage].href}/3d/${stages[currentStage].machineId}`}
              className="view-3d-btn"
            >
              View 3D Model
            </Link>
            <div className="stage-navigation">
              <button
                className="nav-button"
                onClick={handleBack}
                disabled={currentStage === 0}
              >
                Back
              </button>
              <span className="progress">
                Step {currentStage + 1} of {stages.length}
              </span>
              {currentStage < stages.length - 1 ? (
                <button className="nav-button" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <Link href="question" className="nav-button explore-link">
                  Check Your Knowledge
                </Link>
              )}
            </div>
            <button className="exit-button" onClick={handleExit}>
              Exit Journey
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}