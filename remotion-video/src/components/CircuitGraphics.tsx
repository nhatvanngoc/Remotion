import React from 'react';
import {SkiaCanvas} from '@remotion/skia';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from '@remotion/core';

interface CircuitTraceProps {
  width: number;
  height: number;
  delay?: number;
  duration?: number;
  color?: string;
}

export const CircuitTrace: React.FC<CircuitTraceProps> = ({
  width,
  height,
  delay = 0,
  duration = 60,
  color = '#0ea5e9',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const opacity = interpolate(progress, [0, 0.1, 1], [0, 0.8, 0.3]);

  return (
    <SkiaCanvas width={width} height={height}>
      {/* Horizontal traces */}
      {[0.2, 0.4, 0.6, 0.8].map((yRatio, i) => {
        const y = height * yRatio;
        const startX = i % 2 === 0 ? 0 : width * 0.3;
        const endX = i % 2 === 0 ? width * progress : width;
        
        return (
          <Path
            key={`h-${i}`}
            path={new Path().moveTo(startX, y).lineTo(endX, y)}
            style="stroke"
            strokeCap="round"
            strokeWidth={2}
            color={color}
            opacity={opacity}
          />
        );
      })}
      
      {/* Vertical traces */}
      {[0.25, 0.5, 0.75].map((xRatio, i) => {
        const x = width * xRatio;
        const startY = height * 0.1;
        const endY = height * 0.9 * progress;
        
        return (
          <Path
            key={`v-${i}`}
            path={new Path().moveTo(x, startY).lineTo(x, endY)}
            style="stroke"
            strokeCap="round"
            strokeWidth={1.5}
            color={color}
            opacity={opacity * 0.7}
          />
        );
      })}
      
      {/* Connection nodes */}
      {[
        {x: 0.25, y: 0.4},
        {x: 0.5, y: 0.6},
        {x: 0.75, y: 0.2},
        {x: 0.3, y: 0.8},
      ].map((pos, i) => {
        const nodeProgress = interpolate(frame, [delay + i * 10, delay + i * 10 + 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        
        return (
          <Circle
            key={`n-${i}`}
            cx={width * pos.x}
            cy={height * pos.y}
            r={8 * nodeProgress}
            color={color}
            opacity={nodeProgress * 0.6}
          />
        );
      })}
    </SkiaCanvas>
  );
};

interface ChipIconProps {
  x: number;
  y: number;
  size: number;
  delay?: number;
  color?: string;
}

export const ChipIcon: React.FC<ChipIconProps> = ({
  x,
  y,
  size,
  delay = 0,
  color = '#6366f1',
}) => {
  const frame = useCurrentFrame();
  
  const scale = interpolate(
    frame,
    [delay, delay + 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.elastic(1, 0.5),
    }
  );
  
  const floatOffset = Math.sin((frame - delay) / 20) * 3;
  
  return (
    <g transform={`translate(${x}, ${y + floatOffset}) scale(${scale})`}>
      {/* Chip body */}
      <Rect
        x={-size / 2}
        y={-size / 2}
        width={size}
        height={size}
        color="#1e293b"
      />
      {/* Chip border */}
      <Rect
        x={-size / 2}
        y={-size / 2}
        width={size}
        height={size}
        style="stroke"
        strokeWidth={2}
        color={color}
      />
      {/* Pins */}
      {[-1, 1].map((side) => (
        <React.Fragment key={side}>
          {[-0.3, -0.1, 0.1, 0.3].map((ratio, i) => (
            <Rect
              key={`${side}-${i}`}
              x={side * (size / 2 + 2)}
              y={ratio * size}
              width={4}
              height={size * 0.15}
              color={color}
            />
          ))}
        </React.Fragment>
      ))}
      {/* Center detail */}
      <Rect
        x={-size / 4}
        y={-size / 4}
        width={size / 2}
        height={size / 2}
        color={color}
        opacity={0.3}
      />
    </g>
  );
};

interface FloatingChipsProps {
  width: number;
  height: number;
}

export const FloatingChips: React.FC<FloatingChipsProps> = ({width, height}) => {
  const positions = [
    {x: width * 0.15, y: height * 0.2, delay: 0},
    {x: width * 0.85, y: height * 0.3, delay: 10},
    {x: width * 0.2, y: height * 0.7, delay: 20},
    {x: width * 0.8, y: height * 0.8, delay: 30},
    {x: width * 0.5, y: height * 0.15, delay: 40},
  ];
  
  return (
    <>
      {positions.map((pos, i) => (
        <ChipIcon
          key={i}
          x={pos.x}
          y={pos.y}
          size={40 + i * 5}
          delay={pos.delay}
          color={['#0ea5e9', '#6366f1', '#8b5cf6', '#0ea5e9', '#6366f1'][i]}
        />
      ))}
    </>
  );
};
