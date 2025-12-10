import { LucideIcon } from 'lucide-react';

export interface InstructionStep {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export enum AppView {
  GUIDE = 'GUIDE',
  DEMO = 'DEMO'
}