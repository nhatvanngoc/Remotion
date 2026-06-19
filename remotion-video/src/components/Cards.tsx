import React from 'react';

interface TechCardProps {
  title: string;
  features: string[];
  delay?: number;
  color?: string;
}

export const TechCard: React.FC<TechCardProps> = ({
  title,
  features,
  delay = 0,
  color = '#0ea5e9',
}) => {
  return (
    <div
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300"
      style={{
        boxShadow: `0 4px 20px ${color}20`,
      }}
    >
      <h3 
        className="text-xl font-bold mb-4"
        style={{color}}
      >
        {title}
      </h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li 
            key={index}
            className="flex items-center gap-2 text-slate-300 text-sm"
          >
            <svg 
              className="w-4 h-4 flex-shrink-0" 
              style={{color}} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface BulletPointProps {
  text: string;
  delay?: number;
  checked?: boolean;
}

export const BulletPoint: React.FC<BulletPointProps> = ({
  text,
  delay = 0,
  checked = true,
}) => {
  return (
    <div 
      className="flex items-start gap-3 py-2"
      style={{
        animation: `slideUp 0.5s ease-out ${delay * 0.1}s both`,
      }}
    >
      {checked && (
        <div className="mt-1 flex-shrink-0">
          <svg 
            className="w-5 h-5 text-emerald-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}
      <span className="text-lg text-slate-200 leading-relaxed">{text}</span>
    </div>
  );
};

interface FutureItemProps {
  title: string;
  icon?: React.ReactNode;
  delay?: number;
}

export const FutureItem: React.FC<FutureItemProps> = ({
  title,
  icon,
  delay = 0,
}) => {
  return (
    <div 
      className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-lg border border-slate-700/30 hover:border-primary/50 transition-all duration-300"
      style={{
        animation: `fadeIn 0.6s ease-out ${delay * 0.15}s both`,
      }}
    >
      {icon || (
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <svg 
            className="w-5 h-5 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
        </div>
      )}
      <span className="text-lg font-medium text-slate-200">{title}</span>
    </div>
  );
};
