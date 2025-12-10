import React from 'react';
import { InstructionStep } from '../types';

interface InstructionCardProps {
  step: InstructionStep;
}

export const InstructionCard: React.FC<InstructionCardProps> = ({ step }) => {
  const Icon = step.icon;
  
  return (
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-all duration-300 hover:border-indigo-500/50 group">
      <div className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="text-white w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">
        {step.description}
      </p>
    </div>
  );
};