import { useState } from "react";
import type { GameGrid, Position } from "../types";
import { TILES } from "../map/const";

type UseMessageOptions = {
  onTreasureFound: () => boolean; // 宝箱を見つけたときに正解か不正解かを判定するコールバック
};

/**
 * メッセージを表示するためのカスタムフック
 * 宝箱など特定のオブジェクトに対しては、渡されたコールバックで正解判定を実行
 */
export function useMessage({ onTreasureFound }: UseMessageOptions) {
  const [message, setMessage] = useState("");

  const handleTileClick = (type: number) => {
    switch (type) {
      case TILES.HERO:
        setMessage("こんにちは、私は橋田至です！");
        break;
      case TILES.MURABITO:
        setMessage("村人: メッセージはタイルをクリックすると消えるよ");
        break;
      case TILES.CAT:
        setMessage("猫: 宝箱のどちらが正解だよ");
        break;
      case TILES.TREASURE_RED_GOLD: {
        const isCorrect = onTreasureFound();
        setMessage(isCorrect ? "正解!" : "不正解!");
        break;
      }
      case TILES.TREASURE_GREEN_GOLD: {
        const isCorrect = onTreasureFound();
        setMessage(isCorrect ? "正解!" : "不正解!");
        break;
      }
      default:
        setMessage("");
        break;
    }
  };

  const handleAButtonPress = <T extends GameGrid>(
    heroPosition: Position<T>,
    map: T,
  ) => {
    if (message) {
      // メッセージがすでに表示されている場合はクリア
      setMessage("");
      return;
    }

    const directions = [
      { rowOffset: -1, colOffset: 0 }, // 上
      { rowOffset: 1, colOffset: 0 }, // 下
      { rowOffset: 0, colOffset: -1 }, // 左
      { rowOffset: 0, colOffset: 1 }, // 右
    ];

    // 有効なタイルを見つけるためのフラグ
    let foundValidTile = false;

    for (const { rowOffset, colOffset } of directions) {
      const row = heroPosition.row + rowOffset;
      const col = heroPosition.col + colOffset;

      // 範囲外チェック
      if (
        row < 0 ||
        row >= map.length ||
        col < 0 ||
        !map[0] ||
        col >= map[0].length
      ) {
        continue;
      }

      if (!map[row]) continue;
      const tileType = map[row][col];

      if (tileType === undefined) continue;

      // 壁と床以外なら有効タイル
      if (tileType !== TILES.FLOOR && tileType !== TILES.WALL) {
        // 宝箱の場合
        if (
          tileType === TILES.TREASURE_RED_GOLD ||
          tileType === TILES.TREASURE_GREEN_GOLD
        ) {
          const correct = onTreasureFound();
          setMessage(correct ? "正解!" : "不正解!");
        } else {
          // 通常タイルはクリック時と同じ処理
          handleTileClick(tileType);
        }
        foundValidTile = true;
        break;
      }
    }

    if (!foundValidTile) {
      setMessage("近くに何もないようだ");
    }
  };

  return {
    message,
    handleTileClick,
    handleAButtonPress,
  };
}
