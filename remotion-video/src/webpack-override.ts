import {enableTailwind} from '@remotion/tailwind';
import {enableSkia} from '@remotion/skia/enable';

export const webpackOverride = (config) => {
  // Enable Tailwind CSS
  let modifiedConfig = enableTailwind(config);
  
  // Enable Skia for graphics
  modifiedConfig = enableSkia(modifiedConfig);
  
  return modifiedConfig;
};
