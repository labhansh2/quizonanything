import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { topic, mode, difficulty } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Create the prompt for OpenAI
    const prompt = `Create a quiz about "${topic}" with a "${difficulty}" difficulty level in "${mode}" mode. Give the answer in JSON format.`;

    // Define the schema for the structured output
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a quiz generator. Generate 10 multiple-choice questions based on the user's requested topic, difficulty, and mode.
            
          For trivia mode: focus on factual information and interesting facts.
          For educational mode: focus on learning concepts and understanding.
          For general mode: mix of factual knowledge and conceptual questions.
          
          Difficulty levels:
          - Easy: Basic knowledge, straightforward questions
          - Medium: Moderate knowledge, some complexity
          - Hard: Advanced knowledge, challenging questions
          
          IMPORTANT:
          - Ensure all questions have exactly 4 options
          - Each question must have exactly one correct answer
          - The correctAnswer should be the index (0-3) of the correct option
          - Keep questions concise and clear

          Give the questions in JSON format.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { 
        type: "json_object" 
      },
      temperature: 0.7,
    });

    // Extract the generated content
    const quizData = JSON.parse(response.choices[0].message.content || '{}');

    // Return the quiz data
    return NextResponse.json({ 
      topic,
      mode,
      difficulty,
      questions: quizData.questions || []
    });
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz questions' },
      { status: 500 }
    );
  }
} 