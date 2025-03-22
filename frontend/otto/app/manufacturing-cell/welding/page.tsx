import Link from 'next/link';
import Image from 'next/image';
import '../styles.css';

export default function Welding() {
  const machines = [
    { name: 'Robotic Welder', id: 'robotic-welder' },
    { name: 'Welding Jig', id: 'welding-jig' },
    { name: 'Plasma Cutter', id: 'plasma-cutter' },
  ];

  return (
    <div className="container">
      <h1>Welding</h1>
      <p className="intro">
        Welding fuses the stamped components into a cohesive Honda vehicle frame using cutting-edge robotics.
      </p>

      <div className="process-section">
        <Image
          src="/process/welding.avif" // Placeholder; replace with actual path
          alt="A robot welding a Honda vehicle’s frame"
          width={600}
          height={300}
          className="process-image"
        />
        <p className="description">
          We employ robotic welders to join sub-assemblies made from multiple materials, including steel and aluminum. The process starts with stamped parts being positioned in welding jigs, ensuring perfect alignment. Robotic arms, equipped with precision welding tools, then apply spot and seam welds to create a strong, durable frame. This automation enhances consistency and speed, preparing the frame for the painting stage.
        </p>
      </div>

      <div className="machines-section">
        <h2>Machines Used</h2>
        <ul className="machine-list">
          {machines.map((machine) => (
            <li key={machine.id} className="machine-item">
              <span>{machine.name}</span>
              <Link href={`/manufacturing-cell/welding/3d/${machine.id}`} className="view-3d-btn">
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