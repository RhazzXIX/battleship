/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import Gameboard from "../modules/factories/gameboard";

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
  playerBoard.showGameboard()[0][0].shot = "miss";
  expect(playerBoard.showGameboard()[0][0]).toEqual({ shot: null });
});

test("Place a ship to the game board", () => {
  expect(playerBoard.placeShip([0, 0], "x")).toEqual("Placed Commander");
  expect(!!playerBoard.showGameboard()[0][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][1].ship).toEqual(true);
});

test("Place a ship to the game board's x-axis", () => {
  expect(playerBoard.placeShip([0, 0], "x")).toEqual("Placed Commander");
  expect(!!playerBoard.showGameboard()[0][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][1].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][2].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][3].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][4].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][5].ship).toEqual(false);
  expect(!!playerBoard.showGameboard()[1][0].ship).toEqual(false);
});

test("Place a ship to the game board's y-axis", () => {
  expect(playerBoard.placeShip([0, 0], "y")).toEqual("Placed Commander");
  expect(!!playerBoard.showGameboard()[0][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[1][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[2][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[3][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[4][0].ship).toEqual(true);
  expect(!!playerBoard.showGameboard()[0][1].ship).toEqual(false);
  expect(!!playerBoard.showGameboard()[5][0].ship).toEqual(false);
});

test("Can place multiple different ships at the game board", () => {
  expect(playerBoard.placeShip([0, 0], "x")).toEqual("Placed Commander");
  expect(playerBoard.placeShip([3, 0], "x")).toEqual("Placed Battleship");
  expect(playerBoard.placeShip([2, 8], "y")).toEqual("Placed Destroyer");
  expect(playerBoard.placeShip([6, 3], "y")).toEqual("Placed Submarine");
  expect(playerBoard.placeShip([7, 5], "x")).toEqual(
    "All ships has been placed."
  );
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
  expect(playerBoard.placeShip([0, 0], "y")).toEqual(
    "Check coordinates again."
  );
  expect(playerBoard.showGameboard()[0][0].ship).toEqual("Commander");
  expect(playerBoard.showGameboard()[1][0].ship).toBeUndefined();
});

test("Cannot place a ship out of bounds", () => {
  playerBoard.placeShip([9, 1], "x");
  expect(playerBoard.placeShip([0, 9], "x")).toEqual(
    "Check coordinates again."
  );
  expect(playerBoard.placeShip([9, 0], "y")).toEqual(
    "Check coordinates again."
  );
  expect(playerBoard.showGameboard()[0][9].ship).toBeUndefined();
  expect(playerBoard.showGameboard()[9][0].ship).toBeUndefined();
  expect(playerBoard.showGameboard()[9][1].ship).toEqual("Commander");
});

test("Cannot place more than 5 ships", () => {
  playerBoard.placeShip([0, 0], "x");
  playerBoard.placeShip([3, 0], "x");
  playerBoard.placeShip([2, 8], "y");
  playerBoard.placeShip([6, 3], "y");
  playerBoard.placeShip([7, 5], "x");
  expect(playerBoard.placeShip([7, 5], "x")).toEqual(
    "All ships has been placed."
  );
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
    expect(playerBoard.receiveAttack([1, 0])).toEqual("miss");
    expect(playerBoard.showGameboard()[1][0].shot).toEqual("miss");
  });

  test("Game board when it receive an attack, it can hit a ship", () => {
    expect(playerBoard.showGameboard()[0][0].shot).toEqual(null);
    expect(playerBoard.receiveAttack([0, 0])).toEqual("hit");
    expect(playerBoard.showGameboard()[0][0].shot).toEqual("hit");
  });

  test("If a ship was hit enough, it will be reported", () => {
    playerBoard.receiveAttack([0, 0]);
    playerBoard.receiveAttack([0, 1]);
    playerBoard.receiveAttack([0, 2]);
    playerBoard.receiveAttack([0, 3]);
    expect(playerBoard.receiveAttack([0, 4])).toEqual(
      "Commander has been sank!"
    );

    playerBoard.receiveAttack([7, 6]);
    expect(playerBoard.receiveAttack([7, 5])).toEqual(
      "Patrol Boat has been sank!"
    );

    playerBoard.receiveAttack([3, 0]);
    playerBoard.receiveAttack([3, 2]);
    playerBoard.receiveAttack([3, 3]);
    expect(playerBoard.receiveAttack([3, 1])).toEqual(
      "Battleship has been sank!"
    );

    playerBoard.receiveAttack([2, 8]);
    playerBoard.receiveAttack([3, 8]);
    expect(playerBoard.receiveAttack([4, 8])).toEqual(
      "Destroyer has been sank!"
    );

    playerBoard.receiveAttack([6, 3]);
    playerBoard.receiveAttack([7, 3]);
    expect(playerBoard.receiveAttack([8, 3])).toEqual(
      "All ships has been sank!"
    );
  });

  test("You can't shoot the same coordinates again", () => {
    expect(playerBoard.receiveAttack([7, 6])).toBe("hit");
    expect(playerBoard.receiveAttack([7, 6])).toBe(null);
  });
});
