'use server';
/**
 * @fileOverview This file defines a Genkit flow to provide AI-driven goal suggestions based on user data.
 *
 * The flow takes user data as input and returns suggested goals for each quadrant (health, social, finance, work).
 * - `provideAIDrivenGoalSuggestions` - A function that generates AI-driven goal suggestions.
 * - `AIDrivenGoalSuggestionsInput` - The input type for the provideAIDrivenGoalSuggestions function.
 * - `AIDrivenGoalSuggestionsOutput` - The return type for the provideAIDrivenGoalSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDrivenGoalSuggestionsInputSchema = z.object({
  healthData: z.string().describe('User data related to health.'),
  socialData: z.string().describe('User data related to social activities.'),
  financeData: z.string().describe('User data related to financial status.'),
  workData: z.string().describe('User data related to work or career.'),
});
export type AIDrivenGoalSuggestionsInput = z.infer<typeof AIDrivenGoalSuggestionsInputSchema>;

const BrandedGoalSchema = z.object({
  goal: z.string().describe('The suggested goal as a short sentence.'),
  brand: z.string().describe('A suggested brand, company, or place to help achieve the goal.').optional(),
});

const AIDrivenGoalSuggestionsOutputSchema = z.object({
  healthGoals: z.array(BrandedGoalSchema).describe('Suggested health goals.'),
  socialGoals: z.array(BrandedGoalSchema).describe('Suggested social goals.'),
  financeGoals: z.array(BrandedGoalSchema).describe('Suggested finance goals.'),
  workGoals: z.array(BrandedGoalSchema).describe('Suggested work goals.'),
});
export type AIDrivenGoalSuggestionsOutput = z.infer<typeof AIDrivenGoalSuggestionsOutputSchema>;

export async function provideAIDrivenGoalSuggestions(input: AIDrivenGoalSuggestionsInput): Promise<AIDrivenGoalSuggestionsOutput> {
  return provideAIDrivenGoalSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDrivenGoalSuggestionsPrompt',
  input: {schema: AIDrivenGoalSuggestionsInputSchema},
  output: {schema: AIDrivenGoalSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide goal suggestions to users based on their data in four quadrants: Health, Social, Finance, and Work.\n\nAnalyze the user data provided for each quadrant and suggest relevant and achievable goals. Provide each goal as one short sentence. For each goal, also suggest a fictional brand, company, or type of place that could help achieve that goal (e.g., for a "run a 5k" goal, suggest "Local Running Club").\n\nHealth Data: {{{healthData}}}\nSocial Data: {{{socialData}}}\nFinance Data: {{{financeData}}}\nWork Data: {{{workData}}}\n\nBased on this data, provide goal suggestions in the following JSON format:\n{
  "healthGoals": [{"goal": "suggested health goal 1", "brand": "suggested brand 1"}, {"goal": "suggested health goal 2", "brand": "suggested brand 2"}, ...],
  "socialGoals": [{"goal": "suggested social goal 1", "brand": "suggested brand 1"}, ...],
  "financeGoals": [{"goal": "suggested finance goal 1", "brand": "suggested brand 1"}, ...],
  "workGoals": [{"goal": "suggested work goal 1", "brand": "suggested brand 1"}, ...]
}`,
});

const provideAIDrivenGoalSuggestionsFlow = ai.defineFlow(
  {
    name: 'provideAIDrivenGoalSuggestionsFlow',
    inputSchema: AIDrivenGoalSuggestionsInputSchema,
    outputSchema: AIDrivenGoalSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
