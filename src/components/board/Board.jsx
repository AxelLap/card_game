import useGameStore from "../../store/gameStore";
import useCardMovement from "../../hooks/useCardMovement";
import useSlotsUpgrade from "../../hooks/useSlotsUpgrade";
import useSwitchPlayer from "../../hooks/useswitchPlayer";
import useUpdateScore from "../../hooks/useUpdateScore";

import Slot from "./Slot";

const Board = () => {
  const switchPlayer = useSwitchPlayer(); // Changement de joueur + pioche
  const moveCard = useCardMovement(); // mouvemennt des cartes
  const slotsUpgrade = useSlotsUpgrade(); // Améliorations des emplacements
  const { updateRowScore } = useUpdateScore(); // Mise à jour du score

  const { boardState, currentPlayer, rowScores, isGameStarted } =
    useGameStore();

  console.log(boardState);
  return (
    <div
      className="flex flex-col gap-3 w-full items-center"
      style={{
        opacity: isGameStarted === false ? 0.5 : 1,
      }}
    >
      {Array(3)
        .fill(null)
        .map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-3 w-full justify-center">
            {Array(5)
              .fill(null)
              .map((_, colIndex) => {
                const slotIndex = rowIndex * 5 + colIndex;
                const droppedCard = boardState[slotIndex].card;
                const level = boardState[slotIndex].level;
                const colour = boardState[slotIndex].colour;

                return (
                  <Slot
                    key={slotIndex}
                    index={slotIndex}
                    colour={colour}
                    level={level} // Passer le niveau actuel du slot
                    onDrop={(card) => {
                      moveCard(card, slotIndex); // Déplacer la carte
                      updateRowScore(currentPlayer, card.points, slotIndex);
                      slotsUpgrade(slotIndex, colour); // Améliorer le slot
                      switchPlayer(currentPlayer); // Passer au joueur suivant
                    }}
                    card={droppedCard}
                  />
                );
              })}
          </div>
        ))}
    </div>
  );
};

export default Board;
