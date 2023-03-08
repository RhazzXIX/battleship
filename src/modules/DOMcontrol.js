import { default as attachDivGrid, removeGrid } from "./helpers/divBoard";
import Game from "./game";
import parseGridCoords from "./helpers/coordinatesHandler";

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
  let gameFinished = false;

  // Functions for DOM control

  const updateAppBoard = () => {
    getBoards = game.getGameBoard();
  };

  function changeAxis(e) {
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

  function updateDOMBoard(playerBoard, compBoard) {
    removeGrid(playerBoard);
    attachDivGrid(playerBoard, getBoards.player, "player");
    if (compBoard) {
      removeGrid(compBoard);
      attachDivGrid(compBoard, getBoards.comp);
    }
  }

  function announceWinner() {
    body.appendChild(noticeSection);
    winnerNotice.textContent = game.showMessage();
  }

  const gridClickEvent = (index) => {
    const coord = parseGridCoords(index);
    game.attack(coord);
    updateAppBoard();
    updateDOMBoard(gamePlBoard, gameCompBoard);
    if (game.showMessage() === "All ships has been sank!") {
      gameFinished = true;
      setTimeout(announceWinner, 500);
    }
  };

  function addGridClickEvent() {
    const compGrids = gameCompBoard.querySelectorAll("div.grid");
    compGrids.forEach((grid, j) => {
      grid.addEventListener("click", (e) => {
        e.stopPropagation();
        gridClickEvent(j);
        if (!gameFinished) {
          addGridClickEvent();
        }
      });
    });
  }

  function toggleShipSelection() {
    if (shipSelection.contains(domCommander)) {
      shipSelection.removeChild(domCommander);
      shipSelection.appendChild(domBattleship);
    } else if (shipSelection.contains(domBattleship)) {
      shipSelection.removeChild(domBattleship);
      shipSelection.appendChild(domDestroyer);
    } else if (shipSelection.contains(domDestroyer)) {
      shipSelection.removeChild(domDestroyer);
      shipSelection.appendChild(domSubmarine);
    } else if (shipSelection.contains(domSubmarine)) {
      shipSelection.removeChild(domSubmarine);
      shipSelection.appendChild(domPatrolBoat);
    } else if (shipSelection.contains(domPatrolBoat)) {
      shipSelection.removeChild(domPatrolBoat);
      shipSelection.appendChild(battleBtn);
    }
  }

  function setShipEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    const coords = parseGridCoords(this);

    game.setPlayerShip(coords, axis);
    updateAppBoard();
    if (game.showMessage() !== "Check coordinates again.") {
      toggleShipSelection();
      updateDOMBoard(placeShipBoard);
      setDragNDropEvents(placeShipBoard);
    }
  }

  function setDragNDropEvents(plBoard) {
    const plGrids = plBoard.querySelectorAll("div.grid");
    plGrids.forEach((grid, index) => {
      grid.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      grid.addEventListener("drop", setShipEvent.bind(index));
    });
  }

  function loadGame(event) {
    event.preventDefault();
    event.stopPropagation();
    game.setPlayer(playerInput.value);
    updateAppBoard();
    attachDivGrid(placeShipBoard, getBoards.player, "player");
    setDragNDropEvents(placeShipBoard);
    main.removeChild(startSection);
    main.appendChild(placeShipSection);
    playerInput.value = "";
  }

  function startBattle(event) {
    event.stopPropagation();
    updateAppBoard();
    attachDivGrid(gamePlBoard, getBoards.player, "player");
    attachDivGrid(gameCompBoard, getBoards.comp);
    addGridClickEvent();
    main.removeChild(placeShipSection);
    main.appendChild(gameSection);
  }

  // Eventlisteners

  playerForm.addEventListener("submit", loadGame);
  axisBtn.addEventListener("click", changeAxis);
  battleBtn.addEventListener("click", startBattle);
  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });
})();

export default controlDOM;
