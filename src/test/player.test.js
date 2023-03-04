/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import Player from "../modules/factories/player";

let player;

let enemyBoard;
let enemyTurn;
const coord = [0, 1];

beforeEach(() => {
  player = Player("test");
  enemyBoard = jest.fn((array) => array);
  enemyTurn = jest.fn();
});

test("Player can show their name", () => {
  expect(player.showName()).toEqual("test");
});

test("Player can show their turn", () => {
  expect(player.showTurn()).toEqual(true);
});

test("Player can attack on boards, end their turn and call enemy turn", () => {
  expect(player.showTurn()).toEqual(true);
  player.attackBoard(coord, enemyBoard, enemyTurn);
  expect(enemyBoard.mock.calls).toHaveLength(1);
  expect(enemyBoard.mock.calls[0][0]).toEqual(coord);
  expect(enemyTurn.mock.calls).toHaveLength(1);
  expect(player.showTurn()).toEqual(false);
});

test(`Player cannot attack if it's not their turn`, () => {
  expect(player.showTurn()).toEqual(true);
  player.attackBoard(coord, enemyBoard, enemyTurn);
  expect(enemyBoard.mock.calls).toHaveLength(1);
  expect(player.showTurn()).toEqual(false);
  player.attackBoard(coord, enemyBoard, enemyTurn);
  expect(enemyBoard.mock.calls).toHaveLength(1);
});

test("Player can have their turn", () => {
  expect(player.showTurn()).toEqual(true);
  player.attackBoard(coord, enemyBoard, enemyTurn);
  expect(enemyBoard.mock.calls).toHaveLength(1);
  expect(player.showTurn()).toEqual(false);
  player.startTurn();
  expect(player.showTurn()).toEqual(true);
  player.attackBoard(coord, enemyBoard, enemyTurn);
  expect(enemyBoard.mock.calls).toHaveLength(2);
});
