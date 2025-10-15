import Header from "@/components/layout/header";
import { QuadrantCard } from "@/components/dashboard/quadrant-card";
import { RewardsPanel } from "@/components/dashboard/rewards-panel";
import type { Quadrant } from "@/lib/types";

const quadrants: Quadrant[] = [
  { id: 'health', title: 'Health', icon: 'HeartPulse', progress: 75, description: "Monitor and improve your physical and mental well-being." },
  { id: 'work', title: 'Work', icon: 'Briefcase', progress: 40, description: "Advance your career, learn new skills, and achieve professional goals." },
  { id: 'finance', title: 'Finance', icon: 'Landmark', progress: 60, description: "Manage your budget, savings, and investments for financial freedom." },
  { id: 'social', title: 'Social', icon: 'Users', progress: 85, description: "Nurture relationships, connect with new people, and engage with your community." },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quadrants.map((q) => (
            <QuadrantCard key={q.id} quadrant={q} />
          ))}
        </div>
        <div className="grid gap-6">
            <RewardsPanel />
        </div>
      </main>
    </div>
  );
}
