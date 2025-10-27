import type { LucideIcon } from 'lucide-react';

export type Quadrant = {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
};

export type Goal = {
  id: string;
  title: string;
  quadrant: string;
  completed: boolean;
  createdAt?: string;
  brand?: string;
  coachFeedback?: string;
};

export type SWOTAnalysis = {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
}
