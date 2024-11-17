import { useEffect, useReducer } from "react";
import Card from "./Card";
import Button from "./Button";
import Leaderboard from "./Leaderboard";

const initialGameplayState = {
  isPlaying: true,
  randomCards: [],
  flippedCards: [],
  matchedCards: [],
  attempts: 0,
  multiplier: 1,
  score: 0,
  addNewScoreLeaderboard: false,
};

function gameplayReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_IS_PLAYING": {
      return {
        ...state,
        isPlaying: action.payload,
      };
    }
    case "SET_SHUFFLED_CARDS": {
      return {
        ...state,
        randomCards: action.payload,
      };
    }
    case "SET_FLIPPED_CARDS": {
      return {
        ...state,
        flippedCards: [...state.flippedCards, action.payload],
      };
    }
    case "CHECK_FOR_MATCH": {
      let newMatchedCards = [];
      let newScore;
      let newMultiplier;

      const [firstFlippedCard, secondFlippedCard] = state.flippedCards;
      // Check if the two cards are a match using their index
      if (state.randomCards[firstFlippedCard].content === state.randomCards[secondFlippedCard].content) {
        // Add to matched array
        newMatchedCards = [...state.matchedCards, firstFlippedCard, secondFlippedCard];
        // Update score & multiplier
        newScore = state.score + 5 * state.multiplier;
        newMultiplier = state.multiplier < 3 ? state.multiplier + 1 : state.multiplier;
      } else {
        // Reset
        return {
          ...state,
          attempts: state.attempts + 1,
          multiplier: 1,
        };
      }
      return {
        ...state,
        matchedCards: newMatchedCards,
        attempts: state.attempts + 1,
        score: newScore,
        multiplier: newMultiplier,
      };
    }
    case "CHECK_FOR_WIN": {
      if (state.matchedCards.length === state.randomCards.length) {
        return {
          ...state,
          isPlaying: false,
          addNewScoreLeaderboard: true,
        };
      }
      return state;
    }
    case "RESET_FLIPPED_CARDS": {
      return {
        ...state,
        flippedCards: [],
      };
    }

    default:
      return state;
  }
}

export default function Start({ settings, leaderboard, collection, db, addDoc }) {
  const { cards, difficulty } = settings;

  const [gameplayState, dispatchAction] = useReducer(gameplayReducer, initialGameplayState);
  const { isPlaying, randomCards, flippedCards, matchedCards, attempts, score, multiplier } = gameplayState;

  useEffect(() => {
    // Shuffle the cards on mount
    let newCards;
    if (difficulty === "easy") newCards = cards.slice(0, 4);
    if (difficulty === "medium") newCards = cards.slice(0, 8);
    if (difficulty === "hard") newCards = cards.slice(0, 12);
    const newCardPairs = [...newCards, ...newCards];
    const newRandomizedCards = newCardPairs
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ id: index, content: card, flipped: false }));
    dispatchAction({ type: "SET_SHUFFLED_CARDS", payload: newRandomizedCards });
  }, [cards, difficulty]);

  function handleCardClick(card) {
    if (flippedCards.length < 2) dispatchAction({ type: "SET_FLIPPED_CARDS", payload: card.id });

    if (flippedCards.length === 1) {
      dispatchAction({ type: "CHECK_FOR_MATCH" });
      setTimeout(() => {
        dispatchAction({ type: "RESET_FLIPPED_CARDS" });
      }, 1000);
      dispatchAction({ type: "CHECK_FOR_WIN" });
    }
  }

  // console.log(matchedCards.length, randomCards.length);
  return (
    <>
      {isPlaying === true && (
        <div className="game-container">
          <div className="hud-container">
            <p>Attempts: {attempts} </p>
            <p>Score: {score} </p>
            <p>Multiplier: x{multiplier}</p>
          </div>
          <div className="game-board">
            {randomCards.length > 0 ? (
              randomCards.map((card, i) => (
                <Card
                  key={card.id}
                  id={card.id}
                  content={card.content}
                  flipped={flippedCards.includes(card.id)}
                  matched={matchedCards.includes(card.id)}
                  onClick={() => handleCardClick(card)}
                />
              ))
            ) : (
              <span>Error</span>
            )}
          </div>
          <Button type={"menu"} />
        </div>
      )}
      {isPlaying === false && (
        <Leaderboard
          leaderboard={leaderboard}
          addNewScoreLeaderboard={gameplayState.addNewScoreLeaderboard}
          newScore={gameplayState.score}
          collection={collection}
          addDoc={addDoc}
          db={db}
        />
      )}
    </>
  );
}
