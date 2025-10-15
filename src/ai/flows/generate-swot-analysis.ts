'use server';

/**
 * @fileOverview SWOT analysis AI agent.
 *
 * - generateSWOTAnalysis - A function that handles the SWOT analysis process.
 * - GenerateSWOTAnalysisInput - The input type for the generateSWOTAnalysis function.
 * - GenerateSWOTAnalysisOutput - The return type for the generateSWOTAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSWOTAnalysisInputSchema = z.object({
  userData: z
    .string()
    .describe(
      'User data including goals and targets in health, social, finance, and work quadrants.'
    ),
  blockers: z.string().describe('Current blockers and impediments the user is facing.'),
});
export type GenerateSWOTAnalysisInput = z.infer<typeof GenerateSWOTAnalysisInputSchema>;

const GenerateSWOTAnalysisOutputSchema = z.object({
  strengths: z.string().describe('Strengths identified in the SWOT analysis.'),
  weaknesses: z.string().describe('Weaknesses identified in the SWOT analysis.'),
  opportunities: z.string().describe('Opportunities identified in the SWOT analysis.'),
  threats: z.string().describe('Threats identified in the SWOT analysis.'),
  personalizedInsights: z
    .string()
    .describe('Personalized insights based on the SWOT analysis.'),
});
export type GenerateSWOTAnalysisOutput = z.infer<typeof GenerateSWOTAnalysisOutputSchema>;

export async function generateSWOTAnalysis(
  input: GenerateSWOTAnalysisInput
): Promise<GenerateSWOTAnalysisOutput> {
  return generateSWOTAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSWOTAnalysisPrompt',
  input: {schema: GenerateSWOTAnalysisInputSchema},
  output: {schema: GenerateSWOTAnalysisOutputSchema},
  prompt: `You are an AI coach that helps users perform SWOT analysis on their life.

  Analyze the user's current situation based on the following information, including their goals, targets, blockers, and impediments. Provide personalized insights and advice.

  User Data: {{{userData}}}
  Blockers and Impediments: {{{blockers}}}

  Consider the following quadrants: Health, Social, Finance, and Work.

  Identify strengths, weaknesses, opportunities, and threats based on the provided information.

  Provide personalized insights based on the SWOT analysis.

  Format the output in a structured JSON format.`,
});

const generateSWOTAnalysisFlow = ai.defineFlow(
  {
    name: 'generateSWOTAnalysisFlow',
    inputSchema: GenerateSWOTAnalysisInputSchema,
    outputSchema: GenerateSWOTAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
