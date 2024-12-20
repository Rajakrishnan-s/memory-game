import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./GameBoard.css";

const [UP, DOWN] = ['up', 'down'];
const initialCards = [
  { id: 1, image: "🍎", flipstate: DOWN, inGame: true },
  { id: 2, image: "🍎", flipstate: DOWN, inGame: true },
  { id: 3, image: "🍌", flipstate: DOWN, inGame: true },
  { id: 4, image: "🍌", flipstate: DOWN, inGame: true },
  { id: 5, image: "🍇", flipstate: DOWN, inGame: true },
  { id: 6, image: "🍇", flipstate: DOWN, inGame: true },
  { id: 7, image: "🍒", flipstate: DOWN, inGame: true },
  { id: 8, image: "🍒", flipstate: DOWN, inGame: true },
];


function GameBoard(){
  const [cards, setCards] = useState(initialCards);
  const [moveCounter, setMoveCounter] = useState(0);
  const [scoreCounter, setScoreCounter] = useState(0);
  const [selection, setSelection] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  // Shuffle cards on game start
  useEffect(() => {
    const shuffled = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  // Handle card click
  
  const handleCardClick = (id) =>  {
    if (selection.length === 2 || selection.includes(id) || matchedCards.includes(id) ) return;

    const newSelection = [...selection, id];
    setSelection(newSelection);

    setCards((prevCards) =>
      prevCards.map(card => 
        card.id === id ? { ...card, flipstate: UP} : card
      )
    );

    if (newSelection.length === 2) {
      setMoveCounter( moveCounter + 1);
      const [id1, id2] = newSelection;
      const card1 = cards.find(card => card.id === id1);
      const card2 = cards.find(card => card.id === id2);

      if (card1.image === card2.image) {
        setMatchedCards(prev => [...prev, id1, id2]);
        setScoreCounter(scoreCounter + 1);
        setSelection([]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map(card =>
              newSelection.includes(card.id) ? { ...card, flipstate: DOWN} : card
            ));
          setSelection([]);
        }, 1000);

      }
    }
  };

  console.log(cards.map(card => ({ id: card.id, flipstate: card.flipstate })));


  return (
    <div className="game-board">
      <div class="game-stats">
        <h2>Moves: {moveCounter}</h2>
        <h2>Score: {scoreCounter}</h2>
      </div>
      <div className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
            isFlipped={card.flipstate === UP || matchedCards.includes(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
