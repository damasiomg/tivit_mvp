export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function proxyRequest(req: NextRequest, params: { path: string[] }) {
  const pathSegments = params?.path ?? [];
  const pathStr = pathSegments.join('/');
  const url = new URL(req?.url ?? '');
  const search = url?.search ?? '';
  const targetUrl = `${API_BASE}/fake/${pathStr}${search}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const authHeader = req?.headers?.get?.('authorization');
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  try {
    const fetchOptions: RequestInit = {
      method: req?.method ?? 'GET',
      headers,
    };

    if (req?.method !== 'GET' && req?.method !== 'HEAD') {
      try {
        const body = await req?.text?.();
        if (body) {
          fetchOptions.body = body;
        }
      } catch(error) {
        throw error;
      }
    }

    const response = await fetch(targetUrl, fetchOptions);
    
    let data: unknown;
    try {
      const text = await response?.text?.() ?? '';
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { detail: 'Resposta inválida do servidor' };
    }

    return NextResponse.json(data, { status: response?.status ?? 500 });
  } catch {
    return NextResponse.json(
      { detail: 'API indisponível. Tente novamente mais tarde.' },
      { status: 502 }
    );
  }
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params);
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params);
}
