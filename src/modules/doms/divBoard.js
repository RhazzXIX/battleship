

const createGrid = (coord, player) => {
  const grid = document.createElement('div');
  grid.classList.add('grid')
  if (coord.shot === 'miss') grid.classList.add('miss');
  if (coord.shot === 'hit') grid.classList.add('hit');
  if (player) {
    if (coord.ship) grid.classList.add('ship');
  }

  return grid
}

const attachDivGrid = (htmlBoard, gameBoard, player) => {
  gameBoard.forEach(row => {
    row.forEach(coord => {
      const grid = createGrid(coord, player);
      htmlBoard.appendChild(grid);
    })
  })

}

const removeGrid = (htmlBoard) => {
  const grids = htmlBoard.querySelectorAll('div');
  grids.forEach(grid => {
    htmlBoard.removeChild(grid);
  })
}

export default attachDivGrid;
export { removeGrid  }