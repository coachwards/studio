import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type QuadrantId = 'health' | 'work' | 'finance' | 'social';

export type Quadrant = {
  id: QuadrantId;
  title: string;
  icon: string;
  progress: number;
  description: string;
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

export type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
