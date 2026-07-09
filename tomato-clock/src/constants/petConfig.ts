import type { PetState, ShopItem } from '../types';

export const INITIAL_PET_STATE: PetState = {
  hunger: 100,
  happiness: 100,
  energy: 100,
  cleanliness: 100,
  lastSavedTime: Date.now(),
};

export const DECAY_RATES = {
  hunger: -5 / 60,       // -5 per minute
  happiness: -4 / 60,    // -4 per minute
  energy: -3 / 60,       // -3 per minute
  cleanliness: -2 / 60,  // -2 per minute
} as const;

export const ACTION_EFFECTS = {
  feed: { hunger: 25 },
  play: { happiness: 30, energy: -15 },
  sleep: { energy: 40 },
  clean: { cleanliness: 35 },
} as const;

export const SLEEP_DURATION_MS = 10000; // 10 seconds

export const SAVE_KEY = 'tomato-clock-app-state';
export const MONEY_KEY = 'tomato-clock-money';
export const INVENTORY_KEY = 'tomato-clock-inventory';

// Money settings
export const COIN_INTERVAL_MS = 10000; // Earn a coin every 10 seconds
export const COIN_AMOUNT = 1;
export const STARTING_MONEY = 50;

// Shop items
export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'fish',
    name: '小鱼',
    icon: '🐟',
    cost: 5,
    effect: { hunger: 20 },
    description: '恢复 20 饱腹',
  },
  {
    id: 'premium-fish',
    name: '金枪鱼',
    icon: '🐠',
    cost: 15,
    effect: { hunger: 50 },
    description: '恢复 50 饱腹',
  },
  {
    id: 'bubble-toy',
    name: '泡泡玩具',
    icon: '🫧',
    cost: 8,
    effect: { happiness: 25 },
    description: '恢复 25 心情',
  },
  {
    id: 'shell-toy',
    name: '贝壳球',
    icon: '🐚',
    cost: 20,
    effect: { happiness: 60 },
    description: '恢复 60 心情',
  },
  {
    id: 'seaweed-bed',
    name: '海藻床',
    icon: '🌿',
    cost: 10,
    effect: { energy: 35 },
    description: '恢复 35 精力',
  },
  {
    id: 'coral-bed',
    name: '珊瑚床',
    icon: '🪸',
    cost: 25,
    effect: { energy: 80 },
    description: '恢复 80 精力',
  },
  {
    id: 'sponge',
    name: '海绵',
    icon: '🧽',
    cost: 6,
    effect: { cleanliness: 30 },
    description: '恢复 30 清洁',
  },
  {
    id: 'pearl-bath',
    name: '珍珠浴',
    icon: '🫧',
    cost: 18,
    effect: { cleanliness: 70 },
    description: '恢复 70 清洁',
  },
  {
    id: 'feast',
    name: '海洋盛宴',
    icon: '🦑',
    cost: 40,
    effect: { hunger: 100, happiness: 100, energy: 100, cleanliness: 100 },
    description: '全部恢复满！',
  },
];

export function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function getPetMood(state: PetState): string {
  const avg = (state.hunger + state.happiness + state.energy + state.cleanliness) / 4;
  if (avg < 25) return 'sick';
  if (state.hunger < 30) return 'hungry';
  if (state.energy < 30) return 'tired';
  if (state.happiness < 30) return 'bored';
  return 'happy';
}

export function getPetNeeds(state: PetState): string[] {
  const needs: string[] = [];
  if (state.hunger < 40) needs.push('🐟 饥饿');
  if (state.happiness < 40) needs.push('🫧 无聊');
  if (state.energy < 40) needs.push('🌙 困倦');
  if (state.cleanliness < 40) needs.push('✨ 脏了');
  return needs;
}
