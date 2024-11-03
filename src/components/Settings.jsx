import { settings } from "../data/settings";
import BackButton from "./BackButton";

function Settings({ dispatch, state }) {
  console.log(state);

  return (
    <>
      <BackButton />
      <div className="menu">
        <h2 className="menu-sub-title">Settings</h2>
        <div className="menu-item">
          <div className="setting-type">
            <ul className="setting-list">
              Theme:
              {settings.theme.map((theme, i) => (
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
              {settings.difficulty.map((difficulty, i) => (
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
              {settings.sound.map((sound, i) => (
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
      </div>
    </>
  );
}

export default Settings;
