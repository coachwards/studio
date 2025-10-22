'use server';

/**
 * @fileOverview SWO analysis AI agent.
 *
 * - generateSWOAnalysis - A function that handles the SWO analysis process.
 * - GenerateSWOAnalysisInput - The input type for the generateSWOAnalysis function.
 * - GenerateSWOAnalysisOutput - The return type for the generateSWOAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSWOAnalysisInputSchema = z.object({
  strengths: z
    .string()
    .describe(
      'User\'s strengths and recent accomplishments.'
    ),
  wants: z.string().describe('What the user wants to achieve or change.'),
});
export type GenerateSWOAnalysisInput = z.infer<typeof GenerateSWOAnalysisInputSchema>;

const GenerateSWOAnalysisOutputSchema = z.object({
  opportunities: z.string().describe('Opportunities identified in the SWO analysis.'),
  targets: z.string().describe('Specific, actionable targets based on the analysis.'),
  personalizedInsights: z
    .string()
    .describe('Personalized insights based on the SWO analysis.'),
});
export type GenerateSWOAnalysisOutput = z.infer<typeof GenerateSWOAnalysisOutputSchema>;

export async function generateSWOAnalysis(
  input: GenerateSWOAnalysisInput
): Promise<GenerateSWOAnalysisOutput> {
  return generateSWOAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSWOAnalysisPrompt',
  input: {schema: GenerateSWOAnalysisInputSchema},
  output: {schema: GenerateSWOAnalysisOutputSchema},
  prompt: `You are an AI coach that helps users perform a SWO analysis (Strengths, Wants, Opportunities).

  Analyze the user's situation based on their strengths and wants. Provide personalized insights, identify opportunities, and suggest actionable targets.

  Strengths: {{{strengths}}}
  Wants: {{{wants}}}

  Based on this, provide the following:
  - Opportunities: What are the potential opportunities for growth or improvement?
  - Targets: What are some specific, measurable, achievable, relevant, and time-bound (SMART) targets?
  - Personalized Insights: Provide personalized advice based on the analysis.

  Format the output in a structured JSON format.`,
});

const generateSWOAnalysisFlow = ai.defineFlow(
  {
    name: 'generateSWOAnalysisFlow',
    inputSchema: GenerateSWOAnalysisInputSchema,
    outputSchema: GenerateSWOAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
