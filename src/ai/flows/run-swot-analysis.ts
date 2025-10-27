
'use server';
/**
 * @fileOverview An AI flow that performs a SWOT analysis based on user input.
 *
 * - runSwotAnalysis - A function that returns a SWOT analysis.
 * - SwotAnalysisInput - The input type for the flow.
 * - SwotAnalysisOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const SwotAnalysisInputSchema = z.object({
  text: z.string().describe('A paragraph of text from the user describing their situation, goals, or challenges.'),
});
export type SwotAnalysisInput = z.infer<typeof SwotAnalysisInputSchema>;

export const SwotAnalysisOutputSchema = z.object({
  strengths: z.array(z.string()).describe('A list of 2-4 key strengths identified from the text.'),
  weaknesses: z.array(z.string()).describe('A list of 2-4 key weaknesses identified from the text.'),
  opportunities: z.array(z.string()).describe('A list of 2-4 key opportunities identified from the text.'),
  threats: z.array(z.string()).describe('A list of 2-4 key threats identified from the text.'),
});
export type SwotAnalysisOutput = z.infer<typeof SwotAnalysisOutputSchema>;


export async function runSwotAnalysis(input: SwotAnalysisInput): Promise<SwotAnalysisOutput> {
  return swotAnalysisFlow(input);
}

const swotAnalysisFlow = ai.defineFlow(
  {
    name: 'swotAnalysisFlow',
    inputSchema: SwotAnalysisInputSchema,
    outputSchema: SwotAnalysisOutputSchema,
  },
  async (input) => {
    const prompt = `
      You are a business and career analyst. Based on the following text provided by a user,
      perform a simple SWOT analysis (Strengths, Weaknesses, Opportunities, Threats).
      Identify 2-4 points for each category.

      User Input: "${input.text}"
      
      Return the response in the specified JSON format.
    `;

    const { output } = await ai.generate({
      prompt,
      output: { schema: SwotAnalysisOutputSchema },
      model: 'googleai/gemini-2.5-flash',
    });

    return output!;
  }
);
