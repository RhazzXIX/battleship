/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import Player from "../modules/player";

let player
beforeEach(() => (player = Player('test')))
test("Player can show their name", () => {
  expect(player.showName()).toEqual('test');
})