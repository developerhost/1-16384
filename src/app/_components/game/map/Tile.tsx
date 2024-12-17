import Image from "next/image";
import { TILES } from "./const";
import Floor from "../../../assets/img/tile/floor.svg";
import TileContent from "./TileContent";

type TileProps = {
  isTreasureGreenGoldTaken: boolean;
  isTreasureRedGoldTaken: boolean;
  onClick: () => void;
  type: number;
};

export const Tile = ({
  type,
  onClick,
  isTreasureRedGoldTaken,
  isTreasureGreenGoldTaken,
}: TileProps) => {
  return (
    <div
      className="relative h-full w-full"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(); // Enterキーまたはスペースキーでクリックをシミュレート
        }
      }}
      role="button"
      tabIndex={0}
      style={{
        WebkitUserSelect: "none" /* Safari */,
        userSelect: "none",
      }}
    >
      <TileContent
        isTreasureGreenGoldTaken={isTreasureGreenGoldTaken}
        isTreasureRedGoldTaken={isTreasureRedGoldTaken}
        onClick={onClick}
        type={type}
      />
      {type !== TILES.WALL && (
        <Image
          alt="Floor"
          className="absolute z-0 h-full w-full"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={Floor}
          style={{
            WebkitUserSelect: "none" /* Safari */,
            userSelect: "none",
          }}
        />
      )}
    </div>
  );
};
