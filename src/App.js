import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Settings from "./components/Settings";
import Leaderboard from "./components/Leaderboard";
import Start from "./components/Start";
import { useReducer } from "react";
import { initialSettings } from "./data/settings";

function reducer(state, action) {
  switch (action.type) {
    case "change_theme": {
      return;
    }
    default: {
      return state;
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialSettings);

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
