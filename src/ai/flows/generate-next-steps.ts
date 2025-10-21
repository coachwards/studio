'use server';

/**
 * @fileOverview Next Steps analysis AI agent.
 *
 * - generateNextSteps - A function that handles the Next Steps analysis process.
 * - GenerateNextStepsInput - The input type for the generateNextSteps function.
 * - GenerateNextStepsOutput - The return type for the generateNextSteps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNextStepsInputSchema = z.object({
  situation: z
    .string()
    .describe(
      'The user\'s current situation, including their goals and targets in health, social, finance, and work quadrants.'
    ),
  wants: z.string().describe('What the user wants to achieve or change.'),
});
export type GenerateNextStepsInput = z.infer<typeof GenerateNextStepsInputSchema>;

const GenerateNextStepsOutputSchema = z.object({
  opportunities: z.string().describe('Suggested opportunities for the user to explore.'),
  targets: z.string().describe('Specific, actionable targets for the user to aim for.'),
  nextSteps: z
    .string()
    .describe('Personalized next steps and advice based on the analysis.'),
});
export type GenerateNextStepsOutput = z.infer<typeof GenerateNextStepsOutputSchema>;

export async function generateNextSteps(
  input: GenerateNextStepsInput
): Promise<GenerateNextStepsOutput> {
  return generateNextStepsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNextStepsPrompt',
  input: {schema: GenerateNextStepsInputSchema},
  output: {schema: GenerateNextStepsOutputSchema},
  prompt: `You are an AI coach that helps users determine their next steps using a "Situation, Wants, Opportunities, Targets" framework.

  Analyze the user's current situation and what they want. Based on that, identify key opportunities and suggest concrete targets.

  User's Situation: {{{situation}}}
  User's Wants: {{{wants}}}

  Based on this, provide the following:
  - Opportunities: What are the potential opportunities for growth or improvement?
  - Targets: What are some specific, measurable, achievable, relevant, and time-bound (SMART) targets?
  - Next Steps: Provide personalized advice and a clear set of next steps.

  Format the output in a structured JSON format.`,
});

const generateNextStepsFlow = ai.defineFlow(
  {
    name: 'generateNextStepsFlow',
    inputSchema: GenerateNextStepsInputSchema,
    outputSchema: GenerateNextStepsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
