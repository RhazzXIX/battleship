import { default as attachDivGrid, removeGrid } from "./doms/divBoard";
import Game from "./game";
import parseGridCoords from "./doms/parseGridCoords";

const controlDOM = (() => {
  // DOM nodes
  const body = document.querySelector("body");

  const main = body.querySelector("main");
  const startSection = main.querySelector("section#start");
  const playerForm = startSection.querySelector("form#player");
  const playerInput = playerForm.querySelector("input#pName");
  const startBtn = startSection.querySelector("button");

  const placeShipSection = main.querySelector("section#place");
  const axisBtn = placeShipSection.querySelector("button#axis");
  const placeShipBoard = placeShipSection.querySelector("div#plBoard");
  const shipSelection = placeShipSection.querySelector("div#selection");
  const domCommander = shipSelection.querySelector("div#commander");
  const domBattleship = shipSelection.querySelector("div#battleship");
  const domDestroyer = shipSelection.querySelector("div#destroyer");
  const domSubmarine = shipSelection.querySelector("div#submarine");
  const domPatrolBoat = shipSelection.querySelector("div#patrolBoat");
  const battleBtn = shipSelection.querySelector("button#battle");

  const gameSection = main.querySelector("section#game");
  const gamePlBoard = gameSection.querySelector("div#gamePlBoard");
  const gameCompBoard = gameSection.querySelector("div#gameCompBoard");

  const noticeSection = body.querySelector("section#notice");
  const winnerNotice = noticeSection.querySelector("h2#announce");
  const restartBtn = noticeSection.querySelector("button#restart");

  // Initial Load

  // main.removeChild(startSection);
  // shipSelection.removeChild(domCommander);
  shipSelection.removeChild(domBattleship);
  shipSelection.removeChild(domDestroyer);
  shipSelection.removeChild(domSubmarine);
  shipSelection.removeChild(domPatrolBoat);
  shipSelection.removeChild(battleBtn);
  main.removeChild(placeShipSection);
  placeShipSection.classList.remove("hidden");
  main.removeChild(gameSection);
  gameSection.classList.remove("hidden");
  body.removeChild(noticeSection);
  noticeSection.classList.remove("hidden");

  const game = Game();
  let getBoards;

  // Functions for DOM control

  const updateGameBoard = () => {
    getBoards = game.getGameBoard();
  };

  const gridClickEvent = (index) => {
    const coord = parseGridCoords(index);
    game.attack(coord);
    updateGameBoard();
    removeGrid(gamePlBoard);
    attachDivGrid(gamePlBoard, getBoards.player, "player");
    removeGrid(gameCompBoard);
    attachDivGrid(gameCompBoard, getBoards.comp);
    console.log(game.showMessage());
  };

  function addGridClickEvent() {
    const compGrids = gameCompBoard.querySelectorAll("div.grid");
    compGrids.forEach((grid, j) => {
      grid.addEventListener("click", (e) => {
        e.stopPropagation();
        gridClickEvent(j);
        addGridClickEvent();
      });
    });
  }

  function loadGame(event) {
    event.preventDefault();
    event.stopPropagation();
    game.setPlayer(playerInput.value);
    updateGameBoard();
    attachDivGrid(placeShipBoard, getBoards.player, "player");
    main.removeChild(startSection);
    main.appendChild(placeShipSection);
    playerInput.value = "";
  }

  // Eventlisteners

  playerForm.addEventListener("submit", loadGame);

  // startBtn.addEventListener("click", startGame);

  // game.setPlayer("test");
  // attachDivGrid(gamePlBoard, boards.player, "player");
  // attachDivGrid(gameCompBoard, boards.comp);

  // addGridClickEvent(
  //   gameCompBoard,
  //   gamePlBoard,
  //   boards,
  //   game.attack,
  //   removeGrid,
  //   attachDivGrid
  // );

  // setTimeout(() => {
  //   removeGrid(placeShipBoard);
  // }, 2000);
})();

export default controlDOM;
