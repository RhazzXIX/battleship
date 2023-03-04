const commanderAI = () => {
  const attackCoordsEntered = [];
  let turn = false;

  const generateCoords = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  };

  const checkCoordinates = (coords) => {
    let entered = false;
    const [x, y] = [...coords];
    const coordsCopy = [];
    attackCoordsEntered.forEach((entry) => coordsCopy.push(entry));
    coordsCopy.forEach((entry, i, arr) => {
      const [a, b] = [...entry];
      if (a === x && b === y) {
        entered = true;
        arr.splice(i);
      }
    });

    return entered;
  };

  const enterCoords = (enemyBoard, playerTurn) => {
    if (turn === false) return;
    if (attackCoordsEntered.length === 100) return;
    const coords = generateCoords();
    const entered = checkCoordinates(coords);
    if (!entered) {
      attackCoordsEntered.push(coords);
      enemyBoard(coords);
      turn = false;
      playerTurn();
    } else if (entered) {
      enterCoords(enemyBoard);
    }
  };

  const showTurn = () => turn;

  const startTurn = () => {
    turn = true;
  };

  return { enterCoords, showTurn, startTurn };
};

export default commanderAI;
