export const AI_ENGINE_URL = process.env.NEXT_PUBLIC_AI_ENGINE_URL || 'http://localhost:8000';

export async function fetchAiEngine(endpoint: string, options: RequestInit = {}) {
  const url = `${AI_ENGINE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return await res.json();
  } catch (error) {
    console.error(`AI Engine Fetch Error on ${endpoint}:`, error);
    return { status: 'error', message: 'AI Engine unreachable or offline.' };
  }
}
