import Gameboard from "./gameboard";

const commanderAI = () => {
  const generateCoords = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  };

  const enterCoords = (fn) => {
    const coords = generateCoords();
    fn(coords);
  };

  return { enterCoords };
};

export default commanderAI;
