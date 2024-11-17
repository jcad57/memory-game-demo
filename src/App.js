import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Settings from "./components/Settings";
import Leaderboard from "./components/Leaderboard";
import Start from "./components/Start";
import { useReducer, useEffect, useState } from "react";
import { currentSettings } from "./data/settings";
import { pastel, punk, fnaf, nineties, nature } from "./data/themes";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore/lite";
import { onSnapshot } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

function settingsReducer(state, action) {
  switch (action.type) {
    case "CHANGE_THEME": {
      let newCardImages = [];
      if (action.payload === "pastel") newCardImages = pastel;
      if (action.payload === "punk") newCardImages = punk;
      if (action.payload === "fnaf") newCardImages = fnaf;
      if (action.payload === "nineties") newCardImages = nineties;
      if (action.payload === "nature") newCardImages = nature;
      return {
        ...state,
        theme: action.payload,
        cards: newCardImages.length > 0 ? newCardImages : pastel,
      };
    }
    case "CHANGE_DIFFICULTY": {
      return {
        ...state,
        difficulty: action.payload,
      };
    }
    case "CHANGE_SOUND": {
      return {
        ...state,
        sound: action.payload,
      };
    }
    case "CHANGE_MULTIPLE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyD4dUtos0GInZHhFF11CbOiZOWi46ZoxAE",
  authDomain: "memory-game-leaderboard-2c67e.firebaseapp.com",
  projectId: "memory-game-leaderboard-2c67e",
  storageBucket: "memory-game-leaderboard-2c67e.firebasestorage.app",
  messagingSenderId: "177502178541",
  appId: "1:177502178541:web:5ab1873353425f624210e4",
  measurementId: "G-SY0SS4VG8R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

function App() {
  const [state, dispatch] = useReducer(settingsReducer, currentSettings);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const leaderboardRef = collection(db, "leaderboard");
      const leaderboardSnapshot = await getDocs(leaderboardRef);
      const leaderboardData = leaderboardSnapshot.docs.map((doc) => doc.data());
      setLeaderboard(leaderboardData);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route
            path="/start"
            element={
              <Start settings={state} leaderboard={leaderboard} collection={collection} db={db} addDoc={addDoc} />
            }
          />
          <Route path="/settings" element={<Settings dispatch={dispatch} state={state} />} />
          <Route
            path="/leaderboard"
            element={
              <Leaderboard
                leaderboard={leaderboard}
                setLeaderboard={setLeaderboard}
                addDoc={addDoc}
                collection={collection}
                db={db}
                onSnapshot={onSnapshot}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
