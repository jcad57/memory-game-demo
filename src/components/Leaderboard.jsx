import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import Button from "./Button";
import HighScoreEntry from "./HighScoreEntry";

function Leaderboard({ leaderboard, addNewScoreLeaderboard, newScore, addDoc, db, collection, setLeaderboard }) {
  const [newName, setNewName] = useState("");
  const [updatedLeaderboard, setUpdatedLeaderboard] = useState(leaderboard);
  const [showNewScoreEntry, setShowNewScoreEntry] = useState(addNewScoreLeaderboard);

  // useEffect(() => {
  //   onSnapshot(collection(db, "leaderboard"), (snapshot) => console.log(snapshot));
  // });

  function handleSetNewName(e) {
    setNewName(e.target.value);
  }

  function handleSubmitNewScore() {
    // try {
    //   addDoc(collection(db, "leaderboard"), {
    //     name: newName,
    //     score: newScore,
    //   });
    // } catch (e) {
    //   console.error("Error adding new score", e);
    // }
    setShowNewScoreEntry(false);
  }

  if (showNewScoreEntry) {
    return (
      <>
        <HighScoreEntry
          newScore={newScore}
          handleSetNewName={handleSetNewName}
          handleSubmitNewScore={handleSubmitNewScore}
          addNewScoreLeaderboard={addNewScoreLeaderboard}
        />
      </>
    );
  } else {
    return (
      <div className="page-container">
        <h1 className="menu-title">LEADERBOARD</h1>
        <div className="leaderboard">
          <div className="leaderboard-player fc-yellow">
            <div>RANK</div>
            <div>NAME</div>
            <div>SCORE</div>
          </div>
          {leaderboard.map((user, i) => (
            <div className="leaderboard-player">
              <div>{i + 1}</div>
              <div>{user.name}</div>
              <div>{user.score}</div>
            </div>
          ))}
        </div>
        <Button type={"menu"} />
      </div>
    );
  }
}

export default Leaderboard;
