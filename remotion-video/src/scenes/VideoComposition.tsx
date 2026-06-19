import React from 'react';
import {AbsoluteFill, Sequence} from '@remotion/core';
import {IntroScene} from './IntroScene';
import {BarChartScene} from './BarChartScene';
import {PieChartScene} from './PieChartScene';
import {LineChartScene} from './LineChartScene';
import {TechCardsScene} from './TechCardsScene';
import {KeyFindingsScene} from './KeyFindingsScene';
import {FutureOutlookScene} from './FutureOutlookScene';

interface VideoProps {
  titleText: string;
  subtitleText: string;
}

const FPS = 30;
const SCENE_DURATION = 150; // 5 seconds per scene at 30fps

export const VideoComposition: React.FC<VideoProps> = ({
  titleText,
  subtitleText,
}) => {
  return (
    <AbsoluteFill>
      {/* Scene 1: Introduction (0-150 frames / 0-5s) */}
      <Sequence from={0} durationInFrames={SCENE_DURATION}>
        <IntroScene 
          titleText={titleText}
          subtitleText={subtitleText}
          width={1920}
          height={1080}
        />
      </Sequence>
      
      {/* Scene 2: Bar Chart - Processing Power (150-300 frames / 5-10s) */}
      <Sequence from={SCENE_DURATION} durationInFrames={SCENE_DURATION}>
        <BarChartScene />
      </Sequence>
      
      {/* Scene 3: Pie Chart - Applications (300-450 frames / 10-15s) */}
      <Sequence from={SCENE_DURATION * 2} durationInFrames={SCENE_DURATION}>
        <PieChartScene />
      </Sequence>
      
      {/* Scene 4: Line Chart - IoT Growth (450-600 frames / 15-20s) */}
      <Sequence from={SCENE_DURATION * 3} durationInFrames={SCENE_DURATION}>
        <LineChartScene />
      </Sequence>
      
      {/* Scene 5: Tech Cards (600-750 frames / 20-25s) */}
      <Sequence from={SCENE_DURATION * 4} durationInFrames={SCENE_DURATION}>
        <TechCardsScene />
      </Sequence>
      
      {/* Scene 6: Key Findings (750-900 frames / 25-30s) */}
      <Sequence from={SCENE_DURATION * 5} durationInFrames={SCENE_DURATION}>
        <KeyFindingsScene />
      </Sequence>
      
      {/* Scene 7: Future Outlook (900-1050 frames / 30-35s) */}
      <Sequence from={SCENE_DURATION * 6} durationInFrames={SCENE_DURATION}>
        <FutureOutlookScene />
      </Sequence>
    </AbsoluteFill>
  );
};
