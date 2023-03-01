/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import commanderAI from '../modules/factories/ai'

const coordinates = [];
const attackMock = jest.fn((x) => coordinates.push(x));
const checkCoordinates = (x) => {
  const [y, z] = [...x];
  const lastCoordIndex = coordinates.findIndex((coords) => {
    const [a, b] = [...coords];
    if (a === y && b === z) return coords;
  });
  coordinates.splice(lastCoordIndex, 1);
  let double = false;
  const coordsCopy = [];
  coordinates.forEach((coords) => coordsCopy.push(coords));
  coordsCopy.forEach((coords, i, arr) => {
    const [a, b] = [...coords];
    if (a === y && b === z) {
      double = true;
      arr.splice(i);
    }
  });
  return double;
};

const playerAI = commanderAI();

describe("A.I. can use receiveAttack function properly", () => {
  test("A.I. can call the function", () => {
    playerAI.enterCoords(attackMock);
    expect(attackMock.mock.calls).toHaveLength(1);
    expect(attackMock.mock.calls[0][0][0]).not.toBeLessThan(0);
    expect(attackMock.mock.calls[0][0][0]).not.toBeGreaterThan(9);
    expect(attackMock.mock.calls[0][0][1]).not.toBeLessThan(0);
    expect(attackMock.mock.calls[0][0][1]).not.toBeGreaterThan(9);
  });

  describe("Coordinates entered by A.I.", () => {
    beforeEach(() => coordinates.splice());

    test("A.I. will enter coordinates within the board", () => {
      playerAI.enterCoords(attackMock);
      expect(attackMock.mock.calls[0][0][0]).not.toBeLessThan(0);
      expect(attackMock.mock.calls[0][0][0]).not.toBeGreaterThan(9);
      expect(attackMock.mock.calls[0][0][1]).not.toBeLessThan(0);
      expect(attackMock.mock.calls[0][0][1]).not.toBeGreaterThan(9);
      playerAI.enterCoords(attackMock);
      expect(attackMock.mock.calls[0][0][0]).not.toBeLessThan(0);
      expect(attackMock.mock.calls[0][0][0]).not.toBeGreaterThan(9);
      expect(attackMock.mock.calls[0][0][1]).not.toBeLessThan(0);
      expect(attackMock.mock.calls[0][0][1]).not.toBeGreaterThan(9);
      playerAI.enterCoords(attackMock);
      expect(attackMock.mock.calls[0][0][0]).not.toBeLessThan(0);
      expect(attackMock.mock.calls[0][0][0]).not.toBeGreaterThan(9);
      expect(attackMock.mock.calls[0][0][1]).not.toBeLessThan(0);
      expect(attackMock.mock.calls[0][0][1]).not.toBeGreaterThan(9);
    });

    test("A.I will not repeat coordinates", () => {
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      playerAI.enterCoords(attackMock);
      expect(checkCoordinates(attackMock.mock.calls[0][0])).toBeFalsy();
    });
  });
});

test.skip("A.I. can set a ship in the gameBoard", () => {
  expect(playerAI.showGameBoard()).not.toEqual([
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
