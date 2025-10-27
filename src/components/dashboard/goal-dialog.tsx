
'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Sparkles, Bot } from 'lucide-react';
import { provideAiDrivenGoalSuggestions } from '@/ai/flows/provide-ai-driven-goal-suggestions';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface GoalDialogProps {
  quadrantTitle: string;
  onAddGoal: (title: string, quadrant: string, brand?: string) => void;
}

type SuggestedGoal = {
  goal: string;
  brand?: string;
};


export const GoalDialog: React.FC<GoalDialogProps> = ({ quadrantTitle, onAddGoal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestedGoal[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFetchSuggestions = async () => {
    setLoading(true);
    setSuggestions([]);
    try {
      const result = await provideAiDrivenGoalSuggestions({ quadrant: quadrantTitle });
      setSuggestions(result.goals);
    } catch (error) {
      console.error('Failed to fetch AI suggestions:', error);
       toast({
        variant: "destructive",
        title: "AI Error",
        description: "Failed to get suggestions from the AI. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSuggestion = (suggestion: SuggestedGoal) => {
    onAddGoal(suggestion.goal, quadrantTitle, suggestion.brand);
    toast({
      title: "Goal Added!",
      description: `Added "${suggestion.goal}" to your goals.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 gap-1">
          <Sparkles className="h-4 w-4" />
          AI Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot />
            AI Suggestions for {quadrantTitle}
          </DialogTitle>
          <DialogDescription>
            Here are some AI-powered goal suggestions to get you started.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          {loading && (
            <>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </>
          )}
          {!loading && suggestions.length > 0 && (
            <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left h-auto"
                        onClick={() => handleAddSuggestion(suggestion)}
                      >
                         <span>
                          {suggestion.goal} 
                          {suggestion.brand && <span className="text-primary font-semibold ml-1">({suggestion.brand})</span>}
                        </span>
                      </Button>
                    </li>
                ))}
            </ul>
          )}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
          <Button onClick={handleFetchSuggestions} disabled={loading}>
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? 'Generating...' : 'Regenerate'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
