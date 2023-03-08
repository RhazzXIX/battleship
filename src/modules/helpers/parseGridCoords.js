const parseGridCoords = (index) => {
  let x = 0;
  let y = index;

  if (index >= 10) {
    x = Math.floor(index / 10);
    y = index - x * 10;
  }
  return [x, y];
};

export default parseGridCoords;
