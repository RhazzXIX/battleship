/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import GameBoard from "../modules/factories/gameBoard";

let playerBoard;

beforeEach(() => (playerBoard = GameBoard()));

test("GameBoard can show a gameBoard", () => {
  expect(playerBoard.showGameBoard()).toEqual([
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
  playerBoard.showGameBoard()[0][0].shot = "miss";
  expect(playerBoard.showGameBoard()[0][0]).toEqual({ shot: null });
});

test("GameBoard will now announce activities on the board", () => {
  expect(playerBoard.announce()).toEqual("");
  playerBoard.placeShip([0, 0], "x");
  expect(playerBoard.announce()).toEqual("Placed Commander");
});

test("Place a ship to the game board", () => {
  playerBoard.placeShip([0, 0], "x");
  expect(playerBoard.announce()).toEqual("Placed Commander");
});

test("Place a ship to the game board's x-axis", () => {
  playerBoard.placeShip([0, 0], "x");
  expect(playerBoard.announce()).toEqual("Placed Commander");
});

test("Place a ship to the game board's y-axis", () => {
  playerBoard.placeShip([0, 0], "y");
  expect(playerBoard.announce()).toEqual("Placed Commander");
});

test("Can place multiple different ships at the game board", () => {
  playerBoard.placeShip([0, 0], "x");
  expect(playerBoard.announce()).toEqual("Placed Commander");
  playerBoard.placeShip([3, 0], "x");
  expect(playerBoard.announce()).toEqual("Placed Battleship");
  playerBoard.placeShip([2, 8], "y");
  expect(playerBoard.announce()).toEqual("Placed Destroyer");
  playerBoard.placeShip([6, 3], "y");
  expect(playerBoard.announce()).toEqual("Placed Submarine");
  playerBoard.placeShip([7, 5], "x");
  expect(playerBoard.announce()).toEqual("All ships has been placed.");
});

test("Cannot place a ship over other ships", () => {
  playerBoard.placeShip([0, 0], "x");
  playerBoard.placeShip([0, 0], "y");
  expect(playerBoard.announce()).toEqual("Check coordinates again.");
});

test("Cannot place a ship out of bounds", () => {
  playerBoard.placeShip([9, 1], "x");
  playerBoard.placeShip([0, 9], "x");
  expect(playerBoard.announce()).toEqual("Check coordinates again.");
  playerBoard.placeShip([9, 0], "y");
  expect(playerBoard.announce()).toEqual("Check coordinates again.");
  expect(playerBoard.showGameBoard()[0][9].ship).toBeUndefined();
  expect(playerBoard.showGameBoard()[9][0].ship).toBeUndefined();
  expect(playerBoard.showGameBoard()[9][1].ship).toEqual("Commander");
});

test("Cannot place more than 5 ships", () => {
  playerBoard.placeShip([0, 0], "x");
  playerBoard.placeShip([3, 0], "x");
  playerBoard.placeShip([2, 8], "y");
  playerBoard.placeShip([6, 3], "y");
  playerBoard.placeShip([7, 5], "x");
  playerBoard.placeShip([7, 5], "x");
  expect(playerBoard.announce()).toEqual("All ships has been placed.");
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
    expect(playerBoard.showGameBoard()[1][0].shot).toEqual(null);
    playerBoard.receiveAttack([1, 0]);
    expect(playerBoard.announce()).toEqual("miss");
    expect(playerBoard.showGameBoard()[1][0].shot).toEqual("miss");
  });

  test("Game board when it receive an attack, it can hit a ship", () => {
    expect(playerBoard.showGameBoard()[0][0].shot).toEqual(null);
    playerBoard.receiveAttack([0, 0]);
    expect(playerBoard.announce()).toEqual("hit");
    expect(playerBoard.showGameBoard()[0][0].shot).toEqual("hit");
  });

  test("If a ship was hit enough, it will be reported", () => {
    playerBoard.receiveAttack([0, 0]);
    playerBoard.receiveAttack([0, 1]);
    playerBoard.receiveAttack([0, 2]);
    playerBoard.receiveAttack([0, 3]);
    playerBoard.receiveAttack([0, 4]);
    expect(playerBoard.announce()).toEqual("Commander has been sank!");

    playerBoard.receiveAttack([7, 6]);
    playerBoard.receiveAttack([7, 5]);
    expect(playerBoard.announce()).toEqual("Patrol Boat has been sank!");

    playerBoard.receiveAttack([3, 0]);
    playerBoard.receiveAttack([3, 2]);
    playerBoard.receiveAttack([3, 3]);
    playerBoard.receiveAttack([3, 1]);
    expect(playerBoard.announce()).toEqual("Battleship has been sank!");

    playerBoard.receiveAttack([2, 8]);
    playerBoard.receiveAttack([3, 8]);
    playerBoard.receiveAttack([4, 8]);
    expect(playerBoard.announce()).toEqual("Destroyer has been sank!");

    playerBoard.receiveAttack([6, 3]);
    playerBoard.receiveAttack([7, 3]);
    playerBoard.receiveAttack([8, 3]);
    expect(playerBoard.announce()).toEqual("All ships has been sank!");
  });

  test("You can't shoot the same coordinates again", () => {
    expect(playerBoard.receiveAttack([7, 6])).toEqual(true);
    expect(playerBoard.announce()).toBe("hit");
    expect(playerBoard.receiveAttack([7, 6])).toEqual(false);
    expect(playerBoard.announce()).toBe("Illegal shot!");
  });
});

test("Can set ship randomly", () => {
  playerBoard.placeShipRandomly();
  expect(playerBoard.showGameBoard()).not.toEqual([
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
