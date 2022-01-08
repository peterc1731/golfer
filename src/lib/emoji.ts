const list = [
  '🐟',
  '🤡',
  '🦘',
  '🍍',
  '😈',
  '💩',
  '👻',
  '🤖',
  '👽',
  '👑',
  '🐸',
  '🦆',
  '🦀',
  '🌴',
  '🌞',
  '🔥',
  '🍎',
  '🍔',
  '🏀',
  '🏄',
  '🏎',
  '✈️',
  '🗿',
  '☎️',
  '🔧',
];

export function randomEmoji(exclude: string[] = []) {
  const filtered = list.filter(x => !exclude.includes(x));
  const index = Math.round(Math.random() * (filtered.length - 1));
  return filtered[index];
}
