import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt parameter' }, { status: 400 });
    }

    // Make sure your API key is accessible
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY is not defined in environment variables');
      return NextResponse.json({ error: 'API key configuration error' }, { status: 500 });
    }

    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 300,
      temperature: 0.7,
      system: "You are an expert automotive engineer providing brief, concise responses. Direct the conversation in the way an automotive engineer would.",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    return NextResponse.json({ answer: message.content[0].text });
  } catch (error) {
    // More detailed error logging
    console.error('Anthropic API error:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
    return NextResponse.json({ error: 'Error processing request: ' + error.message }, { status: 500 });
  }
}