
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Goal } from "@/lib/types";
import { format } from 'date-fns';
import { CheckCircle2, Circle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// Mock data, including createdAt and coachFeedback properties
const mockGoals: Goal[] = [
    { id: '1', title: 'Run a 5k', quadrantId: 'health', completed: true, createdAt: '2024-05-10T10:00:00Z', coachFeedback: "Great job completing this! Remember to stretch and stay hydrated for your next run." },
    { id: '2', title: 'Meditate 10 minutes daily', quadrantId: 'health', completed: false, createdAt: '2024-05-15T11:00:00Z' },
    { id: '3', title: 'Finish the Next.js course', quadrantId: 'work', completed: false, createdAt: '2024-05-20T14:30:00Z', coachFeedback: "You're making steady progress. Try to block out specific times in your calendar to focus on the remaining modules." },
    { id: '4', title: 'Update my portfolio', quadrantId: 'work', completed: false, createdAt: '2024-05-22T16:00:00Z' },
    { id: '5', title: 'Create a monthly budget', quadrantId: 'finance', completed: true, createdAt: '2024-05-01T09:00:00Z', coachFeedback: "Excellent work on setting up your budget. The next step is to review it weekly to stay on track." },
    { id: '6', title: 'Call a friend this week', quadrantId: 'social', completed: false, createdAt: '2024-05-25T18:00:00Z' },
    { id: '7', title: 'Read a book on investing', quadrantId: 'finance', completed: true, createdAt: '2024-04-20T12:00:00Z' },
    { id: '8', title: 'Attend a local meetup', quadrantId: 'social', completed: true, createdAt: '2024-04-28T19:00:00Z', coachFeedback: "Stepping out of your comfort zone is a huge win. What did you learn from the experience?" },
];

const quadrantColors: { [key: string]: string } = {
  health: "bg-red-500/10 text-red-500 border-red-500/20",
  work: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  finance: "bg-green-500/10 text-green-500 border-green-500/20",
  social: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export default function JournalPage() {
  const coachAvatar = PlaceHolderImages.find(image => image.id === 'coach-avatar');
  // Group goals by date
  const groupedGoals = mockGoals
    .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
    .reduce((acc, goal) => {
      const date = format(new Date(goal.createdAt!), 'MMMM d, yyyy');
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
            <CardDescription>A log of all your goals and targets.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {Object.keys(groupedGoals).map(date => (
              <div key={date}>
                <h3 className="text-lg font-semibold text-muted-foreground mb-4 sticky top-16 bg-background/95 py-2 backdrop-blur-sm z-10">
                  {date}
                </h3>
                <div className="space-y-4">
                  {groupedGoals[date].map(goal => (
                    <div key={goal.id} className="flex flex-col gap-2 p-4 rounded-lg border bg-card/50">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {goal.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                          </div>
                        <div className="flex-grow">
                          <p className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {goal.title}
                          </p>
                           <p className="text-sm text-muted-foreground">{goal.description}</p>
                        </div>
                        <Badge className={`${quadrantColors[goal.quadrantId]}`}>{goal.quadrantId.charAt(0).toUpperCase() + goal.quadrantId.slice(1)}</Badge>
                      </div>
                      {goal.coachFeedback && (
                        <div className="mt-2 ml-9 p-3 rounded-md bg-secondary/50 flex items-start gap-3">
                          <Avatar className="h-8 w-8 border-2 border-primary/50">
                            {coachAvatar && (
                              <AvatarImage src={coachAvatar.imageUrl} alt={coachAvatar.description} data-ai-hint={coachAvatar.imageHint} />
                            )}
                            <AvatarFallback>C</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-secondary-foreground">Coach Feedback</p>
                            <p className="text-sm text-muted-foreground">{goal.coachFeedback}</p>
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
