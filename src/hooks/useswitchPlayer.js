import useGameStore from "../store/gameStore";
import useDraw from "./useDraw";

const useSwitchPlayer = () => {
  const draw = useDraw();

  const { setCurrentPlayer, PLAYER_1_CARDS, PLAYER_2_CARDS, currentPlayer } =
    useGameStore();

  const switchPlayer = () => {
    const newPlayer = currentPlayer === "green" ? "red" : "green";
    setCurrentPlayer(newPlayer);

    // Détermine le deck à utiliser en fonction du nouveau joueur
    const deck = newPlayer === "green" ? PLAYER_1_CARDS : PLAYER_2_CARDS;

    // Pioche une carte pour le nouveau joueur
    draw(1, deck, newPlayer);
  };

  return switchPlayer;
};

export default useSwitchPlayer;
