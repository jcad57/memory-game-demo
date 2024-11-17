import { possibleSettings } from "../data/settings";
import Button from "./Button";

function Settings({ dispatch, state }) {
  return (
    <>
      <div className="page-container">
        <h2 className="menu-title fc-yellow">Settings</h2>
        <div className="menu-item">
          <div className="setting-type">
            <ul className="setting-list">
              Theme:
              {possibleSettings.theme.map((theme, i) => (
                <li
                  className={"setting-item " + (state.theme === theme ? "setting-item-active" : "")}
                  onClick={() => dispatch({ type: "CHANGE_THEME", payload: theme })}
                  key={i}>
                  {theme}
                </li>
              ))}
            </ul>
          </div>
          <div className="setting-type">
            <ul className="setting-list">
              Difficulty:
              {possibleSettings.difficulty.map((difficulty, i) => (
                <li
                  className={"setting-item " + (state.difficulty === difficulty ? "setting-item-active" : "")}
                  onClick={() => dispatch({ type: "CHANGE_DIFFICULTY", payload: difficulty })}
                  key={i}>
                  {difficulty}
                </li>
              ))}
            </ul>
          </div>
          <div className="setting-type">
            <ul className="setting-list">
              Sound:
              {possibleSettings.sound.map((sound, i) => (
                <li
                  className={"setting-item " + (state.sound === sound ? "setting-item-active" : "")}
                  onClick={() => dispatch({ type: "CHANGE_SOUND", payload: sound })}
                  key={i}>
                  {sound}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Button type={"start"} />
        <Button type={"back"} />
      </div>
    </>
  );
}

export default Settings;
