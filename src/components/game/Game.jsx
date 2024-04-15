import React, { useState } from 'react';
import {} from './Game.css';

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const choices = ['камінь', 'папер', 'ножниці'];

  const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const handleUserChoice = choice => {
    setUserChoice(choice);
    const computerChoice = getRandomChoice();
    setComputerChoice(computerChoice);
    calculateResult(choice, computerChoice);
  };

  const calculateResult = (user, computer) => {
    if (user === computer) {
      setResult('Нічія!');
    } else if (
      (user === 'камінь' && computer === 'ножниці') ||
      (user === 'бумага' && computer === 'камінь') ||
      (user === 'ножниці' && computer === 'бумага')
    ) {
      setResult('Ви виграли!');
    } else {
      setResult('Виграв компьютер');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Камінь, ножниці, бумага</h1>
      <div className="title-btn">
        <button className="button" onClick={() => handleUserChoice('камінь')}>
          камінь
        </button>
        <button className="button" onClick={() => handleUserChoice('бумага')}>
          бумага
        </button>
        <button className="button" onClick={() => handleUserChoice('ножниці')}>
          ножниці
        </button>
      </div>
      <div className="total">
        <h2>Твій вибір : {userChoice}</h2>
        <h2>Вибір компьютера: {computerChoice}</h2>
        <h2>Результат: {result}</h2>
      </div>
    </div>
  );
};

export default Game;
