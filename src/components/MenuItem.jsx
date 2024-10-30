import { Link } from "react-router-dom";
function MenuItems({ text }) {
  return (
    <>
      <Link to={`/${text}`}>{text}</Link>
    </>
  );
}

export default MenuItems;
