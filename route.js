import { NextResponse } from 'next/server';
import { getModel, getOpenAIClient } from '@/lib/openai';
import { buildResearchPrompt, systemPrompt } from '@/lib/legalPrompts';

export async function POST(request) {
  try {
    const body = await request.json();
    const client = getOpenAIClient();
    const prompt = buildResearchPrompt(body);

    const response = await client.responses.create({
      model: getModel(),
      input: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ]
    });

    return NextResponse.json({ output: response.output_text });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Research failed.' }, { status: 500 });
  }
}
