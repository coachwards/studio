
'use client';
import { useState } from 'react';
import Header from "@/components/layout/header";
import { QuadrantCard } from "@/components/dashboard/quadrant-card";
import { AddGoalDialog } from "@/components/dashboard/add-goal-dialog";
import { NextStepsDialog } from "@/components/dashboard/next-steps-dialog";
import type { Goal, Quadrant } from "@/lib/types";
import { HeartPulse, Briefcase, Landmark, Users } from 'lucide-react';
import { RewardsPanel } from '@/components/dashboard/rewards-panel';

const initialQuadrants: Quadrant[] = [
    { id: 'health', title: 'Health & Wellness', icon: HeartPulse, color: 'text-red-400' },
    { id: 'work', title: 'Career & Work', icon: Briefcase, color: 'text-blue-400' },
    { id: 'finance', title: 'Finance & Investment', icon: Landmark, color: 'text-green-400' },
    { id: 'social', title: 'Social & Relationships', icon: Users, color: 'text-yellow-400' },
];

const mockGoals: Goal[] = [
    { id: '1', title: 'Meditate for 10 minutes daily', quadrant: 'Health & Wellness', completed: false, brand: 'Yoga Centre' },
    { id: '2', title: 'Update resume', quadrant: 'Career & Work', completed: true },
    { id: '3', title: 'Read one chapter of a finance book', quadrant: 'Finance & Investment', completed: false },
];


export default function DashboardPage() {
    const [goals, setGoals] = useState<Goal[]>(mockGoals);
    const [quadrants, setQuadrants] = useState<Quadrant[]>(initialQuadrants);

    const handleAddGoal = (title: string, quadrant: string, brand?: string) => {
        const newGoal: Goal = {
            id: `goal_${Date.now()}`,
            title,
            quadrant,
            completed: false,
            brand,
            createdAt: new Date().toISOString(),
        };
        setGoals(prevGoals => [...prevGoals, newGoal]);
    };

    const handleToggleGoal = (id: string) => {
        setGoals(prevGoals =>
            prevGoals.map(goal =>
                goal.id === id ? { ...goal, completed: !goal.completed } : goal
            )
        );
    };

    const handleDeleteGoal = (id: string) => {
      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
    };
    
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="flex items-center justify-between">
                    <h1 className="font-headline text-3xl font-semibold">My Dashboard</h1>
                    <div className="flex items-center gap-2">
                        <NextStepsDialog goals={goals} />
                        <AddGoalDialog 
                          quadrants={quadrants}
                          onAddGoal={handleAddGoal} 
                        />
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {quadrants.map(quadrant => (
                        <QuadrantCard
                            key={quadrant.id}
                            quadrant={quadrant}
                            goals={goals.filter(g => g.quadrant === quadrant.title)}
                            onAddGoal={handleAddGoal}
                            onToggleGoal={handleToggleGoal}
                            onDeleteGoal={handleDeleteGoal}
                        />
                    ))}
                </div>
                <div className="pt-8">
                    <RewardsPanel />
                </div>
            </main>
        </div>
    );
}
