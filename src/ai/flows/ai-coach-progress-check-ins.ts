'use server';
/**
 * @fileOverview AI Coach progress check-in flow.
 *
 * - aiCoachProgressCheckIn - A function to initiate the AI Coach progress check-in.
 * - AICoachProgressCheckInInput - The input type for the aiCoachProgressCheckIn function.
 * - AICoachProgressCheckInOutput - The return type for the aiCoachProgressCheckIn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICoachProgressCheckInInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  healthProgress: z.string().describe('The user\'s progress in the health quadrant.'),
  socialProgress: z.string().describe('The user\'s progress in the social quadrant.'),
  financeProgress: z.string().describe('The user\'s progress in the finance quadrant.'),
  workProgress: z.string().describe('The user\'s progress in the work quadrant.'),
});
export type AICoachProgressCheckInInput = z.infer<typeof AICoachProgressCheckInInputSchema>;

const AICoachProgressCheckInOutputSchema = z.object({
  checkInMessage: z.string().describe('The AI Coach\'s check-in message for the user.'),
  rewardSuggestion: z.string().describe('A suggested reward based on the user\'s progress.'),
});
export type AICoachProgressCheckInOutput = z.infer<typeof AICoachProgressCheckInOutputSchema>;

export async function aiCoachProgressCheckIn(input: AICoachProgressCheckInInput): Promise<AICoachProgressCheckInOutput> {
  return aiCoachProgressCheckInFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCoachProgressCheckInPrompt',
  input: {schema: AICoachProgressCheckInInputSchema},
  output: {schema: AICoachProgressCheckInOutputSchema},
  prompt: `You are an AI Coach providing encouragement and tracking progress for users in four key areas of their lives: Health, Social, Finance, and Work.

  Based on the user\'s reported progress in each quadrant, provide a check-in message that acknowledges their achievements and motivates them to continue.
  Also, suggest a reward that is appropriate for their overall progress.

  User ID: {{{userId}}}
  Health Progress: {{{healthProgress}}}
  Social Progress: {{{socialProgress}}}
  Finance Progress: {{{financeProgress}}}
  Work Progress: {{{workProgress}}}

  Check-in Message: A personalized message to the user.
  Reward Suggestion: A suggestion for a reward the user has earned.
  `,
});

const aiCoachProgressCheckInFlow = ai.defineFlow(
  {
    name: 'aiCoachProgressCheckInFlow',
    inputSchema: AICoachProgressCheckInInputSchema,
    outputSchema: AICoachProgressCheckInOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
