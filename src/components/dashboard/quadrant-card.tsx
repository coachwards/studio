
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Quadrant, Goal } from "@/lib/types";
import { GoalItem } from "./goal-item";
import { Separator } from "../ui/separator";
import { GoalDialog } from "./goal-dialog";


interface QuadrantCardProps {
    quadrant: Quadrant;
    goals: Goal[];
    onAddGoal: (title: string, quadrant: string, brand?: string) => void;
    onToggleGoal: (id: string) => void;
    onDeleteGoal: (id: string) => void;
}

export function QuadrantCard({ quadrant, goals, onAddGoal, onToggleGoal, onDeleteGoal }: QuadrantCardProps) {
    const completedGoals = goals.filter(g => g.completed).length;
    const totalGoals = goals.length;
    const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

    return (
        <Card className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
                <quadrant.icon className={`h-8 w-8 ${quadrant.color}`} />
                <div>
                    <CardTitle className="font-headline text-xl">{quadrant.title}</CardTitle>
                     <CardDescription>{completedGoals} of {totalGoals} goals completed</CardDescription>
                </div>
            </CardHeader>
             <div className="px-6 pb-4">
                <div className="h-2 w-full bg-secondary rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <CardContent className="flex-grow">
                {goals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center h-full py-8">
                        <p className="text-muted-foreground text-sm">No goals yet. Add one!</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {goals.map(goal => (
                            <GoalItem key={goal.id} goal={goal} onToggle={onToggleGoal} onDelete={onDeleteGoal} />
                        ))}
                    </div>
                )}
            </CardContent>
            <Separator />
            <div className="p-4 flex justify-end">
                <GoalDialog quadrantTitle={quadrant.title} onAddGoal={onAddGoal} />
            </div>
        </Card>
    );
}
