export enum GameMode {
  Easy,
  Medium,
  Hard,
}

export const gameModeToText: Record<GameMode, string> = {
  [GameMode.Easy]: 'Easy',
  [GameMode.Medium]: 'Medium',
  [GameMode.Hard]: 'Hard',
};
