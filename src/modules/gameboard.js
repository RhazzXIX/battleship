import Ship from "./ship";

const Gameboard = () => {
  const gameboard = [];
  const commander = Ship('Commander', 5);
  const battleship = Ship('Battleship', 4);
  const destroyer = Ship('Destroyer', 3);
  const submarine = Ship('Submarine', 3)
  
  for (let i = 0; i < 10; i += 1) {
    const row = [];
    for (let j = 0; j < 10; j += 1) {
      const grid = { shot: null };
      row.push(grid);
    }
    gameboard.push(row);
  }

  const showGameboard = () => {
    const displayedGameboard = [];
    gameboard.forEach(row => {
      const displayedRow = [];
      row.forEach(grid => {
        const diplayedGrid = {...grid}
        displayedRow.push(diplayedGrid)
      });
      displayedGameboard.push(displayedRow);
    })
    return displayedGameboard;
  };

  const placeShip = () => {

  }

  
  return { showGameboard };
};

export default Gameboard;
