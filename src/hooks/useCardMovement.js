import useGameStore from "../store/gameStore";

const useCardMovement = () => {
  const {
    player_1_handsCards,
    setPlayer_1_handsCards,
    player_2_handsCards,
    setPlayer_2_handsCards,
    boardState,
    setBoardState,
    currentPlayer,
  } = useGameStore();

  const moveCard = (card, slotIndex) => {
    // Supprime la carte de la main
    const handToUpdate =
      currentPlayer === "green" ? player_1_handsCards : player_2_handsCards;
    const handSetter =
      currentPlayer === "green"
        ? setPlayer_1_handsCards
        : setPlayer_2_handsCards;

    const newPlayerHand = handToUpdate.filter((c) => c.id !== card.id);
    handSetter(newPlayerHand);

    // Ajoute la carte au plateau
    const newBoardState = [...boardState];
    newBoardState[slotIndex].card = card;
    setBoardState(newBoardState);
  };

  return moveCard;
};

export default useCardMovement;
