export default function HighScoreEntry({ handleSubmitNewScore, handleSetNewName, score }) {
  return (
    <div className="leaderboard-entry-container">
      <h1>Your Score: {score}</h1>
      <h2>Enter your name:</h2>
      <input type="text" onChange={handleSetNewName}></input>
      <button type="submit-highscore" onClick={handleSubmitNewScore}>
        Submit
      </button>
    </div>
  );
}
