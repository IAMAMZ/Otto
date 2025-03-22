import Link from 'next/link';
import Image from 'next/image';
import '../styles.css';

export default function Painting() {
  const machines = [
    { name: 'Dip Tank System', id: 'dip-tank' },
    { name: 'Painting Robot', id: 'painting-robot' },
    { name: 'Spray Booth', id: 'spray-booth' },
  ];

  return (
    <div className="container">
      <h1>Painting</h1>
      <p className="intro">
        The painting stage coats the welded frame with protective and aesthetic layers for durability and style.
      </p>

      <div className="process-section">
        <Image
          src="/process/painting.webp" // Placeholder; replace with actual path
          alt="A freshly painted Honda frame"
          width={600}
          height={300}
          className="process-image"
        />
        <p className="description">
          We prepare the body with dip tanks that apply a corrosion-protective coating, submerging the frame to ensure full coverage. After drying, robotic painters apply a sealer, sound deadener, anti-chip primer, and a vibrant top coat in a controlled spray booth. This multi-layer process, executed with precision automation, protects the vehicle and gives it Honda’s signature finish, readying it for final assembly.
        </p>
      </div>

      <div className="machines-section">
        <h2>Machines Used</h2>
        <ul className="machine-list">
          {machines.map((machine) => (
            <li key={machine.id} className="machine-item">
              <span>{machine.name}</span>
              <Link href={`/manufacturing-cell/painting/3d/${machine.id}`} className="view-3d-btn">
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