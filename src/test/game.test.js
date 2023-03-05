/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import Game from "../modules/game";

const game = Game();
game.setPlayer("test");
const boards = game.getGameBoard();

test("Winner will be announced if all ship were sank", () => {
  game.attack([0, 0]);
  game.attack([0, 1]);
  game.attack([0, 2]);
  game.attack([0, 3]);
  game.attack([0, 4]);
  game.attack([7, 6]);
  game.attack([7, 5]);
  game.attack([3, 0]);
  game.attack([3, 2]);
  game.attack([3, 8]);
  game.attack([3, 1]);
  game.attack([2, 8]);
  game.attack([4, 8]);
  game.attack([3, 3]);
  game.attack([6, 3]);
  game.attack([7, 3]);
  game.attack([8, 3]);
  expect(game.showMessage()).toEqual("All ships has been sank!");
  expect(game.showMessage()).toEqual("test is the winner!");
});
