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

test("Add a ship to the game board", () => {
  playerBoard.placeShip([0, 0], "x");
  expect(!!playerBoard.showGameboard()[0][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][1].ship).toEqual(true);
});

test("Add a ship to the game board's x-axis", () => {
  playerBoard.placeShip([0, 0], "x");
  expect(!!playerBoard.showGameboard()[0][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][1].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][2].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][3].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][4].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][5].ship).toEqual(false);
  expect(!!playerBoard.showGameboard()[1][0].ship).toEqual(false);
});

test("Add a ship to the game board's y-axis", () => {
  playerBoard.placeShip([0, 0], "y");
  expect(!!playerBoard.showGameboard()[0][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[1][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[2][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[3][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[4][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][1].ship).toEqual(false);
  expect(!!playerBoard.showGameboard()[5][0].ship).toEqual(false);
});


