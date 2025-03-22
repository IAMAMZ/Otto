import Link from 'next/link';
import Image from 'next/image';
import '../styles.css';

export default function FinalAssembly() {
  const machines = [
    { name: 'Assembly Line Conveyor', id: 'conveyor' },
    { name: 'Torque Wrench Robot', id: 'torque-robot' },
    { name: 'Quality Inspection Station', id: 'inspection-station' },
  ];

  return (
    <div className="container">
      <h1>Final Assembly</h1>
      <p className="intro">
        Final assembly brings the Honda vehicle to life by integrating thousands of components.
      </p>

      <div className="process-section">
        <Image
          src="/process/final-assembly.avif" // Placeholder; replace with actual path
          alt="A Honda associate inspecting a new vehicle"
          width={600}
          height={300}
          className="process-image"
        />
        <p className="description">
          Once the painted body reaches the assembly line, it moves along a conveyor where skilled associates and robots install thousands of components—engines, seats, electronics, and more. Torque wrench robots ensure bolts are tightened to exact specifications, while quality inspection stations check every detail. This meticulous process results in a fully functional Honda vehicle ready for delivery.
        </p>
      </div>

      <div className="machines-section">
        <h2>Machines Used</h2>
        <ul className="machine-list">
          {machines.map((machine) => (
            <li key={machine.id} className="machine-item">
              <span>{machine.name}</span>
              <Link href={`/manufacturing-cell/final-assembly/3d/${machine.id}`} className="view-3d-btn">
                View in 3D
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link href="/manufacturing-cell" className="back-link">Back to Menu</Link>
    </div>
  );
}