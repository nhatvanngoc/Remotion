import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from '@remotion/core';
import {FadeIn, SpringIn, SlideUp} from '../components/Animations';
import {CircuitTrace, FloatingChips} from '../components/CircuitGraphics';

interface IntroSceneProps {
  titleText: string;
  subtitleText: string;
  width: number;
  height: number;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  titleText,
  subtitleText,
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  
  // Zoom effect
  const scale = interpolate(frame, [0, 90], [1.2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  return (
    <AbsoluteFill className="bg-darker overflow-hidden">
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-darker via-slate-900 to-darker"
        style={{
          transform: `scale(${scale})`,
        }}
      />
      
      {/* Circuit traces animation */}
      <div className="absolute inset-0 opacity-30">
        <CircuitTrace 
          width={width} 
          height={height} 
          delay={0} 
          duration={60}
          color="#0ea5e9"
        />
      </div>
      
      {/* Floating chips */}
      <div className="absolute inset-0">
        <FloatingChips width={width} height={height} />
      </div>
      
      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-20">
        {/* Title */}
        <SlideUp delay={20} distance={60} duration={40}>
          <h1 
            className="text-6xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 60px rgba(14, 165, 233, 0.3)',
            }}
          >
            {titleText}
          </h1>
        </SlideUp>
        
        {/* Subtitle */}
        <SlideUp delay={40} distance={40} duration={40}>
          <p className="text-2xl text-slate-400 text-center max-w-3xl leading-relaxed">
            {subtitleText}
          </p>
        </SlideUp>
        
        {/* Decorative line */}
        <FadeIn delay={60} duration={30}>
          <div className="mt-12 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        </FadeIn>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-darker to-transparent" />
    </AbsoluteFill>
  );
};
