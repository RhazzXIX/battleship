import Ship from "./ship";

const Gameboard = () => {
  const gameBoard = [];

  const commander = Ship("Commander", 5);
  const battleship = Ship("Battleship", 4);
  const destroyer = Ship("Destroyer", 3);
  const submarine = Ship("Submarine", 3);
  const patrolBoat = Ship("Patrol Boat", 2);

  const allShips = [
    commander,
    battleship,
    destroyer,
    submarine,
    patrolBoat
  ];

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

  const spawnCoords = ([x, y], axis, shipLength) => {
    let xAxis = x;
    let yAxis = y;
    const coordinates = [[xAxis, yAxis]];
    if (axis === "x") {
      for (let i = 1; i < shipLength; i += 1) {
        yAxis += 1;
        const nextCoords = [xAxis, yAxis];
        coordinates.push(nextCoords);
      }
    }
    if (axis === "y") {
      for (let i = 1; i < shipLength; i += 1) {
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

    return ship;
  };

  const checkCoords = (coords) => {
    let gridOk;
    coords.forEach((coord, i, arr) => {
      const [x, y] = [...coord];
      switch (true) {
        case x < 0:
          gridOk = false;
          arr.splice(i);
          return;
        case y < 0:
          gridOk = false;
          arr.splice(i);
          return;
        case x > 9:
          gridOk = false;
          arr.splice(i);
          return;
        case y > 9:
          gridOk = false;
          arr.splice(i);
          return;
        default:
          gridOk = true;
      }
      if (gameBoard[x][y].ship) {
        gridOk = false;
        arr.splice(i);
      }
    });
    return gridOk;
  };

  const placeShip = (coord, axis) => {
    if (placedShip === 5) return;
    const appropriateShip = getShipInOrder();
    const coordinates = spawnCoords(coord, axis, appropriateShip.getLength());
    const coordsOK = checkCoords(coordinates);
    if (!coordsOK) return;
    coordinates.forEach((grid) => {
      const [x, y] = [...grid];
      gameBoard[x][y].ship = appropriateShip.getName();
    });

    placedShip += 1;
  };


  const attackShip = (shipName) => {
    allShips.forEach(ship => {
      if (ship.getName() === shipName) ship.hit();
    })
  }

  const receiveAttack = (coord) => {
    const [x, y] = [...coord];
    const grid = gameBoard[x][y];
    grid.shot = "missed";
    if (grid.ship) {
      grid.shot = "hit";
      attackShip(grid.ship)
    }
  };


  return { showGameboard, placeShip, receiveAttack };
};

export default Gameboard;
