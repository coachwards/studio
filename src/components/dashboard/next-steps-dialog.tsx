
'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bot, Lightbulb } from 'lucide-react';
import type { Goal } from '@/lib/types';
import { provideNextStepsForGoals } from '@/ai/flows/provide-next-steps-for-goals';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface NextStepsDialogProps {
  goals: Goal[];
}

export const NextStepsDialog: React.FC<NextStepsDialogProps> = ({ goals }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFetchNextSteps = async () => {
    setLoading(true);
    setNextSteps([]);
    try {
      const result = await provideNextStepsForGoals({
        goals: goals.map(g => ({ title: g.title, quadrant: g.quadrant, completed: g.completed }))
      });
      setNextSteps(result.nextSteps);
    } catch (error) {
       console.error('Failed to fetch AI suggestions:', error);
       toast({
        variant: "destructive",
        title: "AI Error",
        description: "Failed to get next steps from the AI. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleFetchNextSteps}>
          <Lightbulb className="mr-2 h-4 w-4" />
          Suggest Next Steps
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot />
            Your AI-Powered Next Steps
          </DialogTitle>
          <DialogDescription>
            Based on your current goals, here are some suggestions for what to focus on next.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          {loading && (
             <>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-5/6" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-4/6" />
            </>
          )}
          {!loading && nextSteps.length > 0 && (
            <ul className="list-disc pl-5 space-y-2 text-sm text-foreground">
                {nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>
          )}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
