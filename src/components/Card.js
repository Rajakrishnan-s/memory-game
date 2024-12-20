import React from "react";
import "./Card.css"; // We'll add styles later.

const Card = ({ card, onClick, isFlipped }) => {
  console.log({ id: card.id, isFlipped})
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={() => onClick(card.id)}
    >
      {/* Show card front when flipped, otherwise blank */}
      <div className="card-inner">
        <div className="card-front">{card.image}</div>
        <div className="card-back"></div>
      </div>
    </div>
  );
};

export default Card;
