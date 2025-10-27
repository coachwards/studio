
'use client';
import { useState, useEffect } from 'react';
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Goal } from "@/lib/types";
import { format } from 'date-fns';
import { CheckCircle2, Circle, MessageSquare, User } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";


const mockGoals: Goal[] = [
    { id: '1', title: 'Meditate for 10 minutes daily', quadrant: 'Health & Wellness', completed: true, createdAt: '2024-05-28T10:00:00Z', brand: 'Yoga Centre', coachFeedback: 'Great job on maintaining consistency! Try to increase to 15 minutes next week.' },
    { id: '2', title: 'Update resume', quadrant: 'Career & Work', completed: true, createdAt: '2024-05-27T15:30:00Z' },
    { id: '3', title: 'Read one chapter of a finance book', quadrant: 'Finance & Investment', completed: false, createdAt: '2024-05-27T11:00:00Z' },
    { id: '4', title: 'Go for a 30-minute walk', quadrant: 'Health & Wellness', completed: true, createdAt: '2024-05-26T09:15:00Z', coachFeedback: 'Excellent work staying active. How did you feel after the walk?' },
    { id: '5', title: 'Attend a networking event', quadrant: 'Social & Relationships', completed: false, createdAt: '2024-05-25T14:00:00Z' },
];


export default function JournalPage() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const coachAvatar = PlaceHolderImages.find(image => image.id === 'coach-avatar');

  // Group goals by date
  const groupedGoals = goals
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .reduce((acc, goal) => {
      const date = format(new Date(goal.createdAt), 'MMMM d, yyyy');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(goal);
      return acc;
    }, {} as Record<string, Goal[]>);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center gap-8">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">My Journal</CardTitle>
            <CardDescription>A log of all your goals and progress.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {Object.keys(groupedGoals).map(date => (
              <div key={date}>
                <h3 className="text-lg font-semibold text-muted-foreground mb-4 sticky top-16 bg-background/95 py-2 backdrop-blur-sm z-10">
                  {date}
                </h3>
                <div className="space-y-6">
                  {groupedGoals[date].map(goal => (
                    <div key={goal.id} className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        {goal.completed ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                        <div className="flex-grow">
                            <p className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                {goal.title}
                                {goal.brand && <span className="text-primary font-semibold ml-2">({goal.brand})</span>}
                            </p>
                            <p className="text-sm text-muted-foreground">{goal.quadrant}</p>
                        </div>
                      </div>
                      {goal.coachFeedback && (
                        <div className="flex items-start gap-4 pl-9">
                          <Avatar className="h-8 w-8 border-2 border-accent">
                            {coachAvatar && <AvatarImage src={coachAvatar.imageUrl} alt={coachAvatar.description} />}
                            <AvatarFallback>C</AvatarFallback>
                          </Avatar>
                          <div className="bg-secondary/50 p-3 rounded-lg flex-1">
                            <p className="text-sm font-semibold text-accent-foreground/90">Coach Feedback</p>
                            <p className="text-sm text-secondary-foreground">{goal.coachFeedback}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
