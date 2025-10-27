"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Gift, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const mockRewards = [
    { id: '1', title: '10% Off Next Purchase', category: 'Discount', pointsRequired: 100, unlocked: true },
    { id: '2', title: 'Free Coffee', category: 'Product', pointsRequired: 200, unlocked: true },
    { id: '3', title: 'Early Access to New Arrivals', category: 'Exclusive', pointsRequired: 500, unlocked: false },
    { id: '4', title: '$20 Voucher', category: 'Voucher', pointsRequired: 400, unlocked: false },
    { id: '5', title: 'Free Shipping for a Month', category: 'Service', pointsRequired: 300, unlocked: true },
];

export function RewardsPanel() {
    return (
        <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-accent" />
                    <CardTitle className="font-headline text-2xl">Rewards Catalog</CardTitle>
                </div>
                <CardDescription>Redeem your points for exclusive rewards.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-1 flex flex-col items-center justify-center gap-4 p-6 bg-secondary rounded-lg">
                    <div className="w-full max-w-[300px] aspect-[1.59/1] rounded-lg bg-gradient-to-br from-primary via-primary to-accent p-6 flex flex-col justify-between text-primary-foreground shadow-2xl">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="font-headline text-xl font-bold">Loyalty Card</h3>
                                <Sparkles className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p className="font-mono tracking-widest text-lg">**** **** **** 1234</p>
                            <div className="flex justify-between text-sm">
                                <div>
                                    <p className="opacity-70 text-xs">Card Holder</p>
                                    <p className="font-medium">USER NAME</p>
                                </div>
                                <div>
                                    <p className="opacity-70 text-xs">Points</p>
                                    <p className="font-medium">12,345</p>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className="text-center">
                        <p className="font-bold text-lg text-secondary-foreground">Your Loyalty Card</p>
                        <p className="text-sm text-muted-foreground">Use your points to unlock rewards!</p>
                    </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mockRewards.map(reward => (
                        <Card key={reward.id} className={`flex flex-col p-4 transition-all duration-300 ${reward.unlocked ? 'bg-secondary/80' : 'bg-background/40'}`}>
                           <div className="flex-grow space-y-2">
                             <div className="flex items-start gap-4">
                                <div className="p-2 bg-background rounded-lg">
                                    <Gift className={`h-6 w-6 ${reward.unlocked ? 'text-accent' : 'text-muted-foreground'}`} />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className={`font-semibold ${reward.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>{reward.title}</p>
                                    <Badge variant="outline">{reward.category}</Badge>
                                </div>
                             </div>
                              <p className="text-sm text-muted-foreground pl-12">{reward.pointsRequired} points</p>
                           </div>
                           <div className="pt-4 flex justify-end">
                                <Button size="sm" disabled={!reward.unlocked}>
                                    {reward.unlocked ? "Redeem" : "Locked"}
                                </Button>
                           </div>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
