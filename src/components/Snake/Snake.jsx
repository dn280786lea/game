import React, { useState, useEffect } from 'react';

const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 20;
const SPEED = 150;

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(generateFoodPosition());
  const [direction, setDirection] = useState('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = event => {
      const key = event.key.toUpperCase();
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        setDirection(key.replace('ARROW', '').toUpperCase());
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, SPEED);

    return () => {
      clearInterval(gameLoop);
    };
  });

  const moveSnake = () => {
    if (isGameOver) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y--;
        break;
      case 'DOWN':
        head.y++;
        break;
      case 'LEFT':
        head.x--;
        break;
      case 'RIGHT':
        head.x++;
        break;
      default:
        break;
    }

    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      setIsGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(generateFoodPosition());
    } else {
      newSnake.pop();
    }

    if (checkCollision(newSnake)) {
      setIsGameOver(true);
      return;
    }

    setSnake(newSnake);
  };

  const generateFoodPosition = () => {
    return {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  };

  const checkCollision = newSnake => {
    const [head, ...body] = newSnake;
    return body.some(segment => segment.x === head.x && segment.y === head.y);
  };

  const renderCell = (x, y, type) => {
    return (
      <div
        key={`${x},${y}`}
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          backgroundColor: type === 'snake' ? 'green' : 'red',
          border: '1px solid black',
        }}
      />
    );
  };

  return (
    <div>
      <h1>Snake Game</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
        }}
      >
        {Array.from({ length: ROWS }).map((_, y) =>
          Array.from({ length: COLS }).map((_, x) => {
            if (snake.some(segment => segment.x === x && segment.y === y)) {
              return renderCell(x, y, 'snake');
            } else if (food.x === x && food.y === y) {
              return renderCell(x, y, 'food');
            } else {
              return renderCell(x, y);
            }
          })
        )}
      </div>
      {isGameOver && <p>Game Over</p>}
    </div>
  );
};

export default SnakeGame;
