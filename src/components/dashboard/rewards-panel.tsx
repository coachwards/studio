import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Gift } from "lucide-react";
import { Badge } from "../ui/badge";

const mockRewards = [
    { id: '1', title: 'Completed a 5k Run', quadrant: 'Health', unlocked: true },
    { id: '2', title: 'Saved $500', quadrant: 'Finance', unlocked: true },
    { id: '3', title: 'Connected with 10 new people', quadrant: 'Social', unlocked: false },
    { id: '4', title: 'Finished a certification', quadrant: 'Work', unlocked: false },
];

export function RewardsPanel() {
    return (
        <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-accent" />
                    <CardTitle className="font-headline text-2xl">My Rewards</CardTitle>
                </div>
                <CardDescription>Achievements you've unlocked by reaching your goals.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockRewards.map(reward => (
                        <Card key={reward.id} className={`flex flex-col p-4 transition-all duration-300 ${reward.unlocked ? 'bg-secondary' : 'bg-background/40'}`}>
                           <div className="flex items-start gap-4">
                             <div className="p-2 bg-background rounded-lg">
                                <Gift className={`h-6 w-6 ${reward.unlocked ? 'text-accent' : 'text-muted-foreground'}`} />
                             </div>
                             <div className="flex-1 space-y-1">
                                <p className={`font-semibold ${reward.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>{reward.title}</p>
                                <Badge variant={reward.unlocked ? "default" : "outline"} className={reward.unlocked ? "border-transparent bg-accent/20 text-accent-foreground" : ""}>
                                    {reward.quadrant}
                                </Badge>
                             </div>
                             {reward.unlocked && <Badge variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">Unlocked</Badge>}
                           </div>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
