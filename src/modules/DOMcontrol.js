import { default as attachDivGrid, removeGrid } from "./doms/divBoard";
import Game from "./game";
import parseGridCoords from "./doms/parseGridCoords";

const controlDOM = (() => {
  const body = document.querySelector("body");

  const main = document.querySelector("main");
  const startSection = main.querySelector("section#start");
  const playerForm = startSection.querySelector("form#player");
  const startBtn = startSection.querySelector("button");

  const placeShipSection = main.querySelector("section#place");
  const axisBtn = placeShipSection.querySelector("button#axis");
  const placeShipBoard = placeShipSection.querySelector("div#plBoard");

  const gameSection = main.querySelector("section#game");
  const gamePlBoard = gameSection.querySelector("div#gamePlBoard");
  const gameCompBoard = gameSection.querySelector("div#gameCompBoard");

  const noticeSection = body.querySelector("section#notice");
  const winnerNotice = noticeSection.querySelector("h2#announce");
  const restartBtn = noticeSection.querySelector("button#restart");

  main.removeChild(startSection);
  main.removeChild(placeShipSection);
  placeShipSection.classList.remove("hidden");
  // main.removeChild(gameSection);
  gameSection.classList.remove("hidden");
  body.removeChild(noticeSection);
  noticeSection.classList.remove("hidden");

  const game = Game();
  const boards = game.getGameBoard();
  game.setPlayer("test");
  attachDivGrid(gamePlBoard, boards.player, "player");
  attachDivGrid(gameCompBoard, boards.comp);

  const gridClickEvent = (index) => {
    const coord = parseGridCoords(index);
    game.attack(coord);
    removeGrid(gamePlBoard);
    attachDivGrid(gamePlBoard, game.getGameBoard().player, "player");
    removeGrid(gameCompBoard);
    attachDivGrid(gameCompBoard, game.getGameBoard().comp);
  };

  function addGridClickEvent() {
    const compGrids = gameCompBoard.querySelectorAll("div.grid");
    compGrids.forEach((grid, j) => {
      grid.addEventListener("click", () => {
        gridClickEvent(j);
        addGridClickEvent();
      });
    });
  }

  addGridClickEvent(
    gameCompBoard,
    gamePlBoard,
    boards,
    game.attack,
    removeGrid,
    attachDivGrid
  );

  // setTimeout(() => {
  //   removeGrid(placeShipBoard);
  // }, 2000);
})();

export default controlDOM;
