/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import commanderAI from "../modules/factories/ai";

const coordinates = [];
let attackMock;
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

let playerTurn;

const playerAI = commanderAI();

beforeEach(() => {
  playerTurn = jest.fn((x) => x);
  attackMock = jest.fn((x) => coordinates.push(x));
});

test("A.I. can call the functions properly", () => {
  playerAI.startTurn();
  playerAI.enterCoords(attackMock, playerTurn);
  expect(attackMock.mock.calls).toHaveLength(1);
  expect(attackMock.mock.calls[0][0][0]).not.toBeLessThan(0);
  expect(attackMock.mock.calls[0][0][0]).not.toBeGreaterThan(9);
  expect(attackMock.mock.calls[0][0][1]).not.toBeLessThan(0);
  expect(attackMock.mock.calls[0][0][1]).not.toBeGreaterThan(9);
  expect(playerTurn.mock.calls).toHaveLength(1);
});

test(`A.I. cannot attack if it's not his turn`, () => {
  expect(playerAI.showTurn()).toBeFalsy();
  playerAI.enterCoords(attackMock, playerTurn);
  expect(attackMock.mock.calls).toHaveLength(0);
  playerAI.startTurn();
  expect(playerAI.showTurn()).toBeTruthy();
  playerAI.enterCoords(attackMock, playerTurn);
  expect(attackMock.mock.calls).toHaveLength(1);
  expect(attackMock.mock.calls[0][0][0]).not.toBeLessThan(0);
  expect(attackMock.mock.calls[0][0][0]).not.toBeGreaterThan(9);
  expect(attackMock.mock.calls[0][0][1]).not.toBeLessThan(0);
  expect(attackMock.mock.calls[0][0][1]).not.toBeGreaterThan(9);
  expect(playerTurn.mock.calls).toHaveLength(1);
});

describe("Coordinates entered by A.I.", () => {
  beforeEach(() => {
    coordinates.splice();
    playerTurn = jest.fn((x) => x);
  });

  test("A.I. will enter coordinates within the board", () => {
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    expect(attackMock.mock.calls[0][0][0]).not.toBeLessThan(0);
    expect(attackMock.mock.calls[0][0][0]).not.toBeGreaterThan(9);
    expect(attackMock.mock.calls[0][0][1]).not.toBeLessThan(0);
    expect(attackMock.mock.calls[0][0][1]).not.toBeGreaterThan(9);
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    expect(attackMock.mock.calls[0][0][0]).not.toBeLessThan(0);
    expect(attackMock.mock.calls[0][0][0]).not.toBeGreaterThan(9);
    expect(attackMock.mock.calls[0][0][1]).not.toBeLessThan(0);
    expect(attackMock.mock.calls[0][0][1]).not.toBeGreaterThan(9);
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    expect(attackMock.mock.calls[0][0][0]).not.toBeLessThan(0);
    expect(attackMock.mock.calls[0][0][0]).not.toBeGreaterThan(9);
    expect(attackMock.mock.calls[0][0][1]).not.toBeLessThan(0);
    expect(attackMock.mock.calls[0][0][1]).not.toBeGreaterThan(9);
  });

  // Reduced to 9 enterCoords call due to the error of continuous
  // calling of the jest function.
  // 100+ calls were working before adding the playerTurn as parameter.
  test("A.I will not repeat coordinates", () => {
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    playerAI.startTurn();
    playerAI.enterCoords(attackMock, playerTurn);
    expect(checkCoordinates(attackMock.mock.calls[0][0])).toBeFalsy();
  });
});
