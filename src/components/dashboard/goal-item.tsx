
'use client';

import { Checkbox } from "@/components/ui/checkbox";
import type { Goal } from "@/lib/types";

interface GoalItemProps {
    goal: Goal;
    onToggle: (id: string) => void;
}

export function GoalItem({ goal, onToggle }: GoalItemProps) {
    return (
        <div className="flex items-center space-x-3">
            <Checkbox
                id={`goal-${goal.id}`}
                checked={goal.completed}
                onCheckedChange={() => onToggle(goal.id)}
            />
            <label
                htmlFor={`goal-${goal.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[completed=true]:line-through data-[completed=true]:text-muted-foreground"
                data-completed={goal.completed}
            >
                {goal.title}
            </label>
        </div>
    );
}
