import type { BackgroundConfig } from '../types';

export const BACKGROUNDS: BackgroundConfig[] = [
  // Ocean Gradients
  { id: 'deep-sea', name: '深海', type: 'gradient', className: 'bg-deep-sea' },
  { id: 'tropical', name: '热带海', type: 'gradient', className: 'bg-tropical' },
  { id: 'sunset-ocean', name: '海上日落', type: 'gradient', className: 'bg-sunset-ocean' },
  { id: 'arctic', name: '北极', type: 'gradient', className: 'bg-arctic' },
  { id: 'bioluminescent', name: '深海荧光', type: 'gradient', className: 'bg-bioluminescent' },
  // Animated Ocean
  { id: 'bubbles', name: '气泡', type: 'animated', className: 'bg-bubbles' },
  { id: 'coral-reef', name: '珊瑚礁', type: 'animated', className: 'bg-coral-reef' },
  { id: 'underwater', name: '海底世界', type: 'animated', className: 'bg-underwater' },
  { id: 'aurora-ocean', name: '极光海面', type: 'animated', className: 'bg-aurora-ocean' },
  { id: 'pixel-coral', name: '像素珊瑚', type: 'animated', className: 'bg-pixel-coral' },
  // Solid Ocean
  { id: 'midnight', name: '午夜海', type: 'solid', className: 'bg-midnight' },
  { id: 'navy', name: '海军蓝', type: 'solid', className: 'bg-navy' },
  { id: 'teal', name: '深青', type: 'solid', className: 'bg-teal' },
];

export const DEFAULT_BACKGROUND_ID = 'pixel-coral';
