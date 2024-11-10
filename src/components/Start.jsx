import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import BackButton from "./BackButton";

const tempCards = ["#7156e9", "#764873", "#f967a9", "#967ab1", "#c3d9f7", "#3fc3e9", "#32ac6d", "#b5b7a5"];

function Start({ settings }) {
  const { theme, difficulty, grid, sound } = settings;
  const [randomCards, setRandomCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Randomize the cards on mount
  useEffect(() => {
    let cards = tempCards;
    if (difficulty === "easy") cards = tempCards.slice(0, 4);
    if (difficulty === "medium") cards = tempCards.slice(0, 6);

    const imagePairs = [...cards, ...cards];
    const randomized = imagePairs
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ id: index, content: card, flipped: false }));
    setRandomCards(randomized);
  }, [difficulty]);

  console.log(randomCards);

  // Store the flipped card
  function handleCardClick(card) {
    if (flippedCards.length === 2 || matchedCards.length === randomCards.length) return;
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, card.id]);
  }

  // Check for a match every time we have two flipped cards
  useEffect(() => {
    if (flippedCards.length !== 2) return;
    const [firstFlippedCard, secondFlippedCard] = flippedCards;

    if (randomCards[firstFlippedCard].content === randomCards[secondFlippedCard].content) {
      setMatchedCards((prevMatchedCards) => [...prevMatchedCards, firstFlippedCard, secondFlippedCard]);
    }
    setAttempts((prevAttempts) => prevAttempts + 1);
    // Delay setting the cards back
    const interval = setInterval(() => {
      setFlippedCards([]);
    }, 500);

    return () => clearInterval(interval);
  }, [flippedCards, randomCards]);

  console.log("flipped " + flippedCards);
  console.log("matched " + matchedCards);

  return (
    <>
      <BackButton />
      <div>Attempts: {attempts} </div>
      <div className="game-board">
        {randomCards &&
          randomCards.map((card, i) => (
            <GameCard
              key={card.id}
              id={card.id}
              content={card.content}
              flipped={flippedCards.includes(card.id)}
              matched={matchedCards.includes(card.id)}
              onClick={() => handleCardClick(card)}
            />
          ))}
      </div>
    </>
  );
}

export default Start;
