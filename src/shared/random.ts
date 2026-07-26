export type HslColor = {
  background: string;
  text: string;
};

export type ViewportPosition = {
  x: number;
  y: number;
};

export function getRandomHslColor(): HslColor {
  const hue = getRandomInteger(0, 359);
  const saturation = getRandomInteger(58, 92);
  const lightness = getRandomInteger(35, 72);
  const text = lightness > 55 ? '#111827' : '#ffffff';

  return {
    background: `hsl(${hue} ${saturation}% ${lightness}%)`,
    text,
  };
}

export function getRandomViewportPosition(buttonWidth = 140, buttonHeight = 64): ViewportPosition {
  const safePadding = 16;
  const maxX = Math.max(safePadding, window.innerWidth - buttonWidth - safePadding);
  const maxY = Math.max(safePadding, window.innerHeight - buttonHeight - safePadding);

  return {
    x: getRandomInteger(safePadding, maxX),
    y: getRandomInteger(safePadding, maxY),
  };
}

function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
