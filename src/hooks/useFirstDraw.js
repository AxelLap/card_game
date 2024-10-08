import useGameStore from "../store/gameStore";
import useDraw from "../hooks/useDraw";
import useShuffleCards from "./useShuffleCards";

const useFirstDraw = () => {
  const shuffleCards = useShuffleCards();
  const draw = useDraw();
  const {
    setPlayer_1_handsCards,
    setPLAYER_1_CARDS,
    setPlayer_2_handsCards,
    setPLAYER_2_CARDS,
  } = useGameStore();

  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const greenDeck = useGameStore((state) => state.PLAYER_1_CARDS);
  const redDeck = useGameStore((state) => state.PLAYER_2_CARDS);

  const firstDraw = () => {
    const shuffledGreenDeck = shuffleCards(greenDeck);
    const shuffledRedDeck = shuffleCards(redDeck);

    draw(4, shuffledGreenDeck, "green");
    draw(3, shuffledRedDeck, "red");
  };
  return firstDraw;
};

export default useFirstDraw;
