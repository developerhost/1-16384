"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecordDisplay from "./RecordDisplay";
import GameController from "./controller/GameController";
import { useHeroMovement } from "./move/useHeroMovement";
import { MAP_PATTERNS } from "./const";
import { TileList } from "./map/TileList";
import ChatMessage from "./chat/ChatMessage";
import { useMessage } from "./chat/useMessage";
import { useSyncExternalStore } from "react";
import { bestRecordStore } from "./bestRecordStore";

const Game = () => {
  const [record, setRecord] = useState<number>(1); // 1 -> 1/2, 2 -> 1/4, etc.
  const bestRecord = useSyncExternalStore(
    bestRecordStore.subscribe,
    bestRecordStore.getSnapshot,
    () => 1, // 初期値
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [currentMap, setCurrentMap] = useState<(typeof MAP_PATTERNS)[number]>(
    MAP_PATTERNS[0],
  );

  const { heroPosition, setHeroPosition, moveHero } = useHeroMovement(
    currentMap.map,
    currentMap.initialPosition,
  );

  /** 正解判定ロジック */
  const judgeTreasure = useCallback((): boolean => {
    // 1/2の確率で正解とする
    const correct = Math.random() < 0.5;
    setIsCorrect(correct);

    if (correct) {
      const newRecord = record + 1;
      setRecord(newRecord);
      if (newRecord > bestRecord) {
        bestRecordStore.setValue(newRecord);
      }
    } else {
      setRecord(1); // 不正解時にリセット
    }

    // マップパターンをランダムに変更
    const otherMaps = MAP_PATTERNS.filter((map) => map.id !== currentMap.id);
    const randomMap =
      otherMaps[Math.floor(Math.random() * otherMaps.length)] ??
      MAP_PATTERNS[0];
    setCurrentMap(randomMap);
    // ヒーローの位置をリセット
    setHeroPosition(randomMap.initialPosition);

    return correct;
  }, [setHeroPosition, record, bestRecord, currentMap.id]);

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

      {/* AnimatePresenceでマップの変更にアニメーションを追加 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMap.id} // 一意のIDをキーとして使用
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="flex h-full w-full items-center justify-center"
        >
          <TileList
            heroPosition={heroPosition}
            map={currentMap.map}
            handleTileClick={handleTileClick}
          />
        </motion.div>
      </AnimatePresence>

      <GameController
        moveHero={moveHero}
        onAButtonPress={() => handleAButtonPress(heroPosition, currentMap.map)}
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
