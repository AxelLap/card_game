import useGameStore from "../store/gameStore";
const useMoovesLeft = () => {
  const boardState = useGameStore((state) => state.boardState);
  const setNoMoreMoves = useGameStore((state) => state.setNoMoreMoves);

  const isMoovesLeft = (cards, player) => {
    console.log(cards);
    console.log(player);
    console.log(boardState);

    const availableSlots = boardState.filter(
      (slot) => slot.card === null && slot.colour === player
    );

    console.log(availableSlots);

    const highestLvl =
      availableSlots.length > 0
        ? availableSlots.reduce((max, current) => {
            return current.level > max ? current.level : max;
          }, availableSlots[0].level)
        : null; // Ou toute autre valeur par défaut

    console.log(highestLvl);

    const playableCards = cards.filter((card) => card.level <= highestLvl);

    console.log(playableCards);

    if (playableCards.length === 0) {
      setNoMoreMoves(player);
    } else {
      return;
    }
  };

  return isMoovesLeft;
};
export default useMoovesLeft;
