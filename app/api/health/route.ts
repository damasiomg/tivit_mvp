export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${API_BASE}/fake/health`, {
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
    });
    
    clearTimeout(timeout);
    
    let data: Record<string, unknown> = {};
    try {
      const text = await response?.text?.() ?? '';
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { status: 'error', message: 'Invalid response from API' };
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ status: 'error', message: 'API indisponível' });
  }
}
