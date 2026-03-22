'use server';
/**
 * @fileOverview A Genkit flow for generating personalized weekly meal plans.
 *
 * - aiMealPlanSuggestions - A function that handles the AI meal plan generation process.
 * - AiMealPlanSuggestionsInput - The input type for the aiMealPlanSuggestions function.
 * - AiMealPlanSuggestionsOutput - The return type for the aiMealPlanSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiMealPlanSuggestionsInputSchema = z.object({
  dietGoals: z
    .array(z.string())
    .describe(
      'A list of diet goals or dietary restrictions, e.g., ["vegetarian", "low-carb", "gluten-free"]'
    )
    .optional(),
  groceryBudget: z
    .number()
    .describe('The maximum weekly grocery budget in USD.'),
  cuisinePreferences: z
    .array(z.string())
    .describe(
      'A list of preferred cuisines or meal types, e.g., ["Mediterranean", "Italian", "Quick & Easy"]'
    )
    .optional(),
});
export type AiMealPlanSuggestionsInput = z.infer<
  typeof AiMealPlanSuggestionsInputSchema
>;

const AiMealPlanSuggestionsOutputSchema = z.object({
  totalEstimatedCost: z
    .number()
    .describe('The estimated total cost of the weekly meal plan.'),
  planExplanation: z
    .string()
    .describe(
      "A brief explanation of how the meal plan meets the user's diet goals and budget."
    ),
  weeklyPlan: z
    .array(
      z.object({
        day: z.string().describe('The day of the week, e.g., "Monday".'),
        meals: z
          .array(
            z.object({
              mealType: z
                .string()
                .describe('The type of meal, e.g., "Breakfast", "Lunch", "Dinner", "Snack".'),
              recipeName: z
                .string()
                .describe('The name of the suggested recipe for this meal.'),
              estimatedCost: z
                .number()
                .describe('The estimated cost of this single meal in USD.'),
              briefDescription: z
                .string()
                .describe('A brief description of the meal and its ingredients.'),
            })
          )
          .describe('A list of meals for the day.'),
      })
    )
    .describe('An array representing the meal plan for each day of the week.'),
});
export type AiMealPlanSuggestionsOutput = z.infer<
  typeof AiMealPlanSuggestionsOutputSchema
>;

export async function aiMealPlanSuggestions(
  input: AiMealPlanSuggestionsInput
): Promise<AiMealPlanSuggestionsOutput> {
  return aiMealPlanSuggestionsFlow(input);
}

const aiMealPlanPrompt = ai.definePrompt({
  name: 'aiMealPlanPrompt',
  input: { schema: AiMealPlanSuggestionsInputSchema },
  output: { schema: AiMealPlanSuggestionsOutputSchema },
  prompt: `You are an expert nutritionist and meal planner.
Your task is to create a personalized, budget-friendly weekly meal plan.

The user has the following preferences:
Diet Goals: {{#if dietGoals}}{{#each dietGoals}}- {{{this}}}
{{/each}}{{else}}None specified.{{/if}}
Grocery Budget: $
{{{groceryBudget}}} per week
Cuisine Preferences: {{#if cuisinePreferences}}{{#each cuisinePreferences}}- {{{this}}}
{{/each}}{{else}}None specified.{{/if}}

Generate a detailed weekly meal plan, from Monday to Sunday, that adheres to the user's diet goals and stays within the specified grocery budget.
For each meal (Breakfast, Lunch, Dinner, and optionally 1-2 Snacks per day), suggest a recipe name, a brief description of the meal, and an estimated cost for that single meal.
Ensure the total estimated cost for the entire week does not exceed the grocery budget.
Provide a brief explanation of how the plan meets their goals and budget.

Respond with a JSON object following this schema:`,
});

const aiMealPlanSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiMealPlanSuggestionsFlow',
    inputSchema: AiMealPlanSuggestionsInputSchema,
    outputSchema: AiMealPlanSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await aiMealPlanPrompt(input);
    return output!;
  }
);
