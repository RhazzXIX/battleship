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
  playerBoard.placeShip([0, 0], "x");
  playerBoard.placeShip([3, 0], "x");
  playerBoard.placeShip([2, 8], "y");
  playerBoard.placeShip([6, 3], "y");
  playerBoard.placeShip([7, 5], "x");
  expect(playerBoard.showGameboard()[0][0].ship).toEqual("Commander");
  expect(playerBoard.showGameboard()[0][4].ship).toEqual("Commander");
  expect(playerBoard.showGameboard()[3][0].ship).toEqual("Battleship");
  expect(playerBoard.showGameboard()[3][3].ship).toEqual("Battleship");
  expect(playerBoard.showGameboard()[2][8].ship).toEqual("Destroyer");
  expect(playerBoard.showGameboard()[4][8].ship).toEqual("Destroyer");
  expect(playerBoard.showGameboard()[6][3].ship).toEqual("Submarine");
  expect(playerBoard.showGameboard()[8][3].ship).toEqual("Submarine");
  expect(playerBoard.showGameboard()[7][5].ship).toEqual("Patrol Boat");
  expect(playerBoard.showGameboard()[7][6].ship).toEqual("Patrol Boat");
});

test("Cannot place a ship over other ships", () => {
  playerBoard.placeShip([0, 0], "x");
  playerBoard.placeShip([0, 0], "y");
  expect(playerBoard.showGameboard()[0][0].ship).toEqual("Commander");
  expect(playerBoard.showGameboard()[1][0].ship).toBeUndefined();
});

test("Cannot place a ship out of bounds", () => {
  playerBoard.placeShip([0, 9], "x");
  playerBoard.placeShip([9, 0], "y");
  playerBoard.placeShip([9, 1], "x");
  expect(playerBoard.showGameboard()[0][9].ship).toBeUndefined();
  expect(playerBoard.showGameboard()[9][0].ship).toBeUndefined();
  expect(playerBoard.showGameboard()[9][1].ship).toEqual("Commander");
});

describe("Attack in the game board", () => {
  beforeEach(() => {
    playerBoard.placeShip([0, 0], "x");
    playerBoard.placeShip([3, 0], "x");
    playerBoard.placeShip([2, 8], "y");
    playerBoard.placeShip([6, 3], "y");
    playerBoard.placeShip([7, 5], "x");
  });

  test("Game board can receive attack", () => {
    expect(playerBoard.showGameboard()[1][0].shot).toEqual(null);
    playerBoard.receiveAttack([1, 0]);
    expect(playerBoard.showGameboard()[1][0].shot).toEqual("missed");
  });

  test("Game board when it receive an attack, it can hit a ship", () => {
    expect(playerBoard.showGameboard()[0][0].shot).toEqual(null);
    playerBoard.receiveAttack([0, 0]);
    expect(playerBoard.showGameboard()[0][0].shot).toEqual("hit");
  });

  test("Attacks can hit a ship and sink it", () => {
    playerBoard.receiveAttack([0, 0]);
    playerBoard.receiveAttack([0, 1]);
    playerBoard.receiveAttack([0, 2]);
    playerBoard.receiveAttack([0, 3]);
    playerBoard.receiveAttack([0, 4]);
    expect(playerBoard.reportShipsCondition()).toEqual(
      "Commander has been sank!"
    );
    expect(playerBoard.reportShipsCondition()).toBeUndefined();
    playerBoard.receiveAttack([7, 6]);
    playerBoard.receiveAttack([7, 5]);
    expect(playerBoard.reportShipsCondition()).toEqual(
      "Patrol Boat has been sank!"
    );
  });

  test("If all ship sank, it will be reported", () => {
    playerBoard.receiveAttack([0, 0]);
    playerBoard.receiveAttack([0, 1]);
    playerBoard.receiveAttack([0, 2]);
    playerBoard.receiveAttack([0, 3]);
    playerBoard.receiveAttack([0, 4]);
    expect(playerBoard.reportShipsCondition()).toEqual(
      "Commander has been sank!"
    );
    playerBoard.receiveAttack([7, 6]);
    playerBoard.receiveAttack([7, 5]);
    expect(playerBoard.reportShipsCondition()).toEqual(
      "Patrol Boat has been sank!"
    );
    playerBoard.receiveAttack([3, 0]);
    playerBoard.receiveAttack([3, 2]);
    playerBoard.receiveAttack([3, 3]);
    playerBoard.receiveAttack([3, 1]);
    expect(playerBoard.reportShipsCondition()).toEqual(
      "Battleship has been sank!"
    );
    playerBoard.receiveAttack([2, 8]);
    playerBoard.receiveAttack([3, 8]);
    playerBoard.receiveAttack([4, 8]);
    expect(playerBoard.reportShipsCondition()).toEqual(
      "Destroyer has been sank!"
    );
    playerBoard.receiveAttack([6, 3]);
    playerBoard.receiveAttack([7, 3]);
    playerBoard.receiveAttack([8, 3]);
    expect(playerBoard.reportShipsCondition()).toEqual(
      "All ships has been sank!"
    );
  });

  test("You can't shoot the same coordinates again", () => {
    playerBoard.receiveAttack([7, 6]);
    playerBoard.receiveAttack([7, 6]);
    expect(playerBoard.reportShipsCondition()).toBeUndefined();
  });
});
