import { useEffect, useMemo } from "react";
import Card from "./Card";
import useGameStore from "../store/gameStore";
import useMovesLeft from "../hooks/useMovesLeft";
import images from "../assets/index";
import clsx from "clsx";

const Hand = () => {
  const isMoovesLeft = useMovesLeft();
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const noMoreMoves = useGameStore((state) => state.noMoreMoves);
  const setIsGameOver = useGameStore((state) => state.setIsGameOver);
  const handCards = useGameStore((state) => {
    return currentPlayer === "green"
      ? state.player_1_handsCards
      : state.player_2_handsCards;
  });

  const renderedCards = useMemo(() => {
    return handCards.map((card, index) => (
      <Card
        key={index}
        content={card}
        image={images[card.image_key]}
        player={currentPlayer}
      />
    ));
  }, [handCards, currentPlayer]);

  useEffect(() => {
    // Vérifiez si les deux joueurs n'ont plus de mouvements
    if (noMoreMoves.green && noMoreMoves.red) {
      setIsGameOver(true);
    }
  }, [noMoreMoves, setIsGameOver]); // Ajout des dépendances

  useEffect(() => {
    // Appeler isMovesLeft après le rendu des cartes
    isMoovesLeft(handCards, currentPlayer);
  }, [handCards, currentPlayer]);

  return (
    <div
      className={clsx(
        "relative flex flex-wrap gap-4 p-4 bg-white border-4 rounded w-auto",
        currentPlayer === "green" ? "border-green-500" : "border-red-500"
      )}
    >
      {noMoreMoves[currentPlayer] && (
        <div
          className={clsx(
            "absolute top-[-26px] text-base",
            currentPlayer === "green"
              ? "text-green-500 left-0"
              : "text-red-500 right-0"
          )}
        >
          No More moves
        </div>
      )}
      {renderedCards}
    </div>
  );
};

export default Hand;
