import useGameStore from "../store/gameStore";

const useSlotsUpgrade = () => {
  const { boardState, setBoardState } = useGameStore();

  const slotsUpgrade = (slotIndex, colour) => {
    // Crée une copie profonde de `boardState`
    const newBoardState = [...boardState.map((slot) => ({ ...slot }))];

    // Fonction pour incrémenter le niveau d'un slot donné
    const incrementLevel = (index) => {
      // Vérifier si l'index est valide (dans les limites du tableau)
      if (
        index >= 0 &&
        index < newBoardState.length &&
        newBoardState[index].card === null
      ) {
        newBoardState[index].level += 1; // Incrémenter le niveau du slot
        newBoardState[index].colour = colour; // Incrémenter le niveau du slot
      }
    };

    // Vérifie et incrémente les niveaux des slots adjacents (droite, gauche, haut, bas)
    if (slotIndex % 5 === 0) {
      incrementLevel(slotIndex + 1); // Droite
      incrementLevel(slotIndex + 5); // Bas (si on est sur une grille 5x3)
      incrementLevel(slotIndex - 5); // Haut
    }

    if (slotIndex % 5 === 4) {
      incrementLevel(slotIndex - 1); // Gauche
      incrementLevel(slotIndex + 5); // Bas (si on est sur une grille 5x3)
      incrementLevel(slotIndex - 5); // Haut
    }

    if (slotIndex % 5 !== 0 && slotIndex % 5 !== 4) {
      incrementLevel(slotIndex + 1); // Droite
      incrementLevel(slotIndex - 1); // Gauche
      incrementLevel(slotIndex + 5); // Bas (si on est sur une grille 5x3)
      incrementLevel(slotIndex - 5); // Haut
    }
    // Mettre à jour le `boardState` avec la nouvelle copie
    setBoardState(newBoardState);
  };

  return slotsUpgrade;
};

export default useSlotsUpgrade;
