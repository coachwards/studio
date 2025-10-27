
"use client";

import Header from "@/components/layout/header";
import { RewardsPanel } from "@/components/dashboard/rewards-panel";
import type { Activity } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { CheckCircle2, Gift, ShoppingCart, Star } from "lucide-react";


const mockActivities: Activity[] = [
    { id: '1', type: 'purchase', description: 'Made a purchase of $50', points: 50, date: '2024-05-28T10:00:00Z', icon: ShoppingCart },
    { id: '2', type: 'review', description: 'Left a product review', points: 20, date: '2024-05-27T15:30:00Z', icon: Star },
    { id: '3', type: 'reward', description: 'Redeemed "Free Coffee"', points: -100, date: '2024-05-26T11:00:00Z', icon: Gift },
    { id: '4', type: 'purchase', description: 'Made a purchase of $120', points: 120, date: '2024-05-25T09:15:00Z', icon: ShoppingCart },
];

const totalPoints = mockActivities.reduce((sum, activity) => sum + activity.points, 0);


export default function DashboardPage() {
    const userAvatar = PlaceHolderImages.find(image => image.id === 'user-avatar');

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Left Column */}
                    <div className="md:col-span-1 space-y-6">
                        <Card>
                             <CardHeader className="flex-row items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={userAvatar.description} />}
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-2xl font-headline">User Name</CardTitle>
                                    <CardDescription>Loyalty Member</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <div className="text-center p-4 bg-secondary rounded-lg">
                                    <p className="text-sm text-muted-foreground">Total Points</p>
                                    <p className="text-4xl font-bold text-primary">{totalPoints}</p>
                               </div>
                                <Button asChild className="w-full">
                                    <Link href="/profile">View Profile</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Recent Activity</CardTitle>
                                <CardDescription>Here's what you've been up to.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {mockActivities.map(activity => (
                                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                                        <div className={`p-2 rounded-full bg-primary/10 ${activity.points > 0 ? 'text-primary' : 'text-accent'}`}>
                                            <activity.icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-medium text-foreground">{activity.description}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {format(new Date(activity.date), "MMMM d, yyyy 'at' h:mm a")}
                                            </p>
                                        </div>
                                        <div className={`font-semibold ${activity.points > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {activity.points > 0 ? `+${activity.points}` : activity.points} pts
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="grid gap-6">
                    <RewardsPanel />
                </div>
            </main>
        </div>
    );
}
