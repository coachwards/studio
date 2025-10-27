import type { LucideIcon, LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type Activity = {
  id: string;
  type: 'purchase' | 'review' | 'referral' | 'reward';
  description: string;
  points: number;
  date: string;
  icon: LucideIcon;
};

export type Reward = {
  id: string;
  title: string;
  category: string;
  pointsRequired: number;
  unlocked: boolean;
};

export type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
