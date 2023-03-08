const parseGridCoords = (index) => {
  let x = 0;
  let y = index;

  if (index >= 10) {
    x = Math.floor(index / 10);
    y = index - x * 10;
  }
  return [x, y];
};


const generateCoords = () => {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return [x, y];
};


export default parseGridCoords;
export { generateCoords }
