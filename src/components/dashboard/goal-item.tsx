
'use client';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Goal } from "@/lib/types";
import { GripVertical, Trash2 } from "lucide-react";

interface GoalItemProps {
  goal: Goal;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function GoalItem({ goal, onToggle, onDelete }: GoalItemProps) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary/50 group">
      <GripVertical className="h-5 w-5 text-muted-foreground/50" />
      <Checkbox
        id={`goal-${goal.id}`}
        checked={goal.completed}
        onCheckedChange={() => onToggle(goal.id)}
      />
      <label
        htmlFor={`goal-${goal.id}`}
        className={`flex-grow text-sm cursor-pointer ${
          goal.completed ? "line-through text-muted-foreground" : "text-foreground"
        }`}
      >
        {goal.title}
        {goal.brand && <span className="text-primary font-semibold ml-2">({goal.brand})</span>}
      </label>
      <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => onDelete(goal.id)}>
          <Trash2 className="h-4 w-4 text-destructive" />
          <span className="sr-only">Delete goal</span>
      </Button>
    </div>
  );
}
