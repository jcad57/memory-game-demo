import menuItems from "../data/menu-items";
import MenuItem from "./MenuItem";

export default function Menu() {
  return (
    <div className="page-container">
      <h1 className="menu-title fc-yellow">'MemberMe?</h1>
      <div>
        {menuItems.map((item, i) => (
          <div className="menu-item">
            <MenuItem text={item} key={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
