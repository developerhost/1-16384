import { type GameGrid } from "./types";

export const MAP_PATTERNS = [
  {
    id: 1,
    map: [
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 4, 5, 8, 8, 8, 0, 6, 9],
      [9, 8, 8, 8, 8, 8, 8, 8, 9],
      [9, 8, 8, 8, 1, 8, 8, 2, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
    ] as const satisfies GameGrid,
    initialPosition: { row: 1, col: 6 } as const,
  },
  {
    id: 2,
    map: [
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 8, 8, 8, 8, 8, 0, 6, 9],
      [9, 8, 8, 8, 4, 8, 8, 8, 9],
      [9, 8, 8, 8, 8, 8, 8, 8, 9],
      [9, 5, 8, 8, 3, 8, 8, 8, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
    ] as const satisfies GameGrid,
    initialPosition: { row: 1, col: 6 } as const,
  },
  {
    id: 3,
    map: [
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 4, 8, 8, 8, 8, 0, 6, 9],
      [9, 8, 8, 5, 8, 8, 8, 8, 9],
      [9, 8, 8, 8, 8, 8, 8, 8, 9],
      [9, 8, 8, 8, 1, 8, 8, 2, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
    ] as const satisfies GameGrid,
    initialPosition: { row: 1, col: 6 } as const,
  },
  {
    id: 4,
    map: [
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 8, 8, 8, 8, 8, 0, 6, 9],
      [9, 8, 8, 8, 8, 8, 8, 8, 9],
      [9, 8, 4, 8, 8, 5, 8, 8, 9],
      [9, 8, 8, 8, 8, 8, 8, 2, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
    ] as const satisfies GameGrid,
    initialPosition: { row: 1, col: 6 } as const,
  },
] as const;
