import Cat from "../../../assets/img/character/cat.svg";
import Hero from "../../../assets/img/character/hero.svg";
import Murabito from "../../../assets/img/character/murabito.svg";
import Bed from "../../../assets/img/object/bed.svg";
import Floor from "../../../assets/img/tile/floor.svg";
import Wall from "../../../assets/img/tile/wall.svg";
import TreasureGreenGold from "../../../assets/img/treasure/treasure_green_gold.svg";
import TreasureGreenGoldEmpty from "../../../assets/img/treasure/treasure_green_gold_empty.svg";
import TreasureRedGold from "../../../assets/img/treasure/treasure_red_gold.svg";
import TreasureRedGoldEmpty from "../../../assets/img/treasure/treasure_red_gold_empty.svg";
import { TILES } from "./const";
import Image from "next/image";

interface TileContentProps {
  isTreasureGreenGoldTaken: boolean;
  isTreasureRedGoldTaken: boolean;
  onClick: () => void;
  type: number;
}

const TileContent = ({
  type,
  isTreasureRedGoldTaken,
  isTreasureGreenGoldTaken,
  onClick,
}: TileContentProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick();
    }
  };

  const interactiveProps = {
    role: "button",
    tabIndex: 0,
    onClick,
    onKeyDown: handleKeyDown,
  };

  switch (type) {
    case TILES.HERO:
      return (
        <Image
          alt="Hero"
          className="absolute z-10 h-full w-full"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={Hero}
          style={{
            WebkitUserSelect: "none" /* Safari */,
            userSelect: "none",
          }}
          {...interactiveProps}
        />
      );
    case TILES.MURABITO:
      return (
        <Image
          alt="Murabito"
          className="absolute z-10 h-full w-full"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={Murabito}
          style={{
            WebkitUserSelect: "none" /* Safari */,
            userSelect: "none",
          }}
          {...interactiveProps}
        />
      );
    case TILES.CAT:
      return (
        <Image
          alt="Cat"
          className="absolute z-10 h-full w-full"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={Cat}
          style={{
            WebkitUserSelect: "none" /* Safari */,
            userSelect: "none",
          }}
          {...interactiveProps}
        />
      );
    case TILES.TREASURE_RED_GOLD:
      return (
        <Image
          alt="Treasure Red Gold"
          className="absolute z-10 h-full w-full"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={isTreasureRedGoldTaken ? TreasureRedGoldEmpty : TreasureRedGold}
          style={{
            WebkitUserSelect: "none" /* Safari */,
            userSelect: "none",
          }}
          {...interactiveProps}
        />
      );
    case TILES.TREASURE_GREEN_GOLD:
      return (
        <Image
          alt="Treasure Green Gold"
          className="absolute z-10 h-full w-full"
          src={
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            isTreasureGreenGoldTaken
              ? TreasureGreenGoldEmpty
              : TreasureGreenGold
          }
          style={{
            WebkitUserSelect: "none" /* Safari */,
            userSelect: "none",
          }}
          {...interactiveProps}
        />
      );
    case TILES.BED:
      return (
        <Image
          alt="Bed"
          className="absolute z-10 h-full w-full"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={Bed}
          style={{
            WebkitUserSelect: "none" /* Safari */,
            userSelect: "none",
          }}
        />
      );
    case TILES.WALL:
      return (
        <Image
          alt="Wall"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={Wall}
          style={{
            WebkitUserSelect: "none" /* Safari */,
            userSelect: "none",
          }}
        />
      );
    default:
      return (
        <Image
          alt="Floor"
          className="absolute h-full w-full"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={Floor}
          style={{
            WebkitUserSelect: "none" /* Safari */,
            userSelect: "none",
          }}
        />
      );
  }
};

export default TileContent;
