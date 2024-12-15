import { useState } from "react";

import { useKey } from "react-use";
import { moveHero } from "./moveHero";
import { type GameGrid, type Direction, type Position } from "../types";

export function useHeroMovement<T extends GameGrid>(
  map: T,
  initialPosition: Position<T>,
) {
  const [heroPosition, setHeroPosition] = useState(initialPosition);

  const handleMoveHero = (direction: Direction) => {
    setHeroPosition((prevPosition) => moveHero(map, direction, prevPosition));
  };

  // キーボード入力を監視してキャラクターを移動させる
  useKey("ArrowUp", () => handleMoveHero("ArrowUp"));
  useKey("ArrowDown", () => handleMoveHero("ArrowDown"));
  useKey("ArrowLeft", () => handleMoveHero("ArrowLeft"));
  useKey("ArrowRight", () => handleMoveHero("ArrowRight"));

  return { heroPosition, moveHero: handleMoveHero };
}
