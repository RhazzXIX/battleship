import Gameboard from "./gameboard";

const commanderAI = () => {
  const attackCoordsEntered = [];

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

  const enterCoords = (fn) => {
    if (attackCoordsEntered.length === 100) return;
    const coords = generateCoords();
    const entered = checkCoordinates(coords);
    if (!entered) {
      attackCoordsEntered.push(coords);
      fn(coords);
    } else if (entered) {
      enterCoords(fn);
    }
  };

  return { enterCoords };
};

export default commanderAI;
