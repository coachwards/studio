
'use server';
/**
 * @fileOverview An AI flow that provides next step suggestions based on a user's goals.
 *
 * - provideNextStepsForGoals - A function that returns AI-generated next steps.
 * - NextStepsInput - The input type for the flow.
 * - NextStepsOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GoalSchema = z.object({
  title: z.string(),
  quadrant: z.string(),
  completed: z.boolean(),
});

export const NextStepsInputSchema = z.object({
  goals: z.array(GoalSchema),
});
export type NextStepsInput = z.infer<typeof NextStepsInputSchema>;

export const NextStepsOutputSchema = z.object({
  nextSteps: z.array(z.string()).describe('An array of 2-4 concise and actionable next-step suggestions based on the user\'s goal progress.'),
});
export type NextStepsOutput = z.infer<typeof NextStepsOutputSchema>;


export async function provideNextStepsForGoals(input: NextStepsInput): Promise<NextStepsOutput> {
  return nextStepsFlow(input);
}

const nextStepsFlow = ai.defineFlow(
  {
    name: 'nextStepsFlow',
    inputSchema: NextStepsInputSchema,
    outputSchema: NextStepsOutputSchema,
  },
  async (input) => {
    const prompt = `
      You are an expert life coach. A user provides you with their list of goals, including which ones are completed.
      Based on their goals, analyze their progress and provide 2-4 actionable next steps.
      Focus on encouraging them to complete unfinished goals or suggesting new, related goals.

      User's Goals:
      ${input.goals.map(g => `- ${g.title} (${g.quadrant}) - ${g.completed ? 'Completed' : 'Not Completed'}`).join('\n')}
      
      Return the response in the specified JSON format.
    `;

    const { output } = await ai.generate({
      prompt,
      output: { schema: NextStepsOutputSchema },
      model: 'googleai/gemini-2.5-flash',
    });

    return output!;
  }
);
