import { useState } from "react";
import GameCard from "./GameCard";
import BackButton from "./BackButton";

function Start({ settings }) {
  const { theme, difficulty, grid, sound } = settings;

  return (
    <>
      <BackButton />
      <div className="game-board">
        {Array.from({ length: grid }, (_, i) => (
          <GameCard key={i} />
        ))}
      </div>
    </>
  );
}

export default Start;
