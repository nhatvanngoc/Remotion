import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from '@remotion/core';
import {Easing} from '@remotion/core';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  from?: number;
  to?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 30,
  from = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + duration], [from, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  return (
    <div style={{opacity}} className="transition-opacity">
      {children}
    </div>
  );
};

interface SpringInProps {
  children: React.ReactNode;
  delay?: number;
  config?: {damping?: number; stiffness?: number};
}

export const SpringIn: React.FC<SpringInProps> = ({
  children,
  delay = 0,
  config = {damping: 200, stiffness: 100},
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame - delay,
    config,
    durationInFrames: 30,
  });

  const opacity = interpolate(
    frame,
    [delay, delay + 15],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {children}
    </div>
  );
};

interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
}

export const SlideUp: React.FC<SlideUpProps> = ({
  children,
  delay = 0,
  distance = 40,
  duration = 30,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const translateY = interpolate(
    frame,
    [delay, delay + duration],
    [distance, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  const opacity = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {children}
    </div>
  );
};

interface StaggerProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  duration?: number;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  staggerDelay = 10,
  duration = 20,
}) => {
  return (
    <>
      {children.map((child, index) => (
        <FadeIn key={index} delay={index * staggerDelay} duration={duration}>
          {child}
        </FadeIn>
      ))}
    </>
  );
};
