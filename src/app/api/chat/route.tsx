import { NextResponse } from 'next/server';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-exp-03-25:generateContent';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    console.log('...messages...', messages);

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const prompt = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    console.log('Request Body:', requestBody);

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Please configure it in your environment variables.');
      return NextResponse.json(
        { error: 'Internal server error: Missing API key' },
        { status: 500 }
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000); // 9 seconds

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate response');
      }

      const data = await response.json();
      console.log('Gemini API Response:', data);

      if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
        console.error('Invalid or empty response from Gemini API:', data);
        return NextResponse.json(
          { error: 'Failed to generate a valid response' },
          { status: 500 }
        );
      }

      const generatedText = data.candidates[0].content.parts[0].text;

      return NextResponse.json({
        message: generatedText,
        role: 'assistant',
      });
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Gemini API request timed out.');
        return NextResponse.json(
          { error: 'The request to the Gemini API timed out. Please try again later.' },
          { status: 504 } // 504 Gateway Timeout
        );
      }

      if (error instanceof Error) {
        console.error('Error in chat API:', error.message);
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      console.error('Unknown error occurred:', error);
      return NextResponse.json(
        { error: 'An unknown error occurred. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in chat API:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.error('Unknown error occurred:', error);
    return NextResponse.json(
      { error: 'An unknown error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}