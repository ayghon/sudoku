export type Position = { line: number; column: number };

export type Cell = {
  fixed: boolean;
  position: Position;
  value?: number;
  notes?: number[];
};
