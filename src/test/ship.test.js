/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import Ship from "../modules/ship";

let commander

beforeEach(() => commander = Ship('Commander', 5));
test("Ship return object", () => {
  expect(typeof commander).toBe("object");
});

test('Ships have names', () => {
  expect(commander.getName()).toBe('Commander')
})

test("Ships can show the Length", () => {
  expect(commander.getLength()).toEqual(5);
});


describe("Testing ship's method", () => {
  beforeEach(() => commander = Ship(null, 5));
  test("Ship can be sunk", () => {
    commander.hit();
    commander.hit();
    commander.hit();
    commander.hit();
    commander.hit();
    expect(commander.isSunk()).toEqual(true);
  });
  test("Ship won't sink if it does'nt get hit enough", () => {
    commander.hit();
    commander.hit();
    commander.hit();
    commander.hit();
    expect(commander.isSunk()).toEqual(false);
  });
});
