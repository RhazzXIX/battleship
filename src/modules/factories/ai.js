import { generateCoords } from "../helpers/coordinatesHandler";

const commanderAI = () => {
  const attackCoordsEntered = [];
  const coordsToFocus = [];
  const adjacentCoords = [];
  let turn = false;

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

  function getAdjacentCoords() {
    console.log(adjacentCoords);
    return adjacentCoords.pop();
  }

  const enterCoords = (enemyBoard, playerTurn) => {
    console.log(adjacentCoords);
    if (turn === false) return;
    if (attackCoordsEntered.length === 100) return;
    let coords = generateCoords();
    if (adjacentCoords.length) coords = getAdjacentCoords();
    const entered = checkCoordinates(coords);
    if (!entered) {
      attackCoordsEntered.push(coords);
      enemyBoard(coords);
      turn = false;
      playerTurn();
    } else if (entered) {
      enterCoords(enemyBoard, playerTurn);
    }
  };

  const showTurn = () => turn;

  const startTurn = () => {
    turn = true;
  };

  function generateAdjacentCoords() {
    const [x, y] = [...coordsToFocus[0]];
    if (y + 1 < 10) adjacentCoords.push([x, y + 1]);
    if (x + 1 < 10) adjacentCoords.push([x + 1, y]);
    if (y - 1 >= 0) adjacentCoords.push([x, y - 1]);
    if (x - 1 >= 0) adjacentCoords.push([x - 1, y]);
  }

  function getFeedback(feedback) {
    if (feedback === "hit") {
      coordsToFocus.push(attackCoordsEntered[attackCoordsEntered.length - 1]);
      generateAdjacentCoords();
      coordsToFocus.splice(0);
    }
  }

  return { enterCoords, showTurn, startTurn, getFeedback };
};

export default commanderAI;
