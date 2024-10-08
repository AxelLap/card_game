import useGameStore from "../store/gameStore";

const useUpdateScore = () => {
  const { score, setScore, setRowScores, rowScores } = useGameStore();

  // Fonction pour mettre à jour le score général du joueur
  // Fonction pour mettre à jour le score général du joueur
  const updateScore = () => {
    let totalGreen = 0;
    let totalRed = 0;

    rowScores.forEach((row) => {
      if (row.green > row.red) {
        totalGreen += row.green; // Ajouter uniquement le score de green
      } else if (row.red > row.green) {
        totalRed += row.red; // Ajouter uniquement le score de red
      } else {
        // En cas d'égalité, ajouter les deux scores
        totalGreen += row.green;
        totalRed += row.red;
      }
    });

    //   // Met à jour le score dans le store avec les nouvelles sommes calculées
    setScore("green", totalGreen);
    setScore("red", totalRed);
  };

  // Fonction pour mettre à jour le score dans une ligne spécifique
  const updateRowScore = (player, newScore, slotIndex) => {
    const rowIndex = Math.floor(slotIndex / 5); // Trouve l'index de la ligne à partir du slotIndex
    setRowScores(rowIndex, player, newScore); // Met à jour le score pour la ligne et le joueur
  };

  // Retourne un objet avec les deux fonctions
  return { updateRowScore, updateScore };
};

export default useUpdateScore;
