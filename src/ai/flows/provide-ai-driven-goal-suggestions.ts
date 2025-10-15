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

const AIDrivenGoalSuggestionsOutputSchema = z.object({
  healthGoals: z.array(z.string()).describe('Suggested health goals.'),
  socialGoals: z.array(z.string()).describe('Suggested social goals.'),
  financeGoals: z.array(z.string()).describe('Suggested finance goals.'),
  workGoals: z.array(z.string()).describe('Suggested work goals.'),
});
export type AIDrivenGoalSuggestionsOutput = z.infer<typeof AIDrivenGoalSuggestionsOutputSchema>;

export async function provideAIDrivenGoalSuggestions(input: AIDrivenGoalSuggestionsInput): Promise<AIDrivenGoalSuggestionsOutput> {
  return provideAIDrivenGoalSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDrivenGoalSuggestionsPrompt',
  input: {schema: AIDrivenGoalSuggestionsInputSchema},
  output: {schema: AIDrivenGoalSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide goal suggestions to users based on their data in four quadrants: Health, Social, Finance, and Work.\n\nAnalyze the user data provided for each quadrant and suggest relevant and achievable goals. Provide each goal as one short sentence.\n\nHealth Data: {{{healthData}}}\nSocial Data: {{{socialData}}}\nFinance Data: {{{financeData}}}\nWork Data: {{{workData}}}\n\nBased on this data, provide goal suggestions in the following format:\n{
  "healthGoals": ["suggested health goal 1", "suggested health goal 2", ...],
  "socialGoals": ["suggested social goal 1", "suggested social goal 2", ...],
  "financeGoals": ["suggested finance goal 1", "suggested finance goal 2", ...],
  "workGoals": ["suggested work goal 1", "suggested work goal 2", ...]
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
