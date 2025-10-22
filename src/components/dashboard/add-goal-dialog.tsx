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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Quadrant } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

interface AddGoalDialogProps {
  quadrant: Quadrant;
  children?: React.ReactNode;
  onAddGoal: (title: string, description: string, quadrantId: Quadrant['id']) => void;
}

export function AddGoalDialog({ quadrant, children, onAddGoal }: AddGoalDialogProps) {
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleAddGoal = () => {
    if (!goal.trim()) {
      toast({
        title: "Goal title required",
        description: "Please enter a title for your goal.",
        variant: "destructive",
      });
      return;
    }
    onAddGoal(goal, description, quadrant.id);
    toast({
      title: "Goal Added!",
      description: `Your new goal "${goal}" has been added to the ${quadrant.title} quadrant.`,
    });
    setOpen(false);
    setGoal("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Add New {quadrant.title} Goal</DialogTitle>
          <DialogDescription>
            Define a new goal to track your progress.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="goal-title">Goal Title</Label>
            <Input
              id="goal-title"
              placeholder="e.g., Run a 5k"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="goal-description">Description (Optional)</Label>
            <Textarea
              placeholder="Describe what you want to accomplish."
              id="goal-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddGoal}>
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
