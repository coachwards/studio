
'use server';
/**
 * @fileOverview An AI flow that provides goal suggestions for a specific life quadrant.
 *
 * - provideAiDrivenGoalSuggestions - A function that returns AI-generated goal suggestions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GoalSuggestionsInputSchema = z.object({
  quadrant: z.string().describe('The life quadrant for which to suggest goals (e.g., "Health & Wellness").'),
});
export type GoalSuggestionsInput = z.infer<typeof GoalSuggestionsInputSchema>;

const GoalSuggestionSchema = z.object({
    goal: z.string().describe("The suggested goal, as a concise, actionable statement."),
    brand: z.string().optional().describe("An optional real-world company, app, or service that could help with this goal (e.g., 'Yoga Centre', 'Fidelity').")
});

const GoalSuggestionsOutputSchema = z.object({
  goals: z.array(GoalSuggestionSchema).describe('An array of 3 to 5 goal suggestions.'),
});
export type GoalSuggestionsOutput = z.infer<typeof GoalSuggestionsOutputSchema>;

export async function provideAiDrivenGoalSuggestions(input: GoalSuggestionsInput): Promise<GoalSuggestionsOutput> {
  const goalSuggestionFlow = ai.defineFlow(
    {
      name: 'goalSuggestionFlow',
      inputSchema: GoalSuggestionsInputSchema,
      outputSchema: GoalSuggestionsOutputSchema,
    },
    async (input) => {
      const prompt = `
      You are an expert life coach. A user needs suggestions for goals in the following area of their life: "${input.quadrant}".

      Generate a list of 3 to 5 specific, actionable goals for this quadrant.
      For some of the goals, suggest a real-world brand, service, or app that could help achieve that goal. For example, for a finance goal, you might suggest "Fidelity"; for a wellness goal, you could suggest "Yoga Centre".
      
      Return the response in the specified JSON format.
    `;

      const { output } = await ai.generate({
        prompt,
        output: { schema: GoalSuggestionsOutputSchema },
        model: 'googleai/gemini-2.5-flash',
      });

      return output!;
    }
  );

  return goalSuggestionFlow(input);
}
