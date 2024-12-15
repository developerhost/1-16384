"use client";

import { useState } from "react";
import ChoicesButtonGroup from "./ChoicesButtonGroup";
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
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { heroPosition, moveHero } = useHeroMovement(ROOM_MAP, initialPosition);

  const {
    message,
    handleTileClick,
    handleAButtonPress,
    treasureRedGoldTaken,
    treasureRedGoldTaken2,
    treasureGreenGoldTaken,
  } = useMessage();

  const handleButtonClick = () => {
    const correct = Math.random() < 0.5; // 1/2の確率で正解
    setIsCorrect(correct);

    if (correct) {
      const newRecord = record + 1;
      setRecord(newRecord);
      // ベスト記録更新時に更新
      if (newRecord > bestRecord) {
        setBestRecord(newRecord);
      }
    } else {
      setRecord(1); // 不正解時にリセット
    }
  };

  return (
    <div
      className="flex flex-col items-center"
      style={{
        WebkitUserSelect: "none" /* Safari */,
        userSelect: "none",
      }}
    >
      <TileList heroPosition={heroPosition} map={ROOM_MAP} />
      <GameController
        moveHero={moveHero}
        // TODO: 当たりの宝箱を開いた場合、スコアをアップして次のマップに遷移する
        onAButtonPress={() => console.log("Aボタンが押されました")}
      />
      {/* チャット表示 */}
      {message && (
        <div className="absolute bottom-4 left-1/2 z-20 w-4/5 -translate-x-1/2 rounded border border-gray-500 bg-black bg-opacity-70 p-4">
          <ChatMessage message={message} />
        </div>
      )}
      <ChoicesButtonGroup onClick={handleButtonClick} />
      {isCorrect !== null && (
        <div
          className={`mt-4 text-lg ${isCorrect ? "text-green-600" : "text-red-600"}`}
        >
          {isCorrect ? "正解!" : "不正解!"}
        </div>
      )}
      <RecordDisplay currentRecord={record} bestRecord={bestRecord} />
    </div>
  );
};

export default Game;
