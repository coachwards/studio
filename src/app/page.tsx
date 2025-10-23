
"use client";

import Header from "@/components/layout/header";
import { QuadrantCard } from "@/components/dashboard/quadrant-card";
import { RewardsPanel } from "@/components/dashboard/rewards-panel";
import type { Quadrant, Goal } from "@/lib/types";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const initialQuadrants: Quadrant[] = [
  { id: 'health', title: 'Health', icon: 'HeartPulse', description: "Monitor and improve your physical and mental well-being." },
  { id: 'work', title: 'Work', icon: 'Briefcase', description: "Advance your career, learn new skills, and achieve professional goals." },
  { id: 'finance', title: 'Finance', icon: 'Landmark', description: "Manage your budget, savings, and investments for financial freedom." },
  { id: 'social', title: 'Social', icon: 'Users', description: "Nurture relationships, connect with new people, and engage with your community." },
];

const mockGoals: Goal[] = [
    { id: '1', title: 'Run a 5k', quadrantId: 'health', completed: true, createdAt: '2024-05-10T10:00:00Z' },
    { id: '2', title: 'Meditate 10 minutes daily', quadrantId: 'health', completed: false, createdAt: '2024-05-15T11:00:00Z' },
    { id: '3', title: 'Finish the Next.js course', quadrantId: 'work', completed: false, createdAt: '2024-05-20T14:30:00Z' },
    { id: '4', title: 'Update my portfolio', quadrantId: 'work', completed: false, createdAt: '2024-05-22T16:00:00Z' },
    { id: '5', title: 'Create a monthly budget', quadrantId: 'finance', completed: true, createdAt: '2024-05-01T09:00:00Z' },
    { id: '6', title: 'Call a friend this week', quadrantId: 'social', completed: false, createdAt: '2024-05-25T18:00:00Z' },
];


export default function DashboardPage() {
    const [goals, setGoals] = useState<Goal[]>(mockGoals);

    const handleAddGoal = (title: string, description: string, quadrantId: Quadrant['id']) => {
        const newGoal: Goal = {
            id: uuidv4(),
            title,
            description,
            quadrantId,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setGoals(prev => [...prev, newGoal]);
    };

    const handleToggleGoal = (goalId: string) => {
        setGoals(prev => prev.map(g => g.id === goalId ? { ...g, completed: !g.completed } : g));
    }
    
    const quadrantsWithProgress = initialQuadrants.map(q => {
        const quadrantGoals = goals.filter(g => g.quadrantId === q.id);
        const completedGoals = quadrantGoals.filter(g => g.completed);
        const progress = quadrantGoals.length > 0 ? (completedGoals.length / quadrantGoals.length) * 100 : 0;
        return { ...q, progress };
    });

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quadrantsWithProgress.map((q) => {
                const quadrantGoals = goals.filter(g => g.quadrantId === q.id);
                return (
                    <QuadrantCard 
                        key={q.id} 
                        quadrant={q} 
                        goals={quadrantGoals}
                        onAddGoal={handleAddGoal}
                        onToggleGoal={handleToggleGoal}
                    />
                )
            })}
            </div>
            <div className="grid gap-6">
                <RewardsPanel />
            </div>
        </main>
        </div>
    );
}
