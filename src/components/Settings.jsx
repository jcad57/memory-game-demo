import { settings } from "../data/settings";

function Settings({ dispatch, state }) {
  return (
    <div className="menu">
      <h2 className="menu-sub-title">Settings</h2>
      <div className="menu-item">
        <p className="setting-type">
          Theme:
          {settings.theme.map((theme) => (
            <span
              className={state[0] === theme ? "setting-item-active setting-item" : "setting-item"}
              onClick={() => dispatch({ theme: "set_theme" })}>
              {theme}
            </span>
          ))}
        </p>
        <p className="setting-type">
          Difficulty:
          {settings.difficulty.map((difficulty) => (
            <span className="setting-item">{difficulty}</span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default Settings;
