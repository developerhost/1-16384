"use client";

import { useCallback, useState } from "react";
import RecordDisplay from "./RecordDisplay";
import GameController from "./controller/GameController";
import { useHeroMovement } from "./move/useHeroMovement";
import { useLocalStorage } from "react-use";
import { initialPosition, ROOM_MAP } from "./const";
import { TileList } from "./map/TileList";
import ChatMessage from "./chat/ChatMessage";
import { useMessage } from "./chat/useMessage";

const Game = () => {
  const [record, setRecord] = useState<number>(1); // 1 -> 1/2, 2 -> 1/4, etc.
  const [bestRecord = 0, setBestRecord] = useLocalStorage<number>(
    "bestRecord",
    1,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { heroPosition, moveHero } = useHeroMovement(ROOM_MAP, initialPosition);

  /** 正解判定ロジック */
  const judgeTreasure = useCallback((): boolean => {
    // 1/2の確率で正解とする
    const correct = Math.random() < 0.5;
    setIsCorrect(correct);

    if (correct) {
      const newRecord = record + 1;
      setRecord(newRecord);
      if (newRecord > bestRecord) {
        setBestRecord(newRecord);
      }
    } else {
      setRecord(1); // 不正解時にリセット
    }

    return correct;
  }, [record, bestRecord, setBestRecord]);

  const { message, handleTileClick, handleAButtonPress } = useMessage({
    onTreasureFound: judgeTreasure,
  });

  return (
    <div
      className="flex flex-col items-center"
      style={{
        WebkitUserSelect: "none" /* Safari */,
        userSelect: "none",
      }}
    >
      <RecordDisplay currentRecord={record} bestRecord={bestRecord} />
      <TileList
        heroPosition={heroPosition}
        map={ROOM_MAP}
        handleTileClick={handleTileClick}
      />
      <GameController
        moveHero={moveHero}
        // TODO: 当たりの宝箱を開いた場合、スコアをアップして次のマップに遷移する
        onAButtonPress={() => handleAButtonPress(heroPosition, ROOM_MAP)}
      />
      {/* チャット表示 */}
      {message && (
        <div className="absolute bottom-4 left-1/2 z-20 w-4/5 -translate-x-1/2 rounded border border-gray-500 bg-black bg-opacity-70 p-4">
          <ChatMessage message={message} />
        </div>
      )}
    </div>
  );
};

export default Game;
