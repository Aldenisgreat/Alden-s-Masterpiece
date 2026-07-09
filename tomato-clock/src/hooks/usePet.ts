import { useState, useEffect, useCallback, useRef } from 'react';
import type { PetState, PetAction, ShopItem, CoinAnimation, Inventory, HeartAnimation } from '../types';
import { INITIAL_PET_STATE, DECAY_RATES, ACTION_EFFECTS, SLEEP_DURATION_MS, SAVE_KEY, MONEY_KEY, INVENTORY_KEY, COIN_INTERVAL_MS, COIN_AMOUNT, STARTING_MONEY, clamp, getPetMood, getPetNeeds } from '../constants/petConfig';

function loadState(): PetState {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsed: PetState = JSON.parse(saved);
      const elapsedMs = Date.now() - parsed.lastSavedTime;
      const elapsedSec = elapsedMs / 1000;
      return {
        hunger: clamp(parsed.hunger + DECAY_RATES.hunger * elapsedSec),
        happiness: clamp(parsed.happiness + DECAY_RATES.happiness * elapsedSec),
        energy: clamp(parsed.energy + DECAY_RATES.energy * elapsedSec),
        cleanliness: clamp(parsed.cleanliness + DECAY_RATES.cleanliness * elapsedSec),
        lastSavedTime: Date.now(),
      };
    }
  } catch {
    // ignore
  }
  return { ...INITIAL_PET_STATE, lastSavedTime: Date.now() };
}

function loadMoney(): number {
  try {
    const saved = localStorage.getItem(MONEY_KEY);
    return saved ? JSON.parse(saved) : STARTING_MONEY;
  } catch {
    return STARTING_MONEY;
  }
}

function loadInventory(): Inventory {
  try {
    const saved = localStorage.getItem(INVENTORY_KEY);
    return saved ? JSON.parse(saved) : { fish: 0, 'premium-fish': 0 };
  } catch {
    return { fish: 0, 'premium-fish': 0 };
  }
}

export function usePet() {
  const [state, setState] = useState<PetState>(loadState);
  const [action, setAction] = useState<PetAction>('idle');
  const [money, setMoney] = useState<number>(loadMoney);
  const [coins, setCoins] = useState<CoinAnimation[]>([]);
  const [shopOpen, setShopOpen] = useState(false);
  const [inventory, setInventory] = useState<Inventory>(loadInventory);
  const [isSwimming, setIsSwimming] = useState(false);
  const [hearts, setHearts] = useState<HeartAnimation[]>([]);
  const [feedMessage, setFeedMessage] = useState<string | null>(null);
  const actionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const coinIdRef = useRef(0);
  const heartIdRef = useRef(0);

  // Save to localStorage every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        localStorage.setItem(SAVE_KEY, JSON.stringify({ ...prev, lastSavedTime: Date.now() }));
        return prev;
      });
      setMoney(prev => {
        localStorage.setItem(MONEY_KEY, JSON.stringify(prev));
        return prev;
      });
      setInventory(prev => {
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(prev));
        return prev;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Earn coins over time
  useEffect(() => {
    const interval = setInterval(() => {
      setMoney(prev => prev + COIN_AMOUNT);
      const id = coinIdRef.current++;
      const x = 30 + Math.random() * 40;
      const y = 20 + Math.random() * 30;
      setCoins(prev => [...prev, { id, x, y }]);
      setTimeout(() => {
        setCoins(prev => prev.filter(c => c.id !== id));
      }, 1000);
    }, COIN_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Decay over time
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        hunger: clamp(prev.hunger + DECAY_RATES.hunger),
        happiness: clamp(prev.happiness + DECAY_RATES.happiness),
        energy: clamp(prev.energy + DECAY_RATES.energy),
        cleanliness: clamp(prev.cleanliness + DECAY_RATES.cleanliness),
        lastSavedTime: Date.now(),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scheduleActionEnd = useCallback((duration: number, nextAction: PetAction) => {
    setAction(nextAction);
    if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
    actionTimerRef.current = setTimeout(() => {
      setAction('idle');
    }, duration);
  }, []);

  // Spawn pixelated hearts around the dolphin
  const spawnHearts = useCallback(() => {
    const newHearts: HeartAnimation[] = Array.from({ length: 6 }, () => ({
      id: heartIdRef.current++,
      x: -20 + Math.random() * 140, // percentage around dolphin
      y: -10 + Math.random() * 120,
      size: 10 + Math.random() * 10,
      delay: Math.random() * 0.5,
    }));
    setHearts(prev => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 1500);
  }, []);

  // Feed: requires fish in inventory
  const feed = useCallback(() => {
    const totalFish = inventory.fish + inventory['premium-fish'];
    if (totalFish <= 0) return false;
    scheduleActionEnd(2000, 'eating');
    spawnHearts();
    setFeedMessage('your dolphin likes your food!');
    setTimeout(() => setFeedMessage(null), 2500);
    // Use premium fish first (bigger restore)
    if (inventory['premium-fish'] > 0) {
      setInventory(prev => ({ ...prev, 'premium-fish': prev['premium-fish'] - 1 }));
      setState(prev => ({
        ...prev,
        hunger: clamp(prev.hunger + 50),
        lastSavedTime: Date.now(),
      }));
    } else {
      setInventory(prev => ({ ...prev, fish: prev.fish - 1 }));
      setState(prev => ({
        ...prev,
        hunger: clamp(prev.hunger + 20),
        lastSavedTime: Date.now(),
      }));
    }
    return true;
  }, [inventory, scheduleActionEnd, spawnHearts]);

  const play = useCallback(() => {
    scheduleActionEnd(3000, 'playing');
    setState(prev => ({
      ...prev,
      happiness: clamp(prev.happiness + ACTION_EFFECTS.play.happiness),
      energy: clamp(prev.energy + ACTION_EFFECTS.play.energy),
      lastSavedTime: Date.now(),
    }));
  }, [scheduleActionEnd]);

  const sleep = useCallback(() => {
    scheduleActionEnd(SLEEP_DURATION_MS, 'sleeping');
    setState(prev => ({
      ...prev,
      energy: clamp(prev.energy + ACTION_EFFECTS.sleep.energy),
      lastSavedTime: Date.now(),
    }));
  }, [scheduleActionEnd]);

  const clean = useCallback(() => {
    scheduleActionEnd(2000, 'cleaning');
    setState(prev => ({
      ...prev,
      cleanliness: clamp(prev.cleanliness + ACTION_EFFECTS.clean.cleanliness),
      lastSavedTime: Date.now(),
    }));
  }, [scheduleActionEnd]);

  // Buy item from shop - food items go to inventory
  const buyItem = useCallback((item: ShopItem) => {
    if (money < item.cost) return false;
    setMoney(prev => prev - item.cost);
    // Food items go to inventory
    if (item.id === 'fish') {
      setInventory(prev => ({ ...prev, fish: prev.fish + 1 }));
      return true;
    }
    if (item.id === 'premium-fish') {
      setInventory(prev => ({ ...prev, 'premium-fish': prev['premium-fish'] + 1 }));
      return true;
    }
    // Non-food items apply immediately
    setState(prev => {
      const newState = { ...prev, lastSavedTime: Date.now() };
      for (const [key, value] of Object.entries(item.effect)) {
        const statKey = key as keyof Omit<PetState, 'lastSavedTime'>;
        newState[statKey] = clamp(newState[statKey] + (value as number));
      }
      return newState;
    });
    return true;
  }, [money]);

  const toggleShop = useCallback(() => {
    setShopOpen(prev => !prev);
  }, []);

  // Click dolphin to swim
  const triggerSwim = useCallback(() => {
    if (isSwimming) return;
    setIsSwimming(true);
    scheduleActionEnd(1500, 'playing');
    setState(prev => ({
      ...prev,
      happiness: clamp(prev.happiness + 2),
      lastSavedTime: Date.now(),
    }));
    setTimeout(() => {
      setIsSwimming(false);
    }, 1500);
  }, [isSwimming, scheduleActionEnd]);

  const mood = getPetMood(state);
  const needs = getPetNeeds(state);
  const totalFish = inventory.fish + inventory['premium-fish'];

  return {
    state,
    mood,
    action,
    money,
    coins,
    shopOpen,
    needs,
    inventory,
    totalFish,
    isSwimming,
    hearts,
    feedMessage,
    feed,
    play,
    sleep,
    clean,
    buyItem,
    toggleShop,
    triggerSwim,
  };
}
