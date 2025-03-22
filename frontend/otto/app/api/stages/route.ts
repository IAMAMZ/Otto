import { NextResponse } from 'next/server';

export interface ManufacturingStage {
    id: number;
    name: string;
    description: string;
    duration: number; // in seconds
    icon: string;
    status: 'active' | 'idle' | 'error';
  }

export async function GET() {
  const stages: ManufacturingStage[] = [
    { id: 1, name: 'Input', description: 'Raw materials loaded', duration: 10, icon: '📦', status: 'active' },
    { id: 2, name: 'Processing', description: 'CNC cuts material', duration: 25, icon: '⚙️', status: 'active' },
    { id: 3, name: 'Workflow', description: 'Parts transported', duration: 15, icon: '➡️', status: 'idle' },
    { id: 4, name: 'Output', description: 'Quality checked', duration: 20, icon: '✅', status: 'active' },
    { id: 5, name: 'Feedback', description: 'Process optimized', duration: 30, icon: '🔄', status: 'error' },
  ];

  return NextResponse.json(stages);
}