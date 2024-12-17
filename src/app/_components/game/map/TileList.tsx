import type { Col, GameGrid, Position, Row } from "../types";
import { TILES } from "./const";
import { Tile } from "./Tile";

type TileProps<T extends GameGrid> = {
  heroPosition: Position<T>;
  map: T;
  handleTileClick: (type: number) => void;
};

export const TileList = <T extends GameGrid>({
  heroPosition,
  map,
  handleTileClick,
}: TileProps<T>) => {
  // TODO: 宝箱の取得状態を管理する
  const treasureGreenGoldTaken = false;
  const treasureRedGoldTaken = false;

  return (
    <div
      className="grid h-full w-full grid-cols-9 gap-0.5"
      style={{
        WebkitUserSelect: "none" /* Safari */,
        userSelect: "none",
      }}
    >
      {map.flatMap((row, rowIndex) =>
        row.map((tile, colIndex) => {
          const currentRow = rowIndex as Row<T>;
          const currentCol = colIndex as Col<T>;

          const isHeroPosition =
            currentRow === heroPosition.row && currentCol === heroPosition.col;

          const isPreviousHeroPosition =
            map[currentRow] && map[currentRow][currentCol] === 0;

          const type = isHeroPosition
            ? TILES.HERO
            : isPreviousHeroPosition
              ? TILES.FLOOR
              : tile;

          return (
            <div
              className="flex items-center justify-center border border-gray-700 bg-gray-800"
              key={`${rowIndex}-${colIndex}`}
              style={{
                WebkitUserSelect: "none" /* Safari */,
                userSelect: "none",
              }}
            >
              <Tile
                isTreasureGreenGoldTaken={treasureGreenGoldTaken}
                isTreasureRedGoldTaken={treasureRedGoldTaken}
                onClick={() => handleTileClick(type)}
                type={type}
              />
            </div>
          );
        }),
      )}
    </div>
  );
};
