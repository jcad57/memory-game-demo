import { useNavigate } from "react-router-dom";

export default function Button({ type }) {
  const navigate = useNavigate();
  if (type === "back") return <button onClick={() => navigate(-1)}>Back</button>;
  if (type === "menu") return <button onClick={() => navigate("/")}>Menu</button>;
  if (type === "start") return <button onClick={() => navigate("/Start")}>Play!</button>;
  // if (type === "submit-highscore") return <button>Submit</button>;
}
