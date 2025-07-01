import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configuration de l'API OpenAI
const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export async function POST(request) {
  try {
    const { message, context } = await request.json();
    console.log('Message reçu:', message);

    // Prompt simplifié
    const systemPrompt = `Tu es un assistant IA spécialisé dans l'aide aux candidatures et la recherche d'emploi.
    Réponds de manière professionnelle et constructive.
    Si l'utilisateur demande de l'aide pour son CV, propose-lui des conseils spécifiques.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    const response = completion.choices[0].message.content;
    console.log('Réponse générée:', response);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur de communication avec l\'IA' },
      { status: 500 }
    );
  }
} 