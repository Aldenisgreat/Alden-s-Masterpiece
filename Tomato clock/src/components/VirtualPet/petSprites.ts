// Pixel art dolphin sprites - improved to match reference image
// 16x16 grid, bottlenose dolphin side view facing right
const C = {
  _: 'transparent',
  N: '#0a1628',           // very dark navy outline
  D: '#1a3a6a',           // dark blue
  B: '#2a5a9a',           // medium blue
  U: '#3a7ab8',           // blue body
  L: '#5aa0d0',           // light blue
  C: '#80c0e0',           // very light blue
  W: '#e0f0f8',           // white highlight
  E: '#0a0a1a',           // eye
  T: '#d8c8a0',           // tan/beige
  P: '#d0a898',           // pink/salmon
  O: '#ffa500',           // orange (fish)
  G: '#70b8a0',           // green (sick)
};

// Happy dolphin - matching reference image shape
const happyDolphin = [
  '________________',
  '______N_________',
  '_____NBN________',
  '____NBBBN_______',
  '___NBLUBBBN_____',
  '__NBLWUBBBBN____',
  '_NBCEUBBBBLBN___',
  '_NBUTTTBBBBLN___',
  '__NBTTTTBBBLN___',
  '___NBTPPBBBN____',
  '____NBTTPBBN____',
  '_____NBBBDN_____',
  '______NBBN______',
  '_______NBN______',
  '________N_______',
  '________________',
].map(row => row.split(''));

// Hungry - mouth open with fish
const hungryDolphin = [
  '________________',
  '______N_________',
  '_____NBN________',
  '____NBBBN_______',
  '___NBLUBBBN_____',
  '__NBLWUBBBBN____',
  '_NBCEUBBBBLBN___',
  '_NBUTTOBBBBLN___',
  '__NBTTTTBBBLN___',
  '___NBTPPBBBN____',
  '____NBTTPBBN____',
  '_____NBBBDN_____',
  '______NBBN______',
  '_______NBN______',
  '________N_______',
  '________________',
].map(row => row.split(''));

// Tired - closed eye
const tiredDolphin = [
  '________________',
  '______N_________',
  '_____NBN________',
  '____NBBBN_______',
  '___NBLUBBBN_____',
  '__NBLWUBBBBN____',
  '_NBLUUBBBBBLN___',
  '_NBUTTTBBBBLN___',
  '__NBTTTTBBBLN___',
  '___NBTPPBBBN____',
  '____NBTTPBBN____',
  '_____NBBBDN_____',
  '______NBBN______',
  '_______NBN______',
  '________N_______',
  '________________',
].map(row => row.split(''));

// Bored - half eye
const boredDolphin = [
  '________________',
  '______N_________',
  '_____NBN________',
  '____NBBBN_______',
  '___NBLUBBBN_____',
  '__NBLWUBBBBN____',
  '_NBLLEBBBBBLN___',
  '_NBUTTTBBBBLN___',
  '__NBTTTTBBBLN___',
  '___NBTPPBBBN____',
  '____NBTTPBBN____',
  '_____NBBBDN_____',
  '______NBBN______',
  '_______NBN______',
  '________N_______',
  '________________',
].map(row => row.split(''));

// Sick - green tint
const sickDolphin = [
  '________________',
  '______N_________',
  '_____NGN________',
  '____NGBBN_______',
  '___NGLUBBBN_____',
  '__NGLWUBBBBN____',
  '_NGCEUBBBBLBN___',
  '_NBUTTTBBBBLN___',
  '__NBTTTTBBBLN___',
  '___NBTPPBBBN____',
  '____NBTTPBBN____',
  '_____NBBBDN_____',
  '______NBBN______',
  '_______NBN______',
  '________N_______',
  '________________',
].map(row => row.split(''));

// Eating - fish in mouth
const eatingDolphin = [
  '________________',
  '______N_________',
  '_____NBN________',
  '____NBBBN_______',
  '___NBLUBBBN_____',
  '__NBLWUBBBBN____',
  '_NBCEUBBBBLBN___',
  '_NBUTTOBBBBLN___',
  '__NBTTTTBBBLN___',
  '___NBTPPBBBN____',
  '____NBTTPBBN____',
  '_____NBBBDN_____',
  '______NBBN______',
  '_______NBN______',
  '________N_______',
  '________________',
].map(row => row.split(''));

// Playing - jumping up
const playingDolphin = [
  '______N_________',
  '_____NBN________',
  '____NBBBN_______',
  '___NBLUBBBN_____',
  '__NBLWUBBBBN____',
  '_NBCEUBBBBLBN___',
  '_NBUTTTBBBBLN___',
  '__NBTTTTBBBLN___',
  '___NBTPPBBBN____',
  '____NBTTPBBN____',
  '_____NBBBDN_____',
  '______NBBN______',
  '_______NBN______',
  '________N_______',
  '________________',
  '________________',
].map(row => row.split(''));

// Sleeping - lying flat
const sleepingDolphin = [
  '________________',
  '________________',
  '________________',
  '________________',
  '________________',
  '________________',
  '________________',
  '________________',
  '___NNNNNNNNN____',
  '__NLLEEBBBBDN___',
  '__NTTTBBBBN_____',
  '___NTPPBBN______',
  '____NBBN________',
  '_____NN_________',
  '________________',
  '________________',
].map(row => row.split(''));

const SPRITE_MAP: Record<string, string[][]> = {
  happy: happyDolphin,
  hungry: hungryDolphin,
  tired: tiredDolphin,
  bored: boredDolphin,
  sick: sickDolphin,
  eating: eatingDolphin,
  playing: playingDolphin,
  sleeping: sleepingDolphin,
};

const COLOR_MAP: Record<string, string> = {
  _: 'transparent',
  N: '#0a1628',
  D: '#1a3a6a',
  B: '#2a5a9a',
  U: '#3a7ab8',
  L: '#5aa0d0',
  C: '#80c0e0',
  W: '#e0f0f8',
  E: '#0a0a1a',
  T: '#d8c8a0',
  P: '#d0a898',
  O: '#ffa500',
  G: '#70b8a0',
};

export function generateBoxShadow(spriteName: string, pixelSize: number = 4): string {
  const sprite = SPRITE_MAP[spriteName] || happyDolphin;
  const shadows: string[] = [];

  for (let y = 0; y < sprite.length; y++) {
    for (let x = 0; x < sprite[y].length; x++) {
      const colorKey = sprite[y][x];
      if (colorKey !== '_') {
        const color = COLOR_MAP[colorKey] || '#000000';
        shadows.push(`${x * pixelSize}px ${y * pixelSize}px 0 ${color}`);
      }
    }
  }

  return shadows.join(', ');
}

export function getSpriteSize(pixelSize: number = 4): { width: number; height: number } {
  return {
    width: 16 * pixelSize,
    height: 16 * pixelSize,
  };
}
