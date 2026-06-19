import React from 'react';
import {AbsoluteFill} from '@remotion/core';
import {PieChart} from '../components/Charts';

export const PieChartScene: React.FC = () => {
  const data = [
    {label: 'IoT', value: 40},
    {label: 'Robotics', value: 25},
    {label: 'Smart Home', value: 20},
    {label: 'Industrial', value: 10},
    {label: 'Education', value: 5},
  ];

  return (
    <AbsoluteFill className="bg-darker flex flex-col items-center justify-center px-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-darker via-slate-900/50 to-darker" />
      
      {/* Content container with safe margins */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <PieChart 
          width={1920}
          height={1080}
          data={data}
          title="Microcontroller Applications"
          delay={10}
          duration={80}
        />
        
        {/* Narration text at bottom */}
        <div className="absolute bottom-16 left-16 right-16">
          <p className="text-xl text-slate-400 leading-relaxed max-w-5xl">
            IoT remains the dominant application area, followed by robotics 
            and smart home systems.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
