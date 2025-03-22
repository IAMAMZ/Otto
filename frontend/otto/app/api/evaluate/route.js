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
      max_tokens: 1000,
      temperature: 0.2,
      system: "You are an expert in manufacturing processes who evaluates and provides feedback on manufacturing processes in the automotive industry. You provide specific, actionable feedback based on best practices.",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    // Extract the JSON response from Claude
    const responseText = message.content[0].text;
    let feedbackJson;
    
    try {
      // Look for JSON content in the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        feedbackJson = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if no JSON found - create a structured response
        feedbackJson = {
          overallFeedback: "The system couldn't properly analyze your responses. Please try again with more detailed information.",
          score: 10,
          detailedFeedback: [
            "Unable to analyze stamping process.",
            "Unable to analyze welding process.",
            "Unable to analyze painting process.",
            "Unable to analyze assembly process."
          ],
          improvementSuggestions: [
            "Provide more specific details about your manufacturing processes.",
            "Include information about automation levels, equipment, and quality control measures."
          ]
        };
      }
    } catch (parseError) {
      console.error('Error parsing JSON from Claude response:', parseError);
      return NextResponse.json({ error: 'Error parsing feedback: ' + parseError.message }, { status: 500 });
    }

    return NextResponse.json({ feedback: feedbackJson });
  } catch (error) {
    // More detailed error logging
    console.error('Anthropic API error:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
    return NextResponse.json({ error: 'Error processing request: ' + error.message }, { status: 500 });
  }
}