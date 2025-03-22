import Link from 'next/link';
import Image from 'next/image';
import '../styles.css';

export default function Stamping() {
  const machines = [
    { name: 'Stamping Press', id: 'stamping-press' },
    { name: 'Die Setter', id: 'die-setter' },
    { name: 'Inspection Scanner', id: 'inspection-scanner' },
  ];

  return (
    <div className="container">
      <h1>Stamping</h1>
      <p className="intro">
        In the stamping stage, we transform raw steel into the foundational components of a Honda vehicle frame.
      </p>

      <div className="process-section">
        <Image
          src="/process/stamping.avif" // Placeholder; replace with actual path
          alt="Metal being stamped into a Honda frame"
          width={600}
          height={300}
          className="process-image"
        />
        <p className="description">
          Our stamping lines use high-pressure stamping dies to form steel parts with precision. The process begins with large coils of steel being fed into massive stamping presses. These presses, capable of exerting thousands of tons of force, shape the metal into components like hoods, doors, and chassis parts. Each piece undergoes rigorous inspection using advanced scanners to ensure it meets Honda’s quality standards before moving to the welding stage.
        </p>
      </div>

      <div className="machines-section">
        <h2>Machines Used</h2>
        <ul className="machine-list">
          {machines.map((machine) => (
            <li key={machine.id} className="machine-item">
              <span>{machine.name}</span>
              <Link href={`/manufacturing-cell/stamping/3d/${machine.id}`} className="view-3d-btn">
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