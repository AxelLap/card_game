import cards from "../datas/cards.json"; // Contient toutes les cartes disponibles
import decks from "../datas/decks"; // Contient les decks des joueurs

const useInitializePlayerCards = (playerDeck) => {
  // Fonction pour initialiser les cartes d'un joueur en tenant compte des doublons
  const initializeCards = (deck) => {
    console.log("initializedCards is called");
    return deck
      .map((title, index) => {
        const cardData = cards.CARDS.find((card) => card.title === title);
        if (cardData) {
          return { ...cardData, id: index }; // Crée un nouvel objet pour chaque occurrence dans le deck
        }
        return null; // Gère le cas où une carte n'est pas trouvée
      })
      .filter(Boolean); // Filtrer les cartes nulles si une carte n'a pas été trouvée
  };

  return initializeCards(playerDeck);
};

export default useInitializePlayerCards;
