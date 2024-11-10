import menuItems from "../data/menu-items";
import MenuItem from "./MenuItem";

function Menu() {
  return (
    <div className="menu-container">
      <div className="menu">
        <h1 className="menu-title">'MemberMe?</h1>
        {menuItems.map((item, i) => (
          <div className="menu-item">
            <MenuItem text={item} key={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
