/* eslint-disable no-return-assign */
/* eslint-disable no-undef */



let player
beforeEach(() => (player = Player('test')))
test("Player can enter and show their name", () => {
  expect(player.showName()).toEqual('test');
})