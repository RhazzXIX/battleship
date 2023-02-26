/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import Gameboard from "../modules/gameboard";

let playerBoard;

beforeEach(() => (playerBoard = Gameboard()));

test("Gameboard can show a gameBoard", () => {
  expect(playerBoard.showGameboard()).toEqual([
    [
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
    ],
    [
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
    ],
    [
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
    ],
    [
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
    ],
    [
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
    ],
    [
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
    ],
    [
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
    ],
    [
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
    ],
    [
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
    ],
    [
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
      { shot: null },
    ],
  ]);
});

test("GameBoard cannot be edited", () => {
  playerBoard.showGameboard()[0][0].shot = "missed";
  expect(playerBoard.showGameboard()[0][0]).toEqual({ shot: null });
});

test("Place a ship to the game board", () => {
  playerBoard.placeShip([0, 0], "x");
  expect(!!playerBoard.showGameboard()[0][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][1].ship).toEqual(true);
});

test("Place a ship to the game board's x-axis", () => {
  playerBoard.placeShip([0, 0], "x");
  expect(!!playerBoard.showGameboard()[0][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][1].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][2].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][3].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][4].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][5].ship).toEqual(false);
  expect(!!playerBoard.showGameboard()[1][0].ship).toEqual(false);
});

test("Place a ship to the game board's y-axis", () => {
  playerBoard.placeShip([0, 0], "y");
  expect(!!playerBoard.showGameboard()[0][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[1][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[2][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[3][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[4][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][1].ship).toEqual(false);
  expect(!!playerBoard.showGameboard()[5][0].ship).toEqual(false);
});

test("Can place multiple different ships at the game board", () => {
  playerBoard.placeShip([0, 0], 'x')
  playerBoard.placeShip([3, 0], "x");
  playerBoard.placeShip([2, 8], "y");
  playerBoard.placeShip([6, 3], "y");
  playerBoard.placeShip([7, 5], "x");
  expect(playerBoard.showGameboard()[0][0].ship).toEqual('Commander');
  expect(playerBoard.showGameboard()[0][4].ship).toEqual('Commander');
  expect(playerBoard.showGameboard()[3][0].ship).toEqual('Battleship');
  expect(playerBoard.showGameboard()[3][3].ship).toEqual('Battleship');
  expect(playerBoard.showGameboard()[2][8].ship).toEqual('Destroyer');
  expect(playerBoard.showGameboard()[4][8].ship).toEqual('Destroyer');
  expect(playerBoard.showGameboard()[6][3].ship).toEqual('Submarine');
  expect(playerBoard.showGameboard()[8][3].ship).toEqual('Submarine');
  expect(playerBoard.showGameboard()[7][5].ship).toEqual('Patrol Boat');
  expect(playerBoard.showGameboard()[7][6].ship).toEqual('Patrol Boat');
})


