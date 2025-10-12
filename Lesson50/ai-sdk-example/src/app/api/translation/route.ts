import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import z from 'zod';

// TODO: use enum validation for originalLangauge
const translateRequestSchema = z.object({
  front: z.string().min(1).max(150),
  originalLanguage: z.string().min(2).max(20),
});

const translateResponseSchema = z.object({
  inputCorrected: z.string(),
  example: z.string(),
  translation: z.string(),
  exampleTranslation: z.string(),
});

export async function POST(request: Request): Promise<NextResponse> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split('Bearer ')[1];
  console.debug('token', token);


  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(token);
  } catch (error) {
    console.error('Failed verifiying user token', error);
    return NextResponse.json(
      { error: 'Unauthorized: token invalid' },
      { status: 403 },
    );
  }
  const userId = decodedToken.uid;

  let mainLang = 'en';
  try {
    const userDoc = await admin.firestore().doc(`users/${userId}`).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      console.log('userData', userData);

      if (!userData?.premium) {
        return NextResponse.json(
          {
            success: false,
            message: 'Premium access is required to use this feature.',
          },
          { status: 403 },
        );
      }
      if (userData && userData.mainLang) {
        mainLang = userData.mainLang;
      }
    }
  } catch (error) {
    console.error('Error fetching user language preference:', error);
  }

  const { front, originalLanguage } = await request.json();

  // TODO: add validation to make sure that front is in the right format (use zod Schema) - 400 status

  try {
    const aiResponse = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: translateResponseSchema,
      prompt: `Translate the following text in ${originalLanguage} language to ${mainLang} language. Return a JSON object with 4 fields: 
      'inputCorrected' (original user input in ${originalLanguage} language with corrected spelling errors, enhased with appropriate articles and(or) prepositions),
      'example' (a short phrase or sentence using the origal value that is easy to understand and remember),
      'translation' (the translated word or phrase, enhased with appropriate articles and(or) prepositions), 
      'exampleTranslation' (the translation of input_example field). Only return valid JSON. Text: "${front}"`,
    });

    const response = {
      success: true,
      inputCorrected: aiResponse.object.inputCorrected,
      example: aiResponse.object.example,
      translation: aiResponse.object.translation,
      exampleTranslation: aiResponse.object.exampleTranslation,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error generating translation', error);
    return NextResponse.json(
      { success: false, message: 'Translation failed' },
      { status: 500 },
    );
  }
}
