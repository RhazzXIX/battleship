/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import parseGridCoords from "../modules/doms/parseGridCoords";

test("Grid indexex will become coordinates", () => {
  expect(parseGridCoords(1)).toEqual([0, 1]);
  expect(parseGridCoords(99)).toEqual([9, 9]);
  expect(parseGridCoords(50)).toEqual([5, 0]);
  expect(parseGridCoords(88)).toEqual([8, 8]);
  expect(parseGridCoords(32)).toEqual([3, 2]);
});
