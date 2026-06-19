import React from 'react';
import {SkiaCanvas} from '@remotion/skia';
import {useCurrentFrame, useVideoConfig, interpolate, Easing} from '@remotion/core';

interface BarChartProps {
  width: number;
  height: number;
  data: {label: string; value: number; color?: string}[];
  title: string;
  delay?: number;
  duration?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  width,
  height,
  data,
  title,
  delay = 0,
  duration = 60,
}) => {
  const frame = useCurrentFrame();
  
  const chartWidth = width * 0.7;
  const chartHeight = height * 0.5;
  const chartX = (width - chartWidth) / 2;
  const chartY = height * 0.25;
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = chartWidth / data.length - 16;
  
  const colors = ['#0ea5e9', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];
  
  return (
    <SkiaCanvas width={width} height={height}>
      {/* Title */}
      <Paragraph
        x={width / 2}
        y={chartY - 30}
        text={title}
        fontSize={28}
        fontWeight="bold"
        color="#ffffff"
        textAlign="center"
      />
      
      {/* Y-axis */}
      <Line
        p1={{x: chartX, y: chartY}}
        p2={{x: chartX, y: chartY + chartHeight}}
        color="#475569"
        strokeWidth={2}
      />
      
      {/* X-axis */}
      <Line
        p1={{x: chartX, y: chartY + chartHeight}}
        p2={{x: chartX + chartWidth, y: chartY + chartHeight}}
        color="#475569"
        strokeWidth={2}
      />
      
      {/* Bars */}
      {data.map((item, index) => {
        const barHeight = (item.value / maxValue) * chartHeight * 0.8;
        const barX = chartX + index * (barWidth + 16) + 8;
        const barY = chartY + chartHeight - barHeight;
        
        const barProgress = interpolate(
          frame,
          [delay + index * 10, delay + index * 10 + duration],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          }
        );
        
        const animatedHeight = barHeight * barProgress;
        const animatedY = chartY + chartHeight - animatedHeight;
        
        return (
          <React.Fragment key={index}>
            {/* Bar */}
            <Rect
              x={barX}
              y={animatedY}
              width={barWidth}
              height={animatedHeight}
              color={item.color || colors[index % colors.length]}
              opacity={0.8}
            />
            
            {/* Value label */}
            <Paragraph
              x={barX + barWidth / 2}
              y={animatedY - 15}
              text={`${item.value}`}
              fontSize={14}
              fontWeight="bold"
              color="#ffffff"
              textAlign="center"
              opacity={barProgress}
            />
            
            {/* Label */}
            <Paragraph
              x={barX + barWidth / 2}
              y={chartY + chartHeight + 20}
              text={item.label}
              fontSize={12}
              color="#94a3b8"
              textAlign="center"
              opacity={barProgress}
            />
          </React.Fragment>
        );
      })}
    </SkiaCanvas>
  );
};

interface PieChartProps {
  width: number;
  height: number;
  data: {label: string; value: number; color?: string}[];
  title: string;
  delay?: number;
  duration?: number;
}

export const PieChart: React.FC<PieChartProps> = ({
  width,
  height,
  data,
  title,
  delay = 0,
  duration = 90,
}) => {
  const frame = useCurrentFrame();
  
  const centerX = width / 2;
  const centerY = height / 2 + 20;
  const radius = Math.min(width, height) * 0.3;
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const colors = ['#0ea5e9', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];
  
  let startAngle = -Math.PI / 2;
  
  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );
  
  return (
    <SkiaCanvas width={width} height={height}>
      {/* Title */}
      <Paragraph
        x={width / 2}
        y={centerY - radius - 30}
        text={title}
        fontSize={28}
        fontWeight="bold"
        color="#ffffff"
        textAlign="center"
      />
      
      {/* Pie slices */}
      {data.map((item, index) => {
        const sliceAngle = (item.value / total) * Math.PI * 2 * progress;
        const endAngle = startAngle + sliceAngle;
        
        const path = new Path();
        path.moveTo(centerX, centerY);
        
        // Arc for the slice
        const startX = centerX + radius * Math.cos(startAngle);
        const startY = centerY + radius * Math.sin(startAngle);
        path.lineTo(startX, startY);
        
        // Draw arc
        for (let angle = startAngle; angle <= endAngle; angle += 0.05) {
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          path.lineTo(x, y);
        }
        
        path.close();
        
        // Calculate label position
        const midAngle = startAngle + sliceAngle / 2;
        const labelRadius = radius * 0.65;
        const labelX = centerX + labelRadius * Math.cos(midAngle);
        const labelY = centerY + labelRadius * Math.sin(midAngle);
        
        startAngle = endAngle;
        
        return (
          <React.Fragment key={index}>
            <Path
              path={path}
              color={item.color || colors[index % colors.length]}
              opacity={0.8}
            />
            
            {/* Percentage label */}
            {sliceAngle > 0.3 && (
              <Paragraph
                x={labelX}
                y={labelY}
                text={`${Math.round((item.value / total) * 100)}%`}
                fontSize={14}
                fontWeight="bold"
                color="#ffffff"
                textAlign="center"
              />
            )}
          </React.Fragment>
        );
      })}
      
      {/* Legend */}
      {data.map((item, index) => {
        const legendX = width * 0.05;
        const legendY = height * 0.85 + index * 25;
        
        return (
          <React.Fragment key={`legend-${index}`}>
            <Rect
              x={legendX}
              y={legendY - 10}
              width={16}
              height={16}
              color={item.color || colors[index % colors.length]}
            />
            <Paragraph
              x={legendX + 24}
              y={legendY + 2}
              text={`${item.label}: ${item.value}%`}
              fontSize={14}
              color="#e2e8f0"
              textAlign="left"
            />
          </React.Fragment>
        );
      })}
    </SkiaCanvas>
  );
};

interface LineChartProps {
  width: number;
  height: number;
  data: {label: string; value: number}[];
  title: string;
  delay?: number;
  duration?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  width,
  height,
  data,
  title,
  delay = 0,
  duration = 90,
}) => {
  const frame = useCurrentFrame();
  
  const chartWidth = width * 0.8;
  const chartHeight = height * 0.5;
  const chartX = (width - chartWidth) / 2;
  const chartY = height * 0.2;
  const maxValue = Math.max(...data.map(d => d.value)) * 1.1;
  
  const pointSpacing = chartWidth / (data.length - 1);
  
  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );
  
  const points = data.map((item, index) => ({
    x: chartX + index * pointSpacing,
    y: chartY + chartHeight - (item.value / maxValue) * chartHeight,
  }));
  
  // Create path for line
  const linePath = new Path();
  if (points.length > 0) {
    linePath.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      const visibleIndex = Math.min(i, Math.floor(progress * (data.length - 1)));
      if (i <= visibleIndex + 1) {
        linePath.lineTo(points[i].x, points[i].y);
      }
    }
  }
  
  return (
    <SkiaCanvas width={width} height={height}>
      {/* Title */}
      <Paragraph
        x={width / 2}
        y={chartY - 20}
        text={title}
        fontSize={26}
        fontWeight="bold"
        color="#ffffff"
        textAlign="center"
      />
      
      {/* Axes */}
      <Line
        p1={{x: chartX, y: chartY}}
        p2={{x: chartX, y: chartY + chartHeight}}
        color="#475569"
        strokeWidth={2}
      />
      <Line
        p1={{x: chartX, y: chartY + chartHeight}}
        p2={{x: chartX + chartWidth, y: chartY + chartHeight}}
        color="#475569"
        strokeWidth={2}
      />
      
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
        <Line
          key={i}
          p1={{x: chartX, y: chartY + chartHeight * ratio}}
          p2={{x: chartX + chartWidth, y: chartY + chartHeight * ratio}}
          color="#334155"
          strokeWidth={1}
          opacity={0.5}
        />
      ))}
      
      {/* Line */}
      <Path
        path={linePath}
        style="stroke"
        strokeCap="round"
        strokeJoin="round"
        strokeWidth={3}
        color="#0ea5e9"
      />
      
      {/* Points and labels */}
      {points.map((point, index) => {
        const pointProgress = interpolate(
          frame,
          [delay + index * 10, delay + index * 10 + 30],
          [0, 1],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
        );
        
        return (
          <React.Fragment key={index}>
            <Circle
              cx={point.x}
              cy={point.y}
              r={6 * pointProgress}
              color="#0ea5e9"
            />
            <Circle
              cx={point.x}
              cy={point.y}
              r={12 * pointProgress}
              color="#0ea5e9"
              opacity={0.2}
            />
            
            {/* Value label */}
            <Paragraph
              x={point.x}
              y={point.y - 20}
              text={`${data[index].value}`}
              fontSize={14}
              fontWeight="bold"
              color="#ffffff"
              textAlign="center"
              opacity={pointProgress}
            />
            
            {/* X-axis label */}
            <Paragraph
              x={point.x}
              y={chartY + chartHeight + 20}
              text={data[index].label}
              fontSize={12}
              color="#94a3b8"
              textAlign="center"
              opacity={pointProgress}
            />
          </React.Fragment>
        );
      })}
    </SkiaCanvas>
  );
};
