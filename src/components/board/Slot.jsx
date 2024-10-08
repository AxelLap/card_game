import Pawn from "./Pawn";
import { useDrop } from "react-dnd";
import Card from "../Card";
import images from "../../assets";
import useGameStore from "../../store/gameStore";

const Slot = ({ colour, level, onDrop, card, index }) => {
  const isDragging = useGameStore((state) => state.isDragging);
  const setIsDragging = useGameStore((state) => state.setIsDragging);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "CARD",
    canDrop: (item) => {
      if (card) {
        return false;
      }
      return item.player === colour && item.content.level <= level;
    },

    drop: (item) => {
      onDrop({ ...item.content, player: item.player });
      // Appelle setIsDragging(false) une seule fois à la fin du drop
      setIsDragging(false);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "lightyellow" : "white",
        opacity: isDragging && !canDrop ? 0.5 : 1,
        border: "2px solid black",
      }}
      className={`w-[80px] h-[120px] border rounded flex flex-col items-center justify-center ${
        colour === "green"
          ? "shadow-[0_0_10px_4px_rgba(0,255,0,0.5)]"
          : colour === "red"
          ? "shadow-[0_0_10px_4px_rgba(255,0,0,0.5)]"
          : ""
      }`}
    >
      {card ? (
        <Card
          content={card}
          image={images[card.image_key]}
          player={card.player}
        />
      ) : (
        <Pawn colour={colour} level={level} />
      )}
    </div>
  );
};

export default Slot;
