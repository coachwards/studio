import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type QuadrantId = 'health' | 'work' | 'finance' | 'social';

export type Quadrant = {
  id: QuadrantId;
  title: string;
  icon: string;
  description: string;
  progress?: number;
};

export type Reward = {
  id: string;
  title: string;
  description: string;
  quadrant: Quadrant['id'];
};

export type NextSteps = {
    opportunities: string;
    targets: string;
    nextSteps: string;
}

export type SwotAnalysis = {
    strengths: string;
    weaknesses: string;
    opportunities: string;
    threats: string;
    personalizedInsights: string;
};

export type SwoAnalysis = {
    opportunities: string;
    targets: string;
    personalizedInsights: string;
};

export type Goal = {
  id: string;
  title: string;
  description?: string;
  quadrantId: QuadrantId;
  completed: boolean;
};

export type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
