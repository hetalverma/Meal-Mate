'use server';
/**
 * @fileOverview A Genkit flow for extracting structured recipe data from social media URLs.
 *
 * - aiRecipeExtractor - A function that handles the AI recipe extraction process.
 * - AiRecipeExtractorInput - The input type for the aiRecipeExtractor function.
 * - AiRecipeExtractorOutput - The return type for the aiRecipeExtractor function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiRecipeExtractorInputSchema = z.object({
  url: z.string().url().describe('The social media URL (YouTube, Instagram, Facebook, etc.) containing the recipe.'),
});
export type AiRecipeExtractorInput = z.infer<typeof AiRecipeExtractorInputSchema>;

const AiRecipeExtractorOutputSchema = z.object({
  title: z.string().describe('The name of the recipe.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the recipe.'),
  time: z.string().describe('Estimated total time, e.g., "30 min".'),
  calories: z.number().describe('Estimated calories per serving.'),
  protein: z.string().describe('Protein content per serving, e.g., "25g".'),
  carbs: z.string().describe('Carbohydrate content per serving, e.g., "40g".'),
  fats: z.string().describe('Fat content per serving, e.g., "15g".'),
  servings: z.number().describe('Number of servings.'),
  ingredients: z.array(z.object({
    item: z.string().describe('The name of the ingredient.'),
    qty: z.string().describe('The quantity and unit.'),
  })).describe('List of ingredients and their quantities.'),
  instructions: z.array(z.string()).describe('Step-by-step cooking instructions.'),
  source: z.string().describe('The original source URL.'),
  cuisine: z.string().describe('The type of cuisine, e.g., "Italian", "Mexican".'),
});
export type AiRecipeExtractorOutput = z.infer<typeof AiRecipeExtractorOutputSchema>;

export async function aiRecipeExtractor(
  input: AiRecipeExtractorInput
): Promise<AiRecipeExtractorOutput> {
  return aiRecipeExtractorFlow(input);
}

const aiRecipeExtractorPrompt = ai.definePrompt({
  name: 'aiRecipeExtractorPrompt',
  input: { schema: AiRecipeExtractorInputSchema },
  output: { schema: AiRecipeExtractorOutputSchema },
  prompt: `You are an expert culinary assistant. 
Your task is to extract a structured recipe from a given social media URL.
URL: {{{url}}}

Analyze the content associated with this URL (based on your internal knowledge of common recipe formats on platforms like YouTube, Instagram, TikTok, and Facebook). 
Provide a high-quality, structured recipe including title, difficulty, time, calories, macros, servings, ingredients with quantities, and detailed instructions.

If you don't have enough specific data from the URL, use your expert knowledge to infer a realistic recipe based on the likely content of that source (e.g., if it's a famous chef's video).

Respond with a JSON object following this schema:`,
});

const aiRecipeExtractorFlow = ai.defineFlow(
  {
    name: 'aiRecipeExtractorFlow',
    inputSchema: AiRecipeExtractorInputSchema,
    outputSchema: AiRecipeExtractorOutputSchema,
  },
  async (input) => {
    const { output } = await aiRecipeExtractorPrompt(input);
    if (!output) throw new Error('Failed to extract recipe data.');
    return output;
  }
);
