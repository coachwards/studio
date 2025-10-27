

import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Activity } from "@/lib/types";
import { format } from 'date-fns';
import { Gift, ShoppingCart, Star } from "lucide-react";

// Mock data
const mockActivities: Activity[] = [
    { id: '1', type: 'purchase', description: 'Made a purchase of $50', points: 50, date: '2024-05-28T10:00:00Z', icon: ShoppingCart },
    { id: '2', type: 'review', description: 'Left a product review', points: 20, date: '2024-05-27T15:30:00Z', icon: Star },
    { id: '3', type: 'reward', description: 'Redeemed "Free Coffee"', points: -100, date: '2024-05-26T11:00:00Z', icon: Gift },
    { id: '4', type: 'purchase', description: 'Made a purchase of $120', points: 120, date: '2024-05-25T09:15:00Z', icon: ShoppingCart },
    { id: '5', type: 'purchase', description: 'Made a purchase of $75', points: 75, date: '2024-05-24T14:00:00Z', icon: ShoppingCart },
    { id: '6', type: 'review', description: 'Reviewed your recent purchase', points: 20, date: '2024-05-23T18:00:00Z', icon: Star },
];


export default function ActivityLogPage() {
  // Group activities by date
  const groupedActivities = mockActivities
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce((acc, activity) => {
      const date = format(new Date(activity.date), 'MMMM d, yyyy');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {} as Record<string, Activity[]>);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center gap-8">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">My Activity</CardTitle>
            <CardDescription>A log of all your points and rewards activity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {Object.keys(groupedActivities).map(date => (
              <div key={date}>
                <h3 className="text-lg font-semibold text-muted-foreground mb-4 sticky top-16 bg-background/95 py-2 backdrop-blur-sm z-10">
                  {date}
                </h3>
                <div className="space-y-4">
                  {groupedActivities[date].map(activity => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                        <div className={`p-2 rounded-full bg-primary/10 ${activity.points > 0 ? 'text-primary' : 'text-accent'}`}>
                            <activity.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-medium text-foreground">{activity.description}</p>
                            <p className="text-sm text-muted-foreground">
                                {format(new Date(activity.date), "h:mm a")}
                            </p>
                        </div>
                        <div className={`font-semibold ${activity.points > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {activity.points > 0 ? `+${activity.points}` : activity.points} pts
                        </div>
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
