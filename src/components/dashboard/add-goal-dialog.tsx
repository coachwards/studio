
'use client';
import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import type { Quadrant } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface AddGoalDialogProps {
  quadrants: Quadrant[];
  onAddGoal: (title: string, quadrant: string, brand?: string) => void;
}

export function AddGoalDialog({ quadrants, onAddGoal }: AddGoalDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [quadrant, setQuadrant] = useState('');
  const { toast } = useToast();

  const handleAddGoal = () => {
    if (!title || !quadrant) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both a title and a quadrant for your goal.",
      });
      return;
    }
    onAddGoal(title, quadrant);
    setTitle('');
    setQuadrant('');
    setOpen(false);
    toast({
      title: "Goal Added!",
      description: `Your new goal "${title}" has been added to the ${quadrant} quadrant.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Goal</DialogTitle>
          <DialogDescription>
            What do you want to accomplish? Add a new goal to one of your quadrants.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Goal
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Meditate for 10 minutes"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quadrant" className="text-right">
              Quadrant
            </Label>
            <Select onValueChange={setQuadrant} value={quadrant}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a quadrant" />
              </SelectTrigger>
              <SelectContent>
                {quadrants.map(q => (
                  <SelectItem key={q.id} value={q.title}>{q.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddGoal}>Add Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
