
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Goal } from "@/lib/types";
import { format } from 'date-fns';
import { CheckCircle2, Circle } from "lucide-react";

// Mock data, including createdAt property
const mockGoals: Goal[] = [
    { id: '1', title: 'Run a 5k', quadrantId: 'health', completed: true, createdAt: '2024-05-10T10:00:00Z' },
    { id: '2', title: 'Meditate 10 minutes daily', quadrantId: 'health', completed: false, createdAt: '2024-05-15T11:00:00Z' },
    { id: '3', title: 'Finish the Next.js course', quadrantId: 'work', completed: false, createdAt: '2024-05-20T14:30:00Z' },
    { id: '4', title: 'Update my portfolio', quadrantId: 'work', completed: false, createdAt: '2024-05-22T16:00:00Z' },
    { id: '5', title: 'Create a monthly budget', quadrantId: 'finance', completed: true, createdAt: '2024-05-01T09:00:00Z' },
    { id: '6', title: 'Call a friend this week', quadrantId: 'social', completed: false, createdAt: '2024-05-25T18:00:00Z' },
    { id: '7', title: 'Read a book on investing', quadrantId: 'finance', completed: true, createdAt: '2024-04-20T12:00:00Z' },
    { id: '8', title: 'Attend a local meetup', quadrantId: 'social', completed: true, createdAt: '2024-04-28T19:00:00Z' },
];

const quadrantColors: { [key: string]: string } = {
  health: "bg-red-500/10 text-red-500 border-red-500/20",
  work: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  finance: "bg-green-500/10 text-green-500 border-green-500/20",
  social: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export default function JournalPage() {
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
                    <div key={goal.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card/50">
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
