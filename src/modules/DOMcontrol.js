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
  let axis = "x";

  // Functions for DOM control

  const updateGameBoard = () => {
    getBoards = game.getGameBoard();
  };

  function changeAxis(e) {
    console.log(axis);
    e.stopPropagation();
    if (axis === "x") {
      axis = "y";
    } else {
      axis = "x";
    }
    if (axisBtn.textContent === "Horizontal") {
      axisBtn.textContent = "Vertical";
    } else {
      axisBtn.textContent = "Horizontal";
    }
    domCommander.classList.toggle("axisY");
    domBattleship.classList.toggle("axisY");
    domDestroyer.classList.toggle("axisY");
    domSubmarine.classList.toggle("axisY");
    domPatrolBoat.classList.toggle("axisY");
    battleBtn.classList.toggle("axisY");
  }

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
  axisBtn.addEventListener("click", changeAxis);

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
