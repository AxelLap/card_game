import { create } from "zustand";

import decks from "../datas/decks"; // Contient les decks des joueurs

import useInitializePlayerCards from "../hooks/useInitializePlayerCards"; //initialise les jeux des joueurs

const useGameStore = create((set) => ({
  boardState: Array(15)
    .fill(null)
    .map((_, index) => ({
      index: index,
      card: null,
      colour: index % 5 === 0 ? "green" : index % 5 === 4 ? "red" : "", // Green pour la colonne 0, Red pour la colonne 4
      level: index % 5 === 0 || index % 5 === 4 ? 1 : 0, // Niveau défini pour les colonnes 0 et 4
    })),
  setBoardState: (newState) => set({ boardState: newState }),

  isGameStarted: false,
  setIsGameStarted: (newState) => set({ isGameStarted: newState }),

  isGameOver: false,
  setIsGameOver: (newState) => set({ isGameOver: newState }),

  isDragging: false,
  setIsDragging: (value) => set({ isDragging: value }),

  currentPlayer: "green", // joueur actuel
  setCurrentPlayer: (newState) => set({ currentPlayer: newState }),

  score: { green: 0, red: 0 },
  setScore: (player, newScore) => {
    set((state) => ({
      score: {
        ...state.score, // Préserve l'autre joueur
        [player]: newScore, // Met à jour uniquement le score du joueur spécifié
      },
    }));
  },

  rowScores: [
    { green: 0, red: 0 },
    { green: 0, red: 0 },
    { green: 0, red: 0 },
  ],

  setRowScores: (rowIndex, player, newScore) => {
    set((state) => ({
      rowScores: state.rowScores.map((row, index) => {
        // Vérifie si nous sommes à la ligne ciblée
        if (index === rowIndex) {
          // Ajoute le score existant au nouveau score
          return {
            ...row,
            [player]: row[player] + newScore, // Accumule les scores
          };
        }
        return row; // Sinon, retourne la ligne inchangée
      }),
    }));
  },

  // Utilisation du hook pour initialiser les cartes des joueurs
  PLAYER_1_CARDS: useInitializePlayerCards(decks.player_1_deck),
  setPLAYER_1_CARDS: (newState) => set({ PLAYER_1_CARDS: newState }),
  player_1_handsCards: [],
  setPlayer_1_handsCards: (newState) => set({ player_1_handsCards: newState }),

  PLAYER_2_CARDS: useInitializePlayerCards(decks.player_2_deck),
  setPLAYER_2_CARDS: (newState) => set({ PLAYER_2_CARDS: newState }),

  player_2_handsCards: [],
  setPlayer_2_handsCards: (newState) => set({ player_2_handsCards: newState }),

  noMoreMoves: { green: false, red: false },
  setNoMoreMoves: (player) => {
    set((state) => ({
      noMoreMoves: {
        ...state.noMoreMoves,
        [player]: true, // Met à jour le joueur spécifié
      },
    }));
  },
}));

export default useGameStore;
