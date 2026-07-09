export interface PetState {
  hunger: number;
  happiness: number;
  energy: number;
  cleanliness: number;
  lastSavedTime: number;
}

export type PetMood = 'happy' | 'hungry' | 'tired' | 'bored' | 'sick';
export type PetAction = 'idle' | 'eating' | 'playing' | 'sleeping' | 'cleaning';

export type BackgroundType = 'gradient' | 'animated' | 'solid';

export interface BackgroundConfig {
  id: string;
  name: string;
  type: BackgroundType;
  className: string;
}

export interface AppState {
  pet: PetState;
  backgroundId: string;
  is24Hour: boolean;
  money: number;
  lastCoinTime: number;
}

export interface ShopItem {
  id: string;
  name: string;
  icon: string;
  cost: number;
  effect: Partial<Record<keyof Omit<PetState, 'lastSavedTime'>, number>>;
  description: string;
}

export interface CoinAnimation {
  id: number;
  x: number;
  y: number;
}

export interface Inventory {
  fish: number;
  'premium-fish': number;
}

export interface HeartAnimation {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}
