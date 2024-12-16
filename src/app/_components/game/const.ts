import { type GameGrid, type Position } from "./types";

export const MAP_PATTERNS = [
  [
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 2, 8, 8, 8, 8, 0, 6, 9],
    [9, 8, 8, 8, 8, 8, 8, 8, 9],
    [9, 8, 8, 8, 8, 8, 8, 8, 9],
    [9, 4, 8, 8, 1, 8, 8, 5, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
  ] as const satisfies GameGrid,
  [
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 8, 8, 8, 8, 8, 0, 6, 9],
    [9, 8, 8, 8, 4, 8, 8, 8, 9],
    [9, 8, 8, 8, 8, 8, 5, 8, 9],
    [9, 8, 8, 8, 3, 8, 8, 8, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
  ] as const satisfies GameGrid,
  [
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 4, 8, 8, 8, 8, 0, 6, 9],
    [9, 8, 8, 5, 8, 8, 8, 8, 9],
    [9, 8, 8, 8, 8, 8, 8, 8, 9],
    [9, 8, 8, 8, 1, 8, 8, 2, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
  ] as const satisfies GameGrid,
  [
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 8, 8, 8, 8, 8, 0, 6, 9],
    [9, 8, 8, 8, 8, 8, 8, 8, 9],
    [9, 8, 4, 8, 8, 5, 8, 8, 9],
    [9, 8, 8, 8, 8, 8, 8, 2, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
  ] as const satisfies GameGrid,
] as const;

export const initialPosition = { row: 1, col: 6 } as const satisfies Position<
  (typeof MAP_PATTERNS)[number]
>;
