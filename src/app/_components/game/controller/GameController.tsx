import { useLongPress } from "./useLongPress";

interface GameControllerProps {
  moveHero: (
    direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight",
  ) => void;
  onAButtonPress: () => void;
}

const GameController = ({ moveHero, onAButtonPress }: GameControllerProps) => {
  const handleUp = useLongPress(() => moveHero("ArrowUp"), 100);
  const handleDown = useLongPress(() => moveHero("ArrowDown"), 100);
  const handleLeft = useLongPress(() => moveHero("ArrowLeft"), 100);
  const handleRight = useLongPress(() => moveHero("ArrowRight"), 100);

  return (
    <div className="flex w-full flex-col items-center rounded-lg border-4 border-gray-800 bg-gray-700 p-4 shadow-lg">
      <div className="flex w-full items-center justify-between">
        {/* 矢印ボタンエリア */}
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-800 bg-gray-800">
          <button
            aria-label="上"
            className="absolute left-1/2 top-2 h-8 w-8 -translate-x-1/2 rounded-md bg-gray-300 shadow-inner hover:bg-gray-400 active:bg-gray-500"
            {...handleUp}
            style={{
              WebkitUserSelect: "none" /* Safari */,
              userSelect: "none",
            }}
          />
          <button
            aria-label="下"
            className="absolute bottom-2 left-1/2 h-8 w-8 -translate-x-1/2 rounded-md bg-gray-300 shadow-inner hover:bg-gray-400 active:bg-gray-500"
            {...handleDown}
            style={{
              WebkitUserSelect: "none" /* Safari */,
              userSelect: "none",
            }}
          />
          <button
            aria-label="左"
            className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-md bg-gray-300 shadow-inner hover:bg-gray-400 active:bg-gray-500"
            {...handleLeft}
            style={{
              WebkitUserSelect: "none" /* Safari */,
              userSelect: "none",
            }}
          />
          <button
            aria-label="右"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-md bg-gray-300 shadow-inner hover:bg-gray-400 active:bg-gray-500"
            {...handleRight}
            style={{
              WebkitUserSelect: "none" /* Safari */,
              userSelect: "none",
            }}
          />
        </div>

        <button
          aria-label="Aボタン"
          className="ml-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-red-900 bg-red-800 text-xl font-bold text-white shadow-md hover:bg-red-900 active:bg-red-800"
          onClick={onAButtonPress}
          style={{
            WebkitUserSelect: "none" /* Safari */,
            userSelect: "none",
          }}
        >
          A
        </button>
      </div>
    </div>
  );
};

export default GameController;
