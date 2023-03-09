import { generateCoords } from "../helpers/coordinatesHandler";

const commanderAI = () => {
  const attackCoordsEntered = [];
  const coordsToFocus = [];
  const adjacentCoords = [];
  const inlineCoords = [];
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
    if (adjacentCoords.length === 1) {
      coordsToFocus.splice(0);
    }
    return adjacentCoords.pop();
  }

  function getInlineCoords() {
    if (inlineCoords.length === 1) {
      coordsToFocus.splice(0);
    }
    return inlineCoords.pop();
  }

  const enterCoords = (enemyBoard, playerTurn) => {
    if (turn === false) return;
    if (attackCoordsEntered.length === 100) return;
    let coords = generateCoords();
    if (inlineCoords.length) {
      coords = getInlineCoords();
    } else if (adjacentCoords.length) {
      coords = getAdjacentCoords();
    }
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

  function generateInlineCoords() {
    const [x, y] = [...coordsToFocus[0]];
    const [a, b] = [...attackCoordsEntered[attackCoordsEntered.length - 1]];
    if (a === x) {
      if (b < y) {
        if (y + 1 < 10) inlineCoords.push([x, y + 1]);
        if (b - 1 >= 0) inlineCoords.push([a, b - 1]);
      }
      if (b > y) {
        if (b + 1 < 10) inlineCoords.push([a, b + 1]);
        if (y - 1 >= 0) inlineCoords.push([x, y - 1]);
      }
    }
    if (b === y) {
      if (a < x) {
        if (x + 1 < 10) adjacentCoords.push([x + 1, y]);
        if (a - 1 >= 0) adjacentCoords.push([a - 1, b]);
      }
      if (a > x) {
        if (x - 1 >= 0) adjacentCoords.push([x - 1, y]);
        if (a + 1 < 10) adjacentCoords.push([a + 1, b]);
      }
    }
  }

  function getFeedback(feedback) {
    if (feedback === "hit") {
      if (coordsToFocus.length) {
        generateInlineCoords();
        return;
      }
      coordsToFocus.push(attackCoordsEntered[attackCoordsEntered.length - 1]);
      generateAdjacentCoords();
    }
  }

  return { enterCoords, showTurn, startTurn, getFeedback };
};

export default commanderAI;
