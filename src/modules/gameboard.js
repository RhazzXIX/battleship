import Ship from "./ship";

const Gameboard = () => {
  const gameBoard = [];

  const commander = Ship("Commander", 5);
  const battleship = Ship("Battleship", 4);
  const destroyer = Ship("Destroyer", 3);
  const submarine = Ship("Submarine", 3);
  const patrolBoat = Ship("Patrol Boat", 2);

  let placedShip = 0;

  for (let i = 0; i < 10; i += 1) {
    const row = [];
    for (let j = 0; j < 10; j += 1) {
      const grid = { shot: null };
      row.push(grid);
    }
    gameBoard.push(row);
  }

  const showGameboard = () => {
    const displayedGameboard = [];
    gameBoard.forEach((row) => {
      const displayedRow = [];
      row.forEach((grid) => {
        const diplayedGrid = { ...grid };
        displayedRow.push(diplayedGrid);
      });
      displayedGameboard.push(displayedRow);
    });
    return displayedGameboard;
  };

  const spawnCoords = ([x, y], axis, length) => {
    let xAxis = x;
    let yAxis = y;
    const coordinates = [[xAxis, yAxis]];
    if (axis === "x") {
      for (let i = 1; i < length; i += 1) {
        if (yAxis === 9) {
          yAxis = 0;
          xAxis += 1;
        }
        yAxis += 1;
        const nextCoords = [xAxis, yAxis];
        coordinates.push(nextCoords);
      }
    }
    if (axis === "y") {
      for (let i = 1; i < length; i += 1) {
        xAxis += 1;
        const nextCoords = [xAxis, yAxis];
        coordinates.push(nextCoords);
      }
    }
    return coordinates;
  };

  const getShipInOrder = () => {
    let ship;
    switch (placedShip) {
      case 1:
        ship = battleship;
        break;
      case 2:
        ship = destroyer;
        break;
      case 3:
        ship = submarine;
        break;
      case 4:
        ship = patrolBoat;
        break;
      default:
        ship = commander;
    }

    placedShip += 1;
    return ship;
  };

  const placeShip = (coords, axis) => {
    if (placedShip === 5) return;
    const appropriateShip = getShipInOrder();
    const coordinates = spawnCoords(coords, axis, appropriateShip.getLength());
    coordinates.forEach((coord) => {
      const [x, y] = [...coord];
      gameBoard[x][y].ship = appropriateShip.getName();
    });
  };

  return { showGameboard, placeShip };
};

export default Gameboard;
