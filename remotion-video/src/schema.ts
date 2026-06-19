import {z} from 'zod';
import {zColor} from '@remotion/zod-types';

export const videoSchema = z.object({
  titleText: z.string().default('Evolution of Microcontrollers'),
  subtitleText: z.string().default('From Arduino to modern IoT and edge AI platforms'),
  primaryColor: zColor().default('#0ea5e9'),
  secondaryColor: zColor().default('#6366f1'),
  accentColor: zColor().default('#8b5cf6'),
  backgroundColor: zColor().default('#020617'),
});

export type VideoProps = z.infer<typeof videoSchema>;
