import { useDrag } from "react-dnd";
import Pawn from "./board/Pawn";
import useGameStore from "../store/gameStore";

const Card = ({ content, image, player }) => {
  const setIsDragging = useGameStore((state) => state.setIsDragging);
  const boardState = useGameStore((state) => state.boardState);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: () => {
      // On commence le drag
      setIsDragging(true);

      // Vérifie les valeurs de content et player

      return { content, player };
    },
    end: () => {
      // On arrête le drag
      setIsDragging(false);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  if (isDragging) {
  }
  return (
    <div
      ref={drag}
      className="cursor-pointer z-2 relative w-[80px] h-[120px] border border-black rounded overflow-hidden text-base"
    >
      <img
        src={image}
        alt={content.title}
        className="object-cover w-full h-full absolute top-0 left-0 z-0"
      />
      <div className="relative z-10 w-full flex justify-between px-2 py-1 text-white font-bold">
        <div className="absolute left-0 bg-black flex justify-between bg-opacity-50">
          <Pawn colour={player} level={content.level} />
        </div>
        <div className="absolute right-0 top-0 bg-black bg-opacity-50">
          {content.points}
        </div>
      </div>
      <h3 className=" text-center bg-black bg-opacity-70 text-white w-full py-1 absolute bottom-0">
        {content.title}
      </h3>
    </div>
  );
};

export default Card;
