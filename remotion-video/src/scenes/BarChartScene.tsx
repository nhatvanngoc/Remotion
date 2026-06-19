import React from 'react';
import {AbsoluteFill} from '@remotion/core';
import {BarChart} from '../components/Charts';

export const BarChartScene: React.FC = () => {
  const data = [
    {label: 'Arduino UNO', value: 16},
    {label: 'ESP8266', value: 80},
    {label: 'RPi Pico 2', value: 150},
    {label: 'STM32F407', value: 168},
    {label: 'ESP32', value: 240},
  ];

  return (
    <AbsoluteFill className="bg-darker flex flex-col items-center justify-center px-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-darker via-slate-900/50 to-darker" />
      
      {/* Content container with safe margins */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <BarChart 
          width={1920}
          height={1080}
          data={data}
          title="Clock Speed Comparison (MHz)"
          delay={10}
          duration={60}
        />
        
        {/* Narration text at bottom */}
        <div className="absolute bottom-16 left-16 right-16">
          <p className="text-xl text-slate-400 leading-relaxed max-w-5xl">
            Microcontrollers have evolved significantly in processing power, 
            enabling more advanced embedded applications.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
