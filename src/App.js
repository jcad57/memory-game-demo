import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Settings from "./components/Settings";
import Leaderboard from "./components/Leaderboard";
import Start from "./components/Start";
import { useReducer } from "react";
import { currentSettings } from "./data/settings";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_THEME": {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case "CHANGE_DIFFICULTY": {
      let newGrid = 0;
      if (action.payload === "easy") newGrid = 8;
      if (action.payload === "medium") newGrid = 12;
      if (action.payload === "hard") newGrid = 16;
      return {
        ...state,
        difficulty: action.payload,
        grid: newGrid,
      };
    }
    case "CHANGE_SOUND": {
      return {
        ...state,
        sound: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, currentSettings);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/start" element={<Start settings={state} />} />
          <Route path="/settings" element={<Settings dispatch={dispatch} state={state} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
