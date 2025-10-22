import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Quadrant, Goal } from "@/lib/types";
import { GoalDialog } from "./goal-dialog";
import { Plus } from "lucide-react";
import * as icons from "lucide-react";
import type { Icon } from "@/lib/types";
import { AddGoalDialog } from "./add-goal-dialog";
import { GoalItem } from "./goal-item";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";


interface QuadrantCardProps {
  quadrant: Quadrant;
  goals: Goal[];
  onAddGoal: (title: string, description: string, quadrantId: Quadrant['id']) => void;
  onToggleGoal: (goalId: string) => void;
}

export function QuadrantCard({ quadrant, goals, onAddGoal, onToggleGoal }: QuadrantCardProps) {
  const IconComponent = icons[quadrant.icon as keyof typeof icons] as Icon;
  const coachAvatar = PlaceHolderImages.find(image => image.id === 'coach-avatar');

  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                  <IconComponent className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl">{quadrant.title}</CardTitle>
          </div>
          <Avatar className="h-10 w-10 border-2 border-primary/50">
            {coachAvatar && (
              <AvatarImage src={coachAvatar.imageUrl} alt={coachAvatar.description} data-ai-hint={coachAvatar.imageHint} />
            )}
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
        </div>
        <CardDescription className="pt-2">{quadrant.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">{Math.round(quadrant.progress)}%</span>
            <Progress value={quadrant.progress} className="h-2 flex-1" />
          </div>
        </div>
        {goals.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
                <h4 className="font-medium text-sm text-foreground/80">Your Goals</h4>
                {goals.map(goal => (
                    <GoalItem key={goal.id} goal={goal} onToggle={onToggleGoal} />
                ))}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="gap-2 pt-4">
        <GoalDialog quadrant={quadrant} />
        <AddGoalDialog quadrant={quadrant} onAddGoal={onAddGoal}>
            <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Goal
            </Button>
        </AddGoalDialog>
      </CardFooter>
    </Card>
  );
}
