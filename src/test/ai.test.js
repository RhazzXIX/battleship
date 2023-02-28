/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import commanderAI from "../modules/ai";

const placeShip = jest.fn();
const attackMock = jest.fn((x) => x);

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

  test("A.I. will enter different coordinates within the board", () => {
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
});

test.skip("A.I. can set a ship in the gameBoard", () => {
  expect(commanderAI.showGameBoard()).not.toEqual([
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
