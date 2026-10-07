import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'nextomni-web-bff',
    runtime: 'Next.js 15 App Router (Edge/Node)',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
