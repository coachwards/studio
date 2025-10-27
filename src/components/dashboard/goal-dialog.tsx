"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { provideAIDrivenGoalSuggestions } from "@/ai/flows/provide-ai-driven-goal-suggestions";
import type { Quadrant } from "@/lib/types";
import { Sparkles, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface BrandedGoal {
    goal: string;
    brand?: string;
}
interface GoalDialogProps {
  quadrant: Quadrant;
  onAddGoal: (title: string, description: string, quadrantId: Quadrant['id'], brand?: string) => void;
}

export function GoalDialog({ quadrant, onAddGoal }: GoalDialogProps) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState("");
  const [suggestions, setSuggestions] = useState<BrandedGoal[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSuggestions = async () => {
    if (!userData.trim()) {
      toast({
        title: "Input required",
        description:
          "Please describe your current situation for this quadrant.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setSuggestions([]);

    try {
      const input = {
        healthData: quadrant.id === "health" ? userData : "",
        socialData: quadrant.id === "social" ? userData : "",
        financeData: quadrant.id === "finance" ? userData : "",
        workData: quadrant.id === "work" ? userData : "",
      };

      const result = await provideAIDrivenGoalSuggestions(input);

      const quadrantGoalsKey = `${quadrant.id}Goals` as keyof typeof result;

      if (result && result[quadrantGoalsKey] && result[quadrantGoalsKey].length > 0) {
        setSuggestions(result[quadrantGoalsKey]);
      } else {
        toast({
          title: "No suggestions found",
          description:
            "The AI couldn't generate suggestions. Try refining your input.",
        });
      }
    } catch (error) {
      console.error("Error generating goal suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI suggestions. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSuggestedGoal = (suggestion: BrandedGoal) => {
    onAddGoal(suggestion.goal, "AI-suggested goal", quadrant.id, suggestion.brand);
     toast({
      title: "Goal Added!",
      description: `"${suggestion.goal}" has been added to your ${quadrant.title} goals.`,
    });
    setOpen(false);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Sparkles className="mr-2 h-4 w-4" /> AI Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">AI Goal Suggestions for {quadrant.title}</DialogTitle>
          <DialogDescription>
            Describe your current situation, habits, or aspirations in this
            area. Our AI will provide personalized goal suggestions.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="user-data">Your {quadrant.title} Situation</Label>
            <Textarea
              placeholder={`e.g., "I want to exercise more but lack motivation." or "I want to grow my professional network."`}
              id="user-data"
              value={userData}
              onChange={(e) => setUserData(e.target.value)}
            />
          </div>
          {loading && (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-4/5" />
            </div>
          )}
          {suggestions.length > 0 && (
            <Card className="bg-secondary">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold text-sm">Suggested Goals:</h4>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start h-auto text-left"
                      onClick={() => handleAddSuggestedGoal(suggestion)}
                    >
                      <PlusCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                      <div>
                        {suggestion.goal}
                        {suggestion.brand && <span className="font-semibold text-primary/80 ml-1"> (with {suggestion.brand})</span>}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleGenerateSuggestions} disabled={loading}>
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? "Generating..." : "Get Suggestions"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
