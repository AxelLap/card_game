import useGameStore from "../store/gameStore";

const useDraw = () => {
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const {
    setPlayer_1_handsCards,
    setPLAYER_1_CARDS,
    setPlayer_2_handsCards,
    setPLAYER_2_CARDS,
    player_1_handsCards,
    player_2_handsCards,
  } = useGameStore();

  const draw = (count, deck, player) => {
    const handCards = deck.slice(0, count); // Tirer les cartes du deck
    const remainingDeck = deck.slice(count); // Le reste du deck après la pioche

    if (player === "green") {
      // Concaténer les nouvelles cartes avec celles déjà dans la main
      setPlayer_1_handsCards([...player_1_handsCards, ...handCards]);
      setPLAYER_1_CARDS(remainingDeck); // Mettre à jour le deck restant
    } else {
      // Concaténer les nouvelles cartes avec celles déjà dans la main
      setPlayer_2_handsCards([...player_2_handsCards, ...handCards]);
      setPLAYER_2_CARDS(remainingDeck); // Mettre à jour le deck restant
    }
  };

  return draw;
};

export default useDraw;
