function Card({ id, content, flipped, onClick, matched }) {
  const cardStyle = {
    backgroundColor: flipped || matched ? content : "grey",
  };
  return <div className="game-card" style={cardStyle} onClick={onClick}></div>;
}

export default Card;
