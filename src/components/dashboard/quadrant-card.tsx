import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { Quadrant } from "@/lib/types";
import { GoalDialog } from "./goal-dialog";
import { Plus } from "lucide-react";
import * as icons from "lucide-react";
import type { Icon } from "@/lib/types";


interface QuadrantCardProps {
  quadrant: Quadrant;
}

export function QuadrantCard({ quadrant }: QuadrantCardProps) {
  const Icon = icons[quadrant.icon as keyof typeof icons] as Icon;

  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">{quadrant.title}</CardTitle>
        </div>
        <CardDescription className="pt-2">{quadrant.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">{quadrant.progress}%</span>
          <Progress value={quadrant.progress} className="h-2 flex-1" />
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <GoalDialog quadrant={quadrant} />
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Goal
        </Button>
      </CardFooter>
    </Card>
  );
}
