/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOMcontrol.js":
/*!***********************************!*\
  !*** ./src/modules/DOMcontrol.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_divBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/divBoard */ "./src/modules/helpers/divBoard.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/modules/game.js");
/* harmony import */ var _helpers_coordinatesHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/coordinatesHandler */ "./src/modules/helpers/coordinatesHandler.js");



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
  const game = (0,_game__WEBPACK_IMPORTED_MODULE_1__["default"])();
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
    (0,_helpers_divBoard__WEBPACK_IMPORTED_MODULE_0__.removeGrid)(playerBoard);
    (0,_helpers_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(playerBoard, getBoards.player, "player");
    if (compBoard) {
      (0,_helpers_divBoard__WEBPACK_IMPORTED_MODULE_0__.removeGrid)(compBoard);
      (0,_helpers_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(compBoard, getBoards.comp);
    }
  }
  function announceWinner() {
    body.appendChild(noticeSection);
    winnerNotice.textContent = game.showMessage();
  }
  const gridClickEvent = index => {
    const coord = (0,_helpers_coordinatesHandler__WEBPACK_IMPORTED_MODULE_2__["default"])(index);
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
      grid.addEventListener("click", e => {
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
    const coords = (0,_helpers_coordinatesHandler__WEBPACK_IMPORTED_MODULE_2__["default"])(this);
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
      grid.addEventListener("dragover", event => {
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
    (0,_helpers_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(placeShipBoard, getBoards.player, "player");
    setDragNDropEvents(placeShipBoard);
    main.removeChild(startSection);
    main.appendChild(placeShipSection);
    playerInput.value = "";
  }
  function startBattle(event) {
    event.stopPropagation();
    updateAppBoard();
    (0,_helpers_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(gamePlBoard, getBoards.player, "player");
    (0,_helpers_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(gameCompBoard, getBoards.comp);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (controlDOM);

/***/ }),

/***/ "./src/modules/factories/ai.js":
/*!*************************************!*\
  !*** ./src/modules/factories/ai.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_coordinatesHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/coordinatesHandler */ "./src/modules/helpers/coordinatesHandler.js");

const commanderAI = () => {
  const attackCoordsEntered = [];
  const coordsToFocus = [];
  const adjacentCoords = [];
  let turn = false;
  const checkCoordinates = coords => {
    let entered = false;
    const [x, y] = [...coords];
    const coordsCopy = [];
    attackCoordsEntered.forEach(entry => coordsCopy.push(entry));
    coordsCopy.forEach((entry, i, arr) => {
      const [a, b] = [...entry];
      if (a === x && b === y) {
        entered = true;
        arr.splice(i);
      }
    });
    return entered;
  };
  function getAdjacentCoords() {
    console.log(adjacentCoords);
    return adjacentCoords.pop();
  }
  const enterCoords = (enemyBoard, playerTurn) => {
    console.log(adjacentCoords);
    if (turn === false) return;
    if (attackCoordsEntered.length === 100) return;
    let coords = (0,_helpers_coordinatesHandler__WEBPACK_IMPORTED_MODULE_0__.generateCoords)();
    if (adjacentCoords.length) coords = getAdjacentCoords();
    const entered = checkCoordinates(coords);
    if (!entered) {
      attackCoordsEntered.push(coords);
      enemyBoard(coords);
      turn = false;
      playerTurn();
    } else if (entered) {
      enterCoords(enemyBoard, playerTurn);
    }
  };
  const showTurn = () => turn;
  const startTurn = () => {
    turn = true;
  };
  function generateAdjacentCoords() {
    const [x, y] = [...coordsToFocus[0]];
    if (y + 1 < 10) adjacentCoords.push([x, y + 1]);
    if (x + 1 < 10) adjacentCoords.push([x + 1, y]);
    if (y - 1 >= 0) adjacentCoords.push([x, y - 1]);
    if (x - 1 >= 0) adjacentCoords.push([x - 1, y]);
  }
  function getFeedback(feedback) {
    if (feedback === "hit") {
      coordsToFocus.push(attackCoordsEntered[attackCoordsEntered.length - 1]);
      generateAdjacentCoords();
      coordsToFocus.splice(0);
    }
  }
  return {
    enterCoords,
    showTurn,
    startTurn,
    getFeedback
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (commanderAI);

/***/ }),

/***/ "./src/modules/factories/gameBoard.js":
/*!********************************************!*\
  !*** ./src/modules/factories/gameBoard.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/factories/ship.js");
/* harmony import */ var _helpers_coordinatesHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/coordinatesHandler */ "./src/modules/helpers/coordinatesHandler.js");


const GameBoard = () => {
  const gameBoard = [];
  const commander = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("Commander", 5);
  const battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("Battleship", 4);
  const destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("Destroyer", 3);
  const submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("Submarine", 3);
  const patrolBoat = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("Patrol Boat", 2);
  const placedShip = [];
  let announcement = "";
  for (let i = 0; i < 10; i += 1) {
    const row = [];
    for (let j = 0; j < 10; j += 1) {
      const grid = {
        shot: null
      };
      row.push(grid);
    }
    gameBoard.push(row);
  }
  const showGameBoard = () => {
    const displayedGameboard = [];
    gameBoard.forEach(row => {
      const displayedRow = [];
      row.forEach(grid => {
        const diplayedGrid = {
          ...grid
        };
        displayedRow.push(diplayedGrid);
      });
      displayedGameboard.push(displayedRow);
    });
    return displayedGameboard;
  };
  const spawnCoords = (_ref, axis, shipLength) => {
    let [x, y] = _ref;
    let xAxis = x;
    let yAxis = y;
    const coordinates = [[xAxis, yAxis]];
    if (axis === "x") {
      for (let i = 1; i < shipLength; i += 1) {
        yAxis += 1;
        const nextCoords = [xAxis, yAxis];
        coordinates.push(nextCoords);
      }
    }
    if (axis === "y") {
      for (let i = 1; i < shipLength; i += 1) {
        xAxis += 1;
        const nextCoords = [xAxis, yAxis];
        coordinates.push(nextCoords);
      }
    }
    return coordinates;
  };
  const getShipInOrder = () => {
    let ship;
    switch (placedShip.length) {
      case 1:
        ship = battleship;
        break;
      case 2:
        ship = destroyer;
        break;
      case 3:
        ship = submarine;
        break;
      case 4:
        ship = patrolBoat;
        break;
      default:
        ship = commander;
    }
    return ship;
  };
  const checkCoords = coords => {
    let gridOk;
    coords.forEach((coord, i, arr) => {
      const [x, y] = [...coord];
      switch (true) {
        case x < 0:
          gridOk = false;
          arr.splice(i);
          return;
        case y < 0:
          gridOk = false;
          arr.splice(i);
          return;
        case x > 9:
          gridOk = false;
          arr.splice(i);
          return;
        case y > 9:
          gridOk = false;
          arr.splice(i);
          return;
        default:
          gridOk = true;
      }
      if (gameBoard[x][y].ship) {
        gridOk = false;
        arr.splice(i);
      }
    });
    return gridOk;
  };
  const placeShip = (coord, axis) => {
    if (placedShip.length === 5) return;
    const appropriateShip = getShipInOrder();
    const coordinates = spawnCoords(coord, axis, appropriateShip.getLength());
    const coordsOK = checkCoords(coordinates);
    if (!coordsOK) {
      announcement = "Check coordinates again.";
      return;
    }
    coordinates.forEach(grid => {
      const [x, y] = [...grid];
      gameBoard[x][y].ship = appropriateShip.getName();
    });
    placedShip.push(appropriateShip);
    if (placedShip.length === 5) {
      announcement = "All ships has been placed.";
    } else {
      announcement = `Placed ${appropriateShip.getName()}`;
    }
  };
  const attackShip = shipName => {
    placedShip.forEach(ship => {
      if (ship.getName() === shipName) ship.hit();
    });
  };
  const reportAttackCondition = grid => {
    announcement = grid.shot;
    if (!grid.ship) return;
    const vessel = placedShip.find(ship => ship.getName() === grid.ship);
    if (!vessel.isSunk()) return;
    announcement = `${vessel.getName()} has been sank!`;
    const index = placedShip.findIndex(ship => ship === vessel);
    placedShip.splice(index, 1);
    if (placedShip.length === 0) announcement = `All ships has been sank!`;
  };
  const receiveAttack = coord => {
    const [x, y] = [...coord];
    let attackReceived = true;
    const grid = gameBoard[x][y];
    if (grid.shot !== null) {
      attackReceived = false;
      announcement = "Illegal shot!";
      return attackReceived;
    }
    if (grid.ship) {
      grid.shot = "hit";
      attackShip(grid.ship);
    } else {
      grid.shot = "miss";
    }
    reportAttackCondition(grid);
    return attackReceived;
  };
  const announce = () => announcement;
  function placeShipRandomly() {
    if (announcement === "All ships has been placed.") return;
    const referenceNum = Math.floor(Math.random() * 2);
    const randomAxis = referenceNum === 0 ? "x" : "y";
    placeShip((0,_helpers_coordinatesHandler__WEBPACK_IMPORTED_MODULE_1__.generateCoords)(), randomAxis);
    placeShipRandomly();
  }
  return {
    showGameBoard,
    placeShip,
    receiveAttack,
    announce,
    placeShipRandomly
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);

/***/ }),

/***/ "./src/modules/factories/player.js":
/*!*****************************************!*\
  !*** ./src/modules/factories/player.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Player = name => {
  const playerName = name;
  let turn = true;
  const showName = () => playerName;
  const showTurn = () => turn;
  const attackBoard = (coords, board, enemyTurn) => {
    const notOK = false;
    if (turn === false) return;
    if (board(coords) === notOK) return;
    turn = false;
    enemyTurn();
  };
  const startTurn = () => {
    turn = true;
  };
  return {
    showName,
    showTurn,
    attackBoard,
    startTurn
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/modules/factories/ship.js":
/*!***************************************!*\
  !*** ./src/modules/factories/ship.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = (name, length) => {
  const shipName = name;
  const shipLength = length;
  let hitReceived = 0;
  const hit = function () {
    if (hitReceived === shipLength) return;
    hitReceived += 1;
  };
  const isSunk = () => {
    if (hitReceived === shipLength) return true;
    return false;
  };
  const getLength = () => shipLength;
  const getName = () => shipName;
  return {
    hit,
    isSunk,
    getLength,
    getName
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/gameBoard */ "./src/modules/factories/gameBoard.js");
/* harmony import */ var _factories_ai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/ai */ "./src/modules/factories/ai.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/player */ "./src/modules/factories/player.js");



const Game = () => {
  let player;
  const comp = (0,_factories_ai__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const playerBoard = (0,_factories_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const compBoard = (0,_factories_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  let message;
  let winner;
  let callWinner = false;
  const setPlayer = name => {
    if (player !== undefined) return;
    player = (0,_factories_player__WEBPACK_IMPORTED_MODULE_2__["default"])(name);
  };
  const getGameBoard = () => {
    const gameBoards = {
      player: playerBoard.showGameBoard(),
      comp: compBoard.showGameBoard()
    };
    return gameBoards;
  };
  const playerAttack = coords => {
    if (player.showTurn() === false) return;
    player.attackBoard(coords, compBoard.receiveAttack, comp.startTurn);
    message = compBoard.announce();
    if (message === "All ships has been sank!") winner = player.showName();
  };
  const compAttack = () => {
    if (comp.showTurn() === false) return;
    comp.enterCoords(playerBoard.receiveAttack, player.startTurn);
    message = playerBoard.announce();
    comp.getFeedback(message);
    if (message === "All ships has been sank!") winner = "Commander A.I.";
  };
  const attack = coords => {
    if (winner) return;
    playerAttack(coords);
    if (winner) return;
    compAttack();
  };
  const showMessage = () => {
    if (!message) return null;
    if (winner) {
      if (!callWinner) {
        callWinner = true;
        return message;
      }
      message = `${winner} is the winner!`;
      return message;
    }
    return message;
  };
  function setPlayerShip(coords, axis) {
    playerBoard.placeShip(coords, axis);
    message = playerBoard.announce();
  }
  compBoard.placeShipRandomly();
  return {
    setPlayer,
    getGameBoard,
    attack,
    showMessage,
    setPlayerShip
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/modules/helpers/coordinatesHandler.js":
/*!***************************************************!*\
  !*** ./src/modules/helpers/coordinatesHandler.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "generateCoords": () => (/* binding */ generateCoords)
/* harmony export */ });
const parseGridCoords = index => {
  let x = 0;
  let y = index;
  if (index >= 10) {
    x = Math.floor(index / 10);
    y = index - x * 10;
  }
  return [x, y];
};
const generateCoords = () => {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return [x, y];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseGridCoords);


/***/ }),

/***/ "./src/modules/helpers/divBoard.js":
/*!*****************************************!*\
  !*** ./src/modules/helpers/divBoard.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "removeGrid": () => (/* binding */ removeGrid)
/* harmony export */ });
const createGrid = (coord, player) => {
  const grid = document.createElement('div');
  grid.classList.add('grid');
  if (coord.shot === 'miss') grid.classList.add('miss');
  if (coord.shot === 'hit') grid.classList.add('hit');
  if (player) {
    if (coord.ship) grid.classList.add('ship');
  }
  return grid;
};
const attachDivGrid = (htmlBoard, gameBoard, player) => {
  gameBoard.forEach(row => {
    row.forEach(coord => {
      const grid = createGrid(coord, player);
      htmlBoard.appendChild(grid);
    });
  });
};
const removeGrid = htmlBoard => {
  const grids = htmlBoard.querySelectorAll('div');
  grids.forEach(grid => {
    htmlBoard.removeChild(grid);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (attachDivGrid);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n\n/* color palette\n    #90a3b4\t(144,163,180)\n    #567d9c\t(86,125,156)\n    #0f4162\t(15,65,98)\n    #09273a\t(9,39,58)\n    #1c2641\t(28,38,65)\n    https://www.color-hex.com/color-palette/70772\n\n\n    #99b5c3\t(153,181,195)\n    #4c7e97\t(76,126,151)\n    #00486b\t(0,72,107)\n    #ffffff\t(255,255,255)\n    https://www.color-hex.com/color-palette/69610\n*/\n\nbody {\n  font-size: 16px;\n  display: grid;\n  min-height: 941px;\n  min-width: 657px;\n  width: auto;\n  height: auto;\n  grid-template-rows: 70px 1fr 68px;\n  background-color: #99b5c3;\n  position: relative;\n}\n\nmain {\n  position: relative;\n  min-height: 803px;\n  min-width: 908px;\n}\n\nheader,\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nheader {\n  background-color: #4c7e97;\n}\n\nheader h1 {\n  font-size: 2.6rem;\n  letter-spacing: 2px;\n  color: #99b5c3;\n  text-shadow: 4px 1px black;\n  padding: 4px 8px;\n}\n\nsection {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\nform#player {\n  display: flex;\n  flex-direction: column;\n  margin-top: 76px;\n  row-gap: 28px;\n  align-items: center;\n}\n\nform#player > label {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-size: 1.6rem;\n  font-weight: 700;\n}\n\nlabel input {\n  border-radius: 6px;\n  padding: 2px 6px;\n  text-align: center;\n}\n\nbutton {\n  height: max-content;\n  width: fit-content;\n  padding: 4px 8px;\n  font-weight: 700;\n  border-radius: 8px;\n}\n\nsection#place {\n  align-items: center;\n  padding-top: 20px;\n}\n\nsection#place div#plBoard {\n  grid-template-columns: repeat(10, 30px);\n  grid-template-rows: repeat(10, 30px);\n  margin-top: 30px;\n  gap: 4px;\n}\n\nsection div#plBoard,\nsection div.board {\n  display: grid;\n  gap: 4px;\n  outline: 2px solid black;\n  padding: 2px;\n}\n\ndiv#selection {\n  height: 300px;\n  width: 300px;\n  display: grid;\n  padding-top: 80px;\n  justify-content: center;\n}\n\ndiv#selection > div.shipHolder {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, 30px);\n  grid-template-rows: 30px;\n  gap: 4px;\n  justify-content: center;\n  align-content: center;\n}\n\ndiv#selection > div.shipHolder > div.reference {\n  background-color: #b5b7b8;\n}\n\ndiv#selection > div.shipHolder.axisY {\n  display: grid;\n  grid-template-rows: repeat(auto-fit, 30px);\n  grid-template-columns: 30px;\n}\n\ndiv#selection > div.shipHolder#commander {\n  width: 168px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#commander.axisY {\n  height: 168px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#battleship {\n  width: 134px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#battleship.axisY {\n  height: 133px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#destroyer,\ndiv#selection > div.shipHolder#submarine {\n  width: 100px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#destroyer.axisY,\ndiv#selection > div.shipHolder#submarine.axisY {\n  height: 100px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#patrolBoat {\n  width: 66px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#patrolBoat.axisY {\n  height: 66px;\n  width: 33px;\n}\n\nsection div div.grid {\n  border: 0;\n  outline: 1px solid black;\n  background-color: aqua;\n}\n\nsection div div.grid.ship,\ndiv#selection div div {\n  background-color: #d1d5d6;\n}\n\nsection#game div div.grid.hit {\n  background-color: rgba(255, 0, 0, 0.7);\n}\n\nsection#game div div.grid.miss {\n  background-color: rgba(0, 0, 255, 0.7);\n}\n\nsection#game {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 460px;\n  justify-items: center;\n}\n\n/* section#game \nh2#notice {\n  grid-column: 1 / -1;\n  align-self: center;\n  border: 1px solid rgb(173, 255, 173);\n  width: 500px;\n  height: 80px;\n  border-radius: 10px;\n  background-color: rgb(22, 58, 22);\n  color: rgb(241, 225, 134);\n  font-family: 'Courier New', Courier, monospace;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  letter-spacing: 1px;\n} */\n\nsection#game div.board {\n  margin-top: 140px;\n  grid-template-columns: repeat(10, 28px);\n  grid-template-rows: repeat(10, 28px);\n}\n\nsection#notice {\n  background-color: rgba(255, 254, 254, 0.3);\n  justify-content: center;\n  align-items: center;\n  gap: 30px;\n}\n\nsection.hidden {\n  visibility: hidden;\n}\n\nfooter {\n  background-color: black;\n}\n\nfooter a:hover {\n  filter: drop-shadow(0 0 2px white);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA,2EAA2E;;AAE3E;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,iBAAiB,EAAE,MAAM;EACzB,8BAA8B,EAAE,MAAM;AACxC;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,SAAS;AACX;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,uBAAuB,EAAE,MAAM;EAC/B,SAAS,EAAE,MAAM;EACjB,iBAAiB,EAAE,MAAM;AAC3B;;AAEA;;;EAGE;;AAEF;EACE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,6BAA6B;AAC/B;;AAEA;;;EAGE;;AAEF;EACE,mBAAmB,EAAE,MAAM;EAC3B,0BAA0B,EAAE,MAAM;EAClC,iCAAiC,EAAE,MAAM;AAC3C;;AAEA;;EAEE;;AAEF;;EAEE,mBAAmB;AACrB;;AAEA;;;EAGE;;AAEF;;;EAGE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,cAAc;EACd,cAAc;EACd,kBAAkB;EAClB,wBAAwB;AAC1B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;;;;;EAKE,oBAAoB,EAAE,MAAM;EAC5B,eAAe,EAAE,MAAM;EACvB,iBAAiB,EAAE,MAAM;EACzB,SAAS,EAAE,MAAM;AACnB;;AAEA;;;EAGE;;AAEF;;EAEE,MAAM;EACN,iBAAiB;AACnB;;AAEA;;;EAGE;;AAEF;;EAEE,MAAM;EACN,oBAAoB;AACtB;;AAEA;;EAEE;;AAEF;;;;EAIE,0BAA0B;AAC5B;;AAEA;;EAEE;;AAEF;;;;EAIE,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE;;AAEF;;;;EAIE,8BAA8B;AAChC;;AAEA;;EAEE;;AAEF;EACE,8BAA8B;AAChC;;AAEA;;;;;EAKE;;AAEF;EACE,sBAAsB,EAAE,MAAM;EAC9B,cAAc,EAAE,MAAM;EACtB,cAAc,EAAE,MAAM;EACtB,eAAe,EAAE,MAAM;EACvB,UAAU,EAAE,MAAM;EAClB,mBAAmB,EAAE,MAAM;AAC7B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,sBAAsB,EAAE,MAAM;EAC9B,UAAU,EAAE,MAAM;AACpB;;AAEA;;EAEE;;AAEF;;EAEE,YAAY;AACd;;AAEA;;;EAGE;;AAEF;EACE,6BAA6B,EAAE,MAAM;EACrC,oBAAoB,EAAE,MAAM;AAC9B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;;EAGE;;AAEF;EACE,0BAA0B,EAAE,MAAM;EAClC,aAAa,EAAE,MAAM;AACvB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,aAAa;AACf;;AAEA;;EAEE;;AAEF;EACE,aAAa;AACf;;AAEA;;;;;;;;;;;;;;CAcC;;AAED;EACE,eAAe;EACf,aAAa;EACb,iBAAiB;EACjB,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,iCAAiC;EACjC,yBAAyB;EACzB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;;EAEE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,cAAc;EACd,0BAA0B;EAC1B,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,WAAW;EACX,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,uCAAuC;EACvC,oCAAoC;EACpC,gBAAgB;EAChB,QAAQ;AACV;;AAEA;;EAEE,aAAa;EACb,QAAQ;EACR,wBAAwB;EACxB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,6CAA6C;EAC7C,wBAAwB;EACxB,QAAQ;EACR,uBAAuB;EACvB,qBAAqB;AACvB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,0CAA0C;EAC1C,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;;EAEE,YAAY;EACZ,YAAY;AACd;;AAEA;;EAEE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,SAAS;EACT,wBAAwB;EACxB,sBAAsB;AACxB;;AAEA;;EAEE,yBAAyB;AAC3B;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,yBAAyB;EACzB,qBAAqB;AACvB;;AAEA;;;;;;;;;;;;;;;GAeG;;AAEH;EACE,iBAAiB;EACjB,uCAAuC;EACvC,oCAAoC;AACtC;;AAEA;EACE,0CAA0C;EAC1C,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,kCAAkC;AACpC","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n\n/* color palette\n    #90a3b4\t(144,163,180)\n    #567d9c\t(86,125,156)\n    #0f4162\t(15,65,98)\n    #09273a\t(9,39,58)\n    #1c2641\t(28,38,65)\n    https://www.color-hex.com/color-palette/70772\n\n\n    #99b5c3\t(153,181,195)\n    #4c7e97\t(76,126,151)\n    #00486b\t(0,72,107)\n    #ffffff\t(255,255,255)\n    https://www.color-hex.com/color-palette/69610\n*/\n\nbody {\n  font-size: 16px;\n  display: grid;\n  min-height: 941px;\n  min-width: 657px;\n  width: auto;\n  height: auto;\n  grid-template-rows: 70px 1fr 68px;\n  background-color: #99b5c3;\n  position: relative;\n}\n\nmain {\n  position: relative;\n  min-height: 803px;\n  min-width: 908px;\n}\n\nheader,\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nheader {\n  background-color: #4c7e97;\n}\n\nheader h1 {\n  font-size: 2.6rem;\n  letter-spacing: 2px;\n  color: #99b5c3;\n  text-shadow: 4px 1px black;\n  padding: 4px 8px;\n}\n\nsection {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\nform#player {\n  display: flex;\n  flex-direction: column;\n  margin-top: 76px;\n  row-gap: 28px;\n  align-items: center;\n}\n\nform#player > label {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-size: 1.6rem;\n  font-weight: 700;\n}\n\nlabel input {\n  border-radius: 6px;\n  padding: 2px 6px;\n  text-align: center;\n}\n\nbutton {\n  height: max-content;\n  width: fit-content;\n  padding: 4px 8px;\n  font-weight: 700;\n  border-radius: 8px;\n}\n\nsection#place {\n  align-items: center;\n  padding-top: 20px;\n}\n\nsection#place div#plBoard {\n  grid-template-columns: repeat(10, 30px);\n  grid-template-rows: repeat(10, 30px);\n  margin-top: 30px;\n  gap: 4px;\n}\n\nsection div#plBoard,\nsection div.board {\n  display: grid;\n  gap: 4px;\n  outline: 2px solid black;\n  padding: 2px;\n}\n\ndiv#selection {\n  height: 300px;\n  width: 300px;\n  display: grid;\n  padding-top: 80px;\n  justify-content: center;\n}\n\ndiv#selection > div.shipHolder {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, 30px);\n  grid-template-rows: 30px;\n  gap: 4px;\n  justify-content: center;\n  align-content: center;\n}\n\ndiv#selection > div.shipHolder > div.reference {\n  background-color: #b5b7b8;\n}\n\ndiv#selection > div.shipHolder.axisY {\n  display: grid;\n  grid-template-rows: repeat(auto-fit, 30px);\n  grid-template-columns: 30px;\n}\n\ndiv#selection > div.shipHolder#commander {\n  width: 168px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#commander.axisY {\n  height: 168px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#battleship {\n  width: 134px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#battleship.axisY {\n  height: 133px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#destroyer,\ndiv#selection > div.shipHolder#submarine {\n  width: 100px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#destroyer.axisY,\ndiv#selection > div.shipHolder#submarine.axisY {\n  height: 100px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#patrolBoat {\n  width: 66px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#patrolBoat.axisY {\n  height: 66px;\n  width: 33px;\n}\n\nsection div div.grid {\n  border: 0;\n  outline: 1px solid black;\n  background-color: aqua;\n}\n\nsection div div.grid.ship,\ndiv#selection div div {\n  background-color: #d1d5d6;\n}\n\nsection#game div div.grid.hit {\n  background-color: rgba(255, 0, 0, 0.7);\n}\n\nsection#game div div.grid.miss {\n  background-color: rgba(0, 0, 255, 0.7);\n}\n\nsection#game {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 460px;\n  justify-items: center;\n}\n\n/* section#game \nh2#notice {\n  grid-column: 1 / -1;\n  align-self: center;\n  border: 1px solid rgb(173, 255, 173);\n  width: 500px;\n  height: 80px;\n  border-radius: 10px;\n  background-color: rgb(22, 58, 22);\n  color: rgb(241, 225, 134);\n  font-family: 'Courier New', Courier, monospace;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  letter-spacing: 1px;\n} */\n\nsection#game div.board {\n  margin-top: 140px;\n  grid-template-columns: repeat(10, 28px);\n  grid-template-rows: repeat(10, 28px);\n}\n\nsection#notice {\n  background-color: rgba(255, 254, 254, 0.3);\n  justify-content: center;\n  align-items: center;\n  gap: 30px;\n}\n\nsection.hidden {\n  visibility: hidden;\n}\n\nfooter {\n  background-color: black;\n}\n\nfooter a:hover {\n  filter: drop-shadow(0 0 2px white);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./images/GitHub-Mark-Light-32px.png */ "./src/images/GitHub-Mark-Light-32px.png"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Battleship</title>\n  </head>\n  <body>\n    <header>\n      <h1>Battleship</h1>\n    </header>\n    <main>\n      <section id=\"start\">\n        <form action=\"\" method=\"get\" id=\"player\">\n          <label for=\"pName\">\n            <p>Enter Player Name:</p>\n            <input type=\"text\" name=\"name\" id=\"pName\" required />\n          </label>\n          <button>Start Game!</button>\n        </form>\n      </section>\n      <section id=\"place\" class=\"hidden\">\n        <h2 class=\"notice\">Set your Ships</h2>\n        <button id=\"axis\">Horizontal</button>\n        <div id=\"plBoard\"></div>\n        <div id=\"selection\">\n          <div class=\"shipHolder\" id=\"commander\" draggable=\"true\">\n            <div class=\"grid ship reference\"></div>\n            <div class=\"grid ship\"></div>\n            <div class=\"grid ship\"></div>\n            <div class=\"grid ship\"></div>\n            <div class=\"grid ship\"></div>\n          </div>\n          <div class=\"shipHolder\" id=\"battleship\" draggable=\"true\">\n            <div class=\"grid ship reference\"></div>\n            <div class=\"grid ship\"></div>\n            <div class=\"grid ship\"></div>\n            <div class=\"grid ship\"></div>\n          </div>\n          <div class=\"shipHolder\" id=\"destroyer\" draggable=\"true\">\n            <div class=\"grid ship reference\"></div>\n            <div class=\"grid ship\"></div>\n            <div class=\"grid ship\"></div>\n          </div>\n          <div class=\"shipHolder\" id=\"submarine\" draggable=\"true\">\n            <div class=\"grid ship reference\"></div>\n            <div class=\"grid ship\"></div>\n            <div class=\"grid ship\"></div>\n          </div>\n          <div class=\"shipHolder\" id=\"patrolBoat\" draggable=\"true\">\n            <div class=\"grid ship reference\"></div>\n            <div class=\"grid ship\"></div>\n          </div>\n          <button id=\"battle\">Start battle!</button>\n        </div>\n      </section>\n      <section id=\"game\" class=\"hidden\">\n        <!-- <h2 id=\"notice\">Test transmission...</h2> -->\n        <div id=\"gamePlBoard\" class=\"board\"></div>\n        <div id=\"gameCompBoard\" class=\"board\"></div>\n      </section>\n    </main>\n    <section id=\"notice\" class=\"hidden\">\n      <h2 id=\"announce\">The winner is Player</h2>\n      <button id=\"restart\">Restart</button>\n    </section>\n    <footer>\n      <a href=\"https://github.com/RhazzXIX\">\n        <img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"GitHub\" />\n      </a>\n    </footer>\n  </body>\n</html>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/images/GitHub-Mark-Light-32px.png":
/*!***********************************************!*\
  !*** ./src/images/GitHub-Mark-Light-32px.png ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "266ca63177bca6f330a7.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _modules_DOMcontrol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/DOMcontrol */ "./src/modules/DOMcontrol.js");



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxRQUFRLE9BQU8sTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFFBQVEsUUFBUSxNQUFNLFNBQVMsc0JBQXNCLHFCQUFxQix1QkFBdUIscUJBQXFCLE9BQU8sT0FBTyxNQUFNLE1BQU0sVUFBVSxZQUFZLE9BQU8sT0FBTyxNQUFNLE1BQU0sVUFBVSxZQUFZLE9BQU8sTUFBTSxNQUFNLFFBQVEsWUFBWSxPQUFPLE1BQU0sTUFBTSxRQUFRLFlBQVksV0FBVyxNQUFNLE1BQU0sTUFBTSxRQUFRLFlBQVksT0FBTyxNQUFNLE1BQU0sS0FBSyxZQUFZLE9BQU8sU0FBUyxNQUFNLEtBQUssc0JBQXNCLHFCQUFxQixxQkFBcUIscUJBQXFCLHFCQUFxQix1QkFBdUIsT0FBTyxNQUFNLE1BQU0sS0FBSyxZQUFZLE9BQU8sTUFBTSxNQUFNLEtBQUssVUFBVSxPQUFPLE9BQU8sTUFBTSxNQUFNLHNCQUFzQixxQkFBcUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxVQUFVLE1BQU0sT0FBTyxNQUFNLEtBQUssc0JBQXNCLHVCQUF1QixPQUFPLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxPQUFPLE1BQU0sS0FBSyxzQkFBc0IscUJBQXFCLE9BQU8sS0FBSyxRQUFRLE9BQU8sTUFBTSxLQUFLLFVBQVUsT0FBTyxNQUFNLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxRQUFRLE9BQU8sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sa0JBQWtCLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxNQUFNLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FB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QUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7Ozs7O1dDckJBOzs7Ozs7Ozs7Ozs7OztBQ0FxQjtBQUNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL0RPTWNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9haS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2hlbHBlcnMvY29vcmRpbmF0ZXNIYW5kbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9oZWxwZXJzL2RpdkJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVmYXVsdCBhcyBhdHRhY2hEaXZHcmlkLCByZW1vdmVHcmlkIH0gZnJvbSBcIi4vaGVscGVycy9kaXZCb2FyZFwiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHBhcnNlR3JpZENvb3JkcyBmcm9tIFwiLi9oZWxwZXJzL2Nvb3JkaW5hdGVzSGFuZGxlclwiO1xuXG5jb25zdCBjb250cm9sRE9NID0gKCgpID0+IHtcbiAgLy8gRE9NIG5vZGVzXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICBjb25zdCBtYWluID0gYm9keS5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgY29uc3Qgc3RhcnRTZWN0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbiNzdGFydFwiKTtcbiAgY29uc3QgcGxheWVyRm9ybSA9IHN0YXJ0U2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZm9ybSNwbGF5ZXJcIik7XG4gIGNvbnN0IHBsYXllcklucHV0ID0gcGxheWVyRm9ybS5xdWVyeVNlbGVjdG9yKFwiaW5wdXQjcE5hbWVcIik7XG4gIGNvbnN0IHN0YXJ0QnRuID0gc3RhcnRTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik7XG5cbiAgY29uc3QgcGxhY2VTaGlwU2VjdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcihcInNlY3Rpb24jcGxhY2VcIik7XG4gIGNvbnN0IGF4aXNCdG4gPSBwbGFjZVNoaXBTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24jYXhpc1wiKTtcbiAgY29uc3QgcGxhY2VTaGlwQm9hcmQgPSBwbGFjZVNoaXBTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJkaXYjcGxCb2FyZFwiKTtcbiAgY29uc3Qgc2hpcFNlbGVjdGlvbiA9IHBsYWNlU2hpcFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImRpdiNzZWxlY3Rpb25cIik7XG4gIGNvbnN0IGRvbUNvbW1hbmRlciA9IHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcImRpdiNjb21tYW5kZXJcIik7XG4gIGNvbnN0IGRvbUJhdHRsZXNoaXAgPSBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJkaXYjYmF0dGxlc2hpcFwiKTtcbiAgY29uc3QgZG9tRGVzdHJveWVyID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZGl2I2Rlc3Ryb3llclwiKTtcbiAgY29uc3QgZG9tU3VibWFyaW5lID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZGl2I3N1Ym1hcmluZVwiKTtcbiAgY29uc3QgZG9tUGF0cm9sQm9hdCA9IHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcImRpdiNwYXRyb2xCb2F0XCIpO1xuICBjb25zdCBiYXR0bGVCdG4gPSBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24jYmF0dGxlXCIpO1xuXG4gIGNvbnN0IGdhbWVTZWN0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbiNnYW1lXCIpO1xuICBjb25zdCBnYW1lUGxCb2FyZCA9IGdhbWVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJkaXYjZ2FtZVBsQm9hcmRcIik7XG4gIGNvbnN0IGdhbWVDb21wQm9hcmQgPSBnYW1lU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZGl2I2dhbWVDb21wQm9hcmRcIik7XG5cbiAgY29uc3Qgbm90aWNlU2VjdGlvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihcInNlY3Rpb24jbm90aWNlXCIpO1xuICBjb25zdCB3aW5uZXJOb3RpY2UgPSBub3RpY2VTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJoMiNhbm5vdW5jZVwiKTtcbiAgY29uc3QgcmVzdGFydEJ0biA9IG5vdGljZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImJ1dHRvbiNyZXN0YXJ0XCIpO1xuXG4gIC8vIEluaXRpYWwgTG9hZFxuXG4gIC8vIG1haW4ucmVtb3ZlQ2hpbGQoc3RhcnRTZWN0aW9uKTtcbiAgLy8gc2hpcFNlbGVjdGlvbi5yZW1vdmVDaGlsZChkb21Db21tYW5kZXIpO1xuICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbUJhdHRsZXNoaXApO1xuICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbURlc3Ryb3llcik7XG4gIHNoaXBTZWxlY3Rpb24ucmVtb3ZlQ2hpbGQoZG9tU3VibWFyaW5lKTtcbiAgc2hpcFNlbGVjdGlvbi5yZW1vdmVDaGlsZChkb21QYXRyb2xCb2F0KTtcbiAgc2hpcFNlbGVjdGlvbi5yZW1vdmVDaGlsZChiYXR0bGVCdG4pO1xuICBtYWluLnJlbW92ZUNoaWxkKHBsYWNlU2hpcFNlY3Rpb24pO1xuICBwbGFjZVNoaXBTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIG1haW4ucmVtb3ZlQ2hpbGQoZ2FtZVNlY3Rpb24pO1xuICBnYW1lU2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICBib2R5LnJlbW92ZUNoaWxkKG5vdGljZVNlY3Rpb24pO1xuICBub3RpY2VTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG5cbiAgY29uc3QgZ2FtZSA9IEdhbWUoKTtcbiAgbGV0IGdldEJvYXJkcztcbiAgbGV0IGF4aXMgPSBcInhcIjtcbiAgbGV0IGdhbWVGaW5pc2hlZCA9IGZhbHNlO1xuXG4gIC8vIEZ1bmN0aW9ucyBmb3IgRE9NIGNvbnRyb2xcblxuICBjb25zdCB1cGRhdGVBcHBCb2FyZCA9ICgpID0+IHtcbiAgICBnZXRCb2FyZHMgPSBnYW1lLmdldEdhbWVCb2FyZCgpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGNoYW5nZUF4aXMoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICBheGlzID0gXCJ5XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF4aXMgPSBcInhcIjtcbiAgICB9XG4gICAgaWYgKGF4aXNCdG4udGV4dENvbnRlbnQgPT09IFwiSG9yaXpvbnRhbFwiKSB7XG4gICAgICBheGlzQnRuLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBheGlzQnRuLnRleHRDb250ZW50ID0gXCJIb3Jpem9udGFsXCI7XG4gICAgfVxuICAgIGRvbUNvbW1hbmRlci5jbGFzc0xpc3QudG9nZ2xlKFwiYXhpc1lcIik7XG4gICAgZG9tQmF0dGxlc2hpcC5jbGFzc0xpc3QudG9nZ2xlKFwiYXhpc1lcIik7XG4gICAgZG9tRGVzdHJveWVyLmNsYXNzTGlzdC50b2dnbGUoXCJheGlzWVwiKTtcbiAgICBkb21TdWJtYXJpbmUuY2xhc3NMaXN0LnRvZ2dsZShcImF4aXNZXCIpO1xuICAgIGRvbVBhdHJvbEJvYXQuY2xhc3NMaXN0LnRvZ2dsZShcImF4aXNZXCIpO1xuICAgIGJhdHRsZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiYXhpc1lcIik7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVET01Cb2FyZChwbGF5ZXJCb2FyZCwgY29tcEJvYXJkKSB7XG4gICAgcmVtb3ZlR3JpZChwbGF5ZXJCb2FyZCk7XG4gICAgYXR0YWNoRGl2R3JpZChwbGF5ZXJCb2FyZCwgZ2V0Qm9hcmRzLnBsYXllciwgXCJwbGF5ZXJcIik7XG4gICAgaWYgKGNvbXBCb2FyZCkge1xuICAgICAgcmVtb3ZlR3JpZChjb21wQm9hcmQpO1xuICAgICAgYXR0YWNoRGl2R3JpZChjb21wQm9hcmQsIGdldEJvYXJkcy5jb21wKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhbm5vdW5jZVdpbm5lcigpIHtcbiAgICBib2R5LmFwcGVuZENoaWxkKG5vdGljZVNlY3Rpb24pO1xuICAgIHdpbm5lck5vdGljZS50ZXh0Q29udGVudCA9IGdhbWUuc2hvd01lc3NhZ2UoKTtcbiAgfVxuXG4gIGNvbnN0IGdyaWRDbGlja0V2ZW50ID0gKGluZGV4KSA9PiB7XG4gICAgY29uc3QgY29vcmQgPSBwYXJzZUdyaWRDb29yZHMoaW5kZXgpO1xuICAgIGdhbWUuYXR0YWNrKGNvb3JkKTtcbiAgICB1cGRhdGVBcHBCb2FyZCgpO1xuICAgIHVwZGF0ZURPTUJvYXJkKGdhbWVQbEJvYXJkLCBnYW1lQ29tcEJvYXJkKTtcbiAgICBpZiAoZ2FtZS5zaG93TWVzc2FnZSgpID09PSBcIkFsbCBzaGlwcyBoYXMgYmVlbiBzYW5rIVwiKSB7XG4gICAgICBnYW1lRmluaXNoZWQgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dChhbm5vdW5jZVdpbm5lciwgNTAwKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gYWRkR3JpZENsaWNrRXZlbnQoKSB7XG4gICAgY29uc3QgY29tcEdyaWRzID0gZ2FtZUNvbXBCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2LmdyaWRcIik7XG4gICAgY29tcEdyaWRzLmZvckVhY2goKGdyaWQsIGopID0+IHtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGdyaWRDbGlja0V2ZW50KGopO1xuICAgICAgICBpZiAoIWdhbWVGaW5pc2hlZCkge1xuICAgICAgICAgIGFkZEdyaWRDbGlja0V2ZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlU2hpcFNlbGVjdGlvbigpIHtcbiAgICBpZiAoc2hpcFNlbGVjdGlvbi5jb250YWlucyhkb21Db21tYW5kZXIpKSB7XG4gICAgICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbUNvbW1hbmRlcik7XG4gICAgICBzaGlwU2VsZWN0aW9uLmFwcGVuZENoaWxkKGRvbUJhdHRsZXNoaXApO1xuICAgIH0gZWxzZSBpZiAoc2hpcFNlbGVjdGlvbi5jb250YWlucyhkb21CYXR0bGVzaGlwKSkge1xuICAgICAgc2hpcFNlbGVjdGlvbi5yZW1vdmVDaGlsZChkb21CYXR0bGVzaGlwKTtcbiAgICAgIHNoaXBTZWxlY3Rpb24uYXBwZW5kQ2hpbGQoZG9tRGVzdHJveWVyKTtcbiAgICB9IGVsc2UgaWYgKHNoaXBTZWxlY3Rpb24uY29udGFpbnMoZG9tRGVzdHJveWVyKSkge1xuICAgICAgc2hpcFNlbGVjdGlvbi5yZW1vdmVDaGlsZChkb21EZXN0cm95ZXIpO1xuICAgICAgc2hpcFNlbGVjdGlvbi5hcHBlbmRDaGlsZChkb21TdWJtYXJpbmUpO1xuICAgIH0gZWxzZSBpZiAoc2hpcFNlbGVjdGlvbi5jb250YWlucyhkb21TdWJtYXJpbmUpKSB7XG4gICAgICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbVN1Ym1hcmluZSk7XG4gICAgICBzaGlwU2VsZWN0aW9uLmFwcGVuZENoaWxkKGRvbVBhdHJvbEJvYXQpO1xuICAgIH0gZWxzZSBpZiAoc2hpcFNlbGVjdGlvbi5jb250YWlucyhkb21QYXRyb2xCb2F0KSkge1xuICAgICAgc2hpcFNlbGVjdGlvbi5yZW1vdmVDaGlsZChkb21QYXRyb2xCb2F0KTtcbiAgICAgIHNoaXBTZWxlY3Rpb24uYXBwZW5kQ2hpbGQoYmF0dGxlQnRuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRTaGlwRXZlbnQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGNvb3JkcyA9IHBhcnNlR3JpZENvb3Jkcyh0aGlzKTtcblxuICAgIGdhbWUuc2V0UGxheWVyU2hpcChjb29yZHMsIGF4aXMpO1xuICAgIHVwZGF0ZUFwcEJvYXJkKCk7XG4gICAgaWYgKGdhbWUuc2hvd01lc3NhZ2UoKSAhPT0gXCJDaGVjayBjb29yZGluYXRlcyBhZ2Fpbi5cIikge1xuICAgICAgdG9nZ2xlU2hpcFNlbGVjdGlvbigpO1xuICAgICAgdXBkYXRlRE9NQm9hcmQocGxhY2VTaGlwQm9hcmQpO1xuICAgICAgc2V0RHJhZ05Ecm9wRXZlbnRzKHBsYWNlU2hpcEJvYXJkKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXREcmFnTkRyb3BFdmVudHMocGxCb2FyZCkge1xuICAgIGNvbnN0IHBsR3JpZHMgPSBwbEJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYuZ3JpZFwiKTtcbiAgICBwbEdyaWRzLmZvckVhY2goKGdyaWQsIGluZGV4KSA9PiB7XG4gICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgc2V0U2hpcEV2ZW50LmJpbmQoaW5kZXgpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRHYW1lKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBnYW1lLnNldFBsYXllcihwbGF5ZXJJbnB1dC52YWx1ZSk7XG4gICAgdXBkYXRlQXBwQm9hcmQoKTtcbiAgICBhdHRhY2hEaXZHcmlkKHBsYWNlU2hpcEJvYXJkLCBnZXRCb2FyZHMucGxheWVyLCBcInBsYXllclwiKTtcbiAgICBzZXREcmFnTkRyb3BFdmVudHMocGxhY2VTaGlwQm9hcmQpO1xuICAgIG1haW4ucmVtb3ZlQ2hpbGQoc3RhcnRTZWN0aW9uKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHBsYWNlU2hpcFNlY3Rpb24pO1xuICAgIHBsYXllcklucHV0LnZhbHVlID0gXCJcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0QmF0dGxlKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdXBkYXRlQXBwQm9hcmQoKTtcbiAgICBhdHRhY2hEaXZHcmlkKGdhbWVQbEJvYXJkLCBnZXRCb2FyZHMucGxheWVyLCBcInBsYXllclwiKTtcbiAgICBhdHRhY2hEaXZHcmlkKGdhbWVDb21wQm9hcmQsIGdldEJvYXJkcy5jb21wKTtcbiAgICBhZGRHcmlkQ2xpY2tFdmVudCgpO1xuICAgIG1haW4ucmVtb3ZlQ2hpbGQocGxhY2VTaGlwU2VjdGlvbik7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChnYW1lU2VjdGlvbik7XG4gIH1cblxuICAvLyBFdmVudGxpc3RlbmVyc1xuXG4gIHBsYXllckZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBsb2FkR2FtZSk7XG4gIGF4aXNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZUF4aXMpO1xuICBiYXR0bGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0QmF0dGxlKTtcbiAgcmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSk7XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBjb250cm9sRE9NO1xuIiwiaW1wb3J0IHsgZ2VuZXJhdGVDb29yZHMgfSBmcm9tIFwiLi4vaGVscGVycy9jb29yZGluYXRlc0hhbmRsZXJcIjtcblxuY29uc3QgY29tbWFuZGVyQUkgPSAoKSA9PiB7XG4gIGNvbnN0IGF0dGFja0Nvb3Jkc0VudGVyZWQgPSBbXTtcbiAgY29uc3QgY29vcmRzVG9Gb2N1cyA9IFtdO1xuICBjb25zdCBhZGphY2VudENvb3JkcyA9IFtdO1xuICBsZXQgdHVybiA9IGZhbHNlO1xuXG4gIGNvbnN0IGNoZWNrQ29vcmRpbmF0ZXMgPSAoY29vcmRzKSA9PiB7XG4gICAgbGV0IGVudGVyZWQgPSBmYWxzZTtcbiAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRzXTtcbiAgICBjb25zdCBjb29yZHNDb3B5ID0gW107XG4gICAgYXR0YWNrQ29vcmRzRW50ZXJlZC5mb3JFYWNoKChlbnRyeSkgPT4gY29vcmRzQ29weS5wdXNoKGVudHJ5KSk7XG4gICAgY29vcmRzQ29weS5mb3JFYWNoKChlbnRyeSwgaSwgYXJyKSA9PiB7XG4gICAgICBjb25zdCBbYSwgYl0gPSBbLi4uZW50cnldO1xuICAgICAgaWYgKGEgPT09IHggJiYgYiA9PT0geSkge1xuICAgICAgICBlbnRlcmVkID0gdHJ1ZTtcbiAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRlcmVkO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGdldEFkamFjZW50Q29vcmRzKCkge1xuICAgIGNvbnNvbGUubG9nKGFkamFjZW50Q29vcmRzKTtcbiAgICByZXR1cm4gYWRqYWNlbnRDb29yZHMucG9wKCk7XG4gIH1cblxuICBjb25zdCBlbnRlckNvb3JkcyA9IChlbmVteUJvYXJkLCBwbGF5ZXJUdXJuKSA9PiB7XG4gICAgY29uc29sZS5sb2coYWRqYWNlbnRDb29yZHMpO1xuICAgIGlmICh0dXJuID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIGlmIChhdHRhY2tDb29yZHNFbnRlcmVkLmxlbmd0aCA9PT0gMTAwKSByZXR1cm47XG4gICAgbGV0IGNvb3JkcyA9IGdlbmVyYXRlQ29vcmRzKCk7XG4gICAgaWYgKGFkamFjZW50Q29vcmRzLmxlbmd0aCkgY29vcmRzID0gZ2V0QWRqYWNlbnRDb29yZHMoKTtcbiAgICBjb25zdCBlbnRlcmVkID0gY2hlY2tDb29yZGluYXRlcyhjb29yZHMpO1xuICAgIGlmICghZW50ZXJlZCkge1xuICAgICAgYXR0YWNrQ29vcmRzRW50ZXJlZC5wdXNoKGNvb3Jkcyk7XG4gICAgICBlbmVteUJvYXJkKGNvb3Jkcyk7XG4gICAgICB0dXJuID0gZmFsc2U7XG4gICAgICBwbGF5ZXJUdXJuKCk7XG4gICAgfSBlbHNlIGlmIChlbnRlcmVkKSB7XG4gICAgICBlbnRlckNvb3JkcyhlbmVteUJvYXJkLCBwbGF5ZXJUdXJuKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2hvd1R1cm4gPSAoKSA9PiB0dXJuO1xuXG4gIGNvbnN0IHN0YXJ0VHVybiA9ICgpID0+IHtcbiAgICB0dXJuID0gdHJ1ZTtcbiAgfTtcblxuICBmdW5jdGlvbiBnZW5lcmF0ZUFkamFjZW50Q29vcmRzKCkge1xuICAgIGNvbnN0IFt4LCB5XSA9IFsuLi5jb29yZHNUb0ZvY3VzWzBdXTtcbiAgICBpZiAoeSArIDEgPCAxMCkgYWRqYWNlbnRDb29yZHMucHVzaChbeCwgeSArIDFdKTtcbiAgICBpZiAoeCArIDEgPCAxMCkgYWRqYWNlbnRDb29yZHMucHVzaChbeCArIDEsIHldKTtcbiAgICBpZiAoeSAtIDEgPj0gMCkgYWRqYWNlbnRDb29yZHMucHVzaChbeCwgeSAtIDFdKTtcbiAgICBpZiAoeCAtIDEgPj0gMCkgYWRqYWNlbnRDb29yZHMucHVzaChbeCAtIDEsIHldKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZlZWRiYWNrKGZlZWRiYWNrKSB7XG4gICAgaWYgKGZlZWRiYWNrID09PSBcImhpdFwiKSB7XG4gICAgICBjb29yZHNUb0ZvY3VzLnB1c2goYXR0YWNrQ29vcmRzRW50ZXJlZFthdHRhY2tDb29yZHNFbnRlcmVkLmxlbmd0aCAtIDFdKTtcbiAgICAgIGdlbmVyYXRlQWRqYWNlbnRDb29yZHMoKTtcbiAgICAgIGNvb3Jkc1RvRm9jdXMuc3BsaWNlKDApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGVudGVyQ29vcmRzLCBzaG93VHVybiwgc3RhcnRUdXJuLCBnZXRGZWVkYmFjayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZGVyQUk7XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZUNvb3JkcyB9IGZyb20gXCIuLi9oZWxwZXJzL2Nvb3JkaW5hdGVzSGFuZGxlclwiO1xuXG5jb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IFtdO1xuXG4gIGNvbnN0IGNvbW1hbmRlciA9IFNoaXAoXCJDb21tYW5kZXJcIiwgNSk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKFwiQmF0dGxlc2hpcFwiLCA0KTtcbiAgY29uc3QgZGVzdHJveWVyID0gU2hpcChcIkRlc3Ryb3llclwiLCAzKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gU2hpcChcIlN1Ym1hcmluZVwiLCAzKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IFNoaXAoXCJQYXRyb2wgQm9hdFwiLCAyKTtcblxuICBjb25zdCBwbGFjZWRTaGlwID0gW107XG5cbiAgbGV0IGFubm91bmNlbWVudCA9IFwiXCI7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgY29uc3Qgcm93ID0gW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICBjb25zdCBncmlkID0geyBzaG90OiBudWxsIH07XG4gICAgICByb3cucHVzaChncmlkKTtcbiAgICB9XG4gICAgZ2FtZUJvYXJkLnB1c2gocm93KTtcbiAgfVxuXG4gIGNvbnN0IHNob3dHYW1lQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheWVkR2FtZWJvYXJkID0gW107XG4gICAgZ2FtZUJvYXJkLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgY29uc3QgZGlzcGxheWVkUm93ID0gW107XG4gICAgICByb3cuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICBjb25zdCBkaXBsYXllZEdyaWQgPSB7IC4uLmdyaWQgfTtcbiAgICAgICAgZGlzcGxheWVkUm93LnB1c2goZGlwbGF5ZWRHcmlkKTtcbiAgICAgIH0pO1xuICAgICAgZGlzcGxheWVkR2FtZWJvYXJkLnB1c2goZGlzcGxheWVkUm93KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGlzcGxheWVkR2FtZWJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IHNwYXduQ29vcmRzID0gKFt4LCB5XSwgYXhpcywgc2hpcExlbmd0aCkgPT4ge1xuICAgIGxldCB4QXhpcyA9IHg7XG4gICAgbGV0IHlBeGlzID0geTtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtbeEF4aXMsIHlBeGlzXV07XG4gICAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXBMZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB5QXhpcyArPSAxO1xuICAgICAgICBjb25zdCBuZXh0Q29vcmRzID0gW3hBeGlzLCB5QXhpc107XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2gobmV4dENvb3Jkcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChheGlzID09PSBcInlcIikge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwTGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgeEF4aXMgKz0gMTtcbiAgICAgICAgY29uc3QgbmV4dENvb3JkcyA9IFt4QXhpcywgeUF4aXNdO1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKG5leHRDb29yZHMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcEluT3JkZXIgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXA7XG4gICAgc3dpdGNoIChwbGFjZWRTaGlwLmxlbmd0aCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBzaGlwID0gYmF0dGxlc2hpcDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHNoaXAgPSBkZXN0cm95ZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBzaGlwID0gc3VibWFyaW5lO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgc2hpcCA9IHBhdHJvbEJvYXQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc2hpcCA9IGNvbW1hbmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hpcDtcbiAgfTtcblxuICBjb25zdCBjaGVja0Nvb3JkcyA9IChjb29yZHMpID0+IHtcbiAgICBsZXQgZ3JpZE9rO1xuICAgIGNvb3Jkcy5mb3JFYWNoKChjb29yZCwgaSwgYXJyKSA9PiB7XG4gICAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRdO1xuICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgeCA8IDA6XG4gICAgICAgICAgZ3JpZE9rID0gZmFsc2U7XG4gICAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgeSA8IDA6XG4gICAgICAgICAgZ3JpZE9rID0gZmFsc2U7XG4gICAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgeCA+IDk6XG4gICAgICAgICAgZ3JpZE9rID0gZmFsc2U7XG4gICAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgeSA+IDk6XG4gICAgICAgICAgZ3JpZE9rID0gZmFsc2U7XG4gICAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZ3JpZE9rID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChnYW1lQm9hcmRbeF1beV0uc2hpcCkge1xuICAgICAgICBncmlkT2sgPSBmYWxzZTtcbiAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZ3JpZE9rO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChjb29yZCwgYXhpcykgPT4ge1xuICAgIGlmIChwbGFjZWRTaGlwLmxlbmd0aCA9PT0gNSkgcmV0dXJuO1xuICAgIGNvbnN0IGFwcHJvcHJpYXRlU2hpcCA9IGdldFNoaXBJbk9yZGVyKCk7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBzcGF3bkNvb3Jkcyhjb29yZCwgYXhpcywgYXBwcm9wcmlhdGVTaGlwLmdldExlbmd0aCgpKTtcbiAgICBjb25zdCBjb29yZHNPSyA9IGNoZWNrQ29vcmRzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoIWNvb3Jkc09LKSB7XG4gICAgICBhbm5vdW5jZW1lbnQgPSBcIkNoZWNrIGNvb3JkaW5hdGVzIGFnYWluLlwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBjb25zdCBbeCwgeV0gPSBbLi4uZ3JpZF07XG4gICAgICBnYW1lQm9hcmRbeF1beV0uc2hpcCA9IGFwcHJvcHJpYXRlU2hpcC5nZXROYW1lKCk7XG4gICAgfSk7XG5cbiAgICBwbGFjZWRTaGlwLnB1c2goYXBwcm9wcmlhdGVTaGlwKTtcbiAgICBpZiAocGxhY2VkU2hpcC5sZW5ndGggPT09IDUpIHtcbiAgICAgIGFubm91bmNlbWVudCA9IFwiQWxsIHNoaXBzIGhhcyBiZWVuIHBsYWNlZC5cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgYW5ub3VuY2VtZW50ID0gYFBsYWNlZCAke2FwcHJvcHJpYXRlU2hpcC5nZXROYW1lKCl9YDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrU2hpcCA9IChzaGlwTmFtZSkgPT4ge1xuICAgIHBsYWNlZFNoaXAuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuZ2V0TmFtZSgpID09PSBzaGlwTmFtZSkgc2hpcC5oaXQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByZXBvcnRBdHRhY2tDb25kaXRpb24gPSAoZ3JpZCkgPT4ge1xuICAgIGFubm91bmNlbWVudCA9IGdyaWQuc2hvdDtcbiAgICBpZiAoIWdyaWQuc2hpcCkgcmV0dXJuO1xuICAgIGNvbnN0IHZlc3NlbCA9IHBsYWNlZFNoaXAuZmluZCgoc2hpcCkgPT4gc2hpcC5nZXROYW1lKCkgPT09IGdyaWQuc2hpcCk7XG4gICAgaWYgKCF2ZXNzZWwuaXNTdW5rKCkpIHJldHVybjtcbiAgICBhbm5vdW5jZW1lbnQgPSBgJHt2ZXNzZWwuZ2V0TmFtZSgpfSBoYXMgYmVlbiBzYW5rIWA7XG4gICAgY29uc3QgaW5kZXggPSBwbGFjZWRTaGlwLmZpbmRJbmRleCgoc2hpcCkgPT4gc2hpcCA9PT0gdmVzc2VsKTtcbiAgICBwbGFjZWRTaGlwLnNwbGljZShpbmRleCwgMSk7XG4gICAgaWYgKHBsYWNlZFNoaXAubGVuZ3RoID09PSAwKSBhbm5vdW5jZW1lbnQgPSBgQWxsIHNoaXBzIGhhcyBiZWVuIHNhbmshYDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkKSA9PiB7XG4gICAgY29uc3QgW3gsIHldID0gWy4uLmNvb3JkXTtcbiAgICBsZXQgYXR0YWNrUmVjZWl2ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGdyaWQgPSBnYW1lQm9hcmRbeF1beV07XG4gICAgaWYgKGdyaWQuc2hvdCAhPT0gbnVsbCkge1xuICAgICAgYXR0YWNrUmVjZWl2ZWQgPSBmYWxzZTtcbiAgICAgIGFubm91bmNlbWVudCA9IFwiSWxsZWdhbCBzaG90IVwiO1xuICAgICAgcmV0dXJuIGF0dGFja1JlY2VpdmVkO1xuICAgIH1cbiAgICBpZiAoZ3JpZC5zaGlwKSB7XG4gICAgICBncmlkLnNob3QgPSBcImhpdFwiO1xuICAgICAgYXR0YWNrU2hpcChncmlkLnNoaXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmlkLnNob3QgPSBcIm1pc3NcIjtcbiAgICB9XG4gICAgcmVwb3J0QXR0YWNrQ29uZGl0aW9uKGdyaWQpO1xuICAgIHJldHVybiBhdHRhY2tSZWNlaXZlZDtcbiAgfTtcblxuICBjb25zdCBhbm5vdW5jZSA9ICgpID0+IGFubm91bmNlbWVudDtcblxuICBmdW5jdGlvbiBwbGFjZVNoaXBSYW5kb21seSgpIHtcbiAgICBpZiAoYW5ub3VuY2VtZW50ID09PSBcIkFsbCBzaGlwcyBoYXMgYmVlbiBwbGFjZWQuXCIpIHJldHVybjtcbiAgICBjb25zdCByZWZlcmVuY2VOdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICBjb25zdCByYW5kb21BeGlzID0gcmVmZXJlbmNlTnVtID09PSAwID8gXCJ4XCIgOiBcInlcIjtcbiAgICBwbGFjZVNoaXAoZ2VuZXJhdGVDb29yZHMoKSwgcmFuZG9tQXhpcyk7XG4gICAgcGxhY2VTaGlwUmFuZG9tbHkoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2hvd0dhbWVCb2FyZCxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBhbm5vdW5jZSxcbiAgICBwbGFjZVNoaXBSYW5kb21seSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVCb2FyZDtcbiIsImNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuXG4gIGxldCB0dXJuID0gdHJ1ZTtcblxuICBjb25zdCBzaG93TmFtZSA9ICgpID0+IHBsYXllck5hbWU7XG5cbiAgY29uc3Qgc2hvd1R1cm4gPSAoKSA9PiB0dXJuO1xuXG4gIGNvbnN0IGF0dGFja0JvYXJkID0gKGNvb3JkcywgYm9hcmQsIGVuZW15VHVybikgPT4ge1xuICAgIGNvbnN0IG5vdE9LID0gZmFsc2U7XG4gICAgaWYgKHR1cm4gPT09IGZhbHNlKSByZXR1cm47XG4gICAgaWYgKGJvYXJkKGNvb3JkcykgPT09IG5vdE9LKSByZXR1cm47XG4gICAgdHVybiA9IGZhbHNlO1xuICAgIGVuZW15VHVybigpO1xuICB9O1xuXG4gIGNvbnN0IHN0YXJ0VHVybiA9ICgpID0+IHtcbiAgICB0dXJuID0gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4geyBzaG93TmFtZSwgc2hvd1R1cm4sIGF0dGFja0JvYXJkLCBzdGFydFR1cm4gfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IFNoaXAgPSAobmFtZSwgbGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBOYW1lID0gbmFtZTtcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgbGV0IGhpdFJlY2VpdmVkID0gMDtcbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChoaXRSZWNlaXZlZCA9PT0gc2hpcExlbmd0aCkgcmV0dXJuO1xuICAgIGhpdFJlY2VpdmVkICs9IDE7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZiAoaGl0UmVjZWl2ZWQgPT09IHNoaXBMZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gc2hpcExlbmd0aDtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHNoaXBOYW1lO1xuXG4gIHJldHVybiB7IGhpdCwgaXNTdW5rLCBnZXRMZW5ndGgsIGdldE5hbWUgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gXCIuL2ZhY3Rvcmllcy9nYW1lQm9hcmRcIjtcbmltcG9ydCBjb21tYW5kZXJBSSBmcm9tIFwiLi9mYWN0b3JpZXMvYWlcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vZmFjdG9yaWVzL3BsYXllclwiO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICBsZXQgcGxheWVyO1xuICBjb25zdCBjb21wID0gY29tbWFuZGVyQUkoKTtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgY29uc3QgY29tcEJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIGxldCBtZXNzYWdlO1xuICBsZXQgd2lubmVyO1xuICBsZXQgY2FsbFdpbm5lciA9IGZhbHNlO1xuXG4gIGNvbnN0IHNldFBsYXllciA9IChuYW1lKSA9PiB7XG4gICAgaWYgKHBsYXllciAhPT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgcGxheWVyID0gUGxheWVyKG5hbWUpO1xuICB9O1xuXG4gIGNvbnN0IGdldEdhbWVCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBnYW1lQm9hcmRzID0ge1xuICAgICAgcGxheWVyOiBwbGF5ZXJCb2FyZC5zaG93R2FtZUJvYXJkKCksXG4gICAgICBjb21wOiBjb21wQm9hcmQuc2hvd0dhbWVCb2FyZCgpLFxuICAgIH07XG4gICAgcmV0dXJuIGdhbWVCb2FyZHM7XG4gIH07XG5cbiAgY29uc3QgcGxheWVyQXR0YWNrID0gKGNvb3JkcykgPT4ge1xuICAgIGlmIChwbGF5ZXIuc2hvd1R1cm4oKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICBwbGF5ZXIuYXR0YWNrQm9hcmQoY29vcmRzLCBjb21wQm9hcmQucmVjZWl2ZUF0dGFjaywgY29tcC5zdGFydFR1cm4pO1xuICAgIG1lc3NhZ2UgPSBjb21wQm9hcmQuYW5ub3VuY2UoKTtcbiAgICBpZiAobWVzc2FnZSA9PT0gXCJBbGwgc2hpcHMgaGFzIGJlZW4gc2FuayFcIikgd2lubmVyID0gcGxheWVyLnNob3dOYW1lKCk7XG4gIH07XG5cbiAgY29uc3QgY29tcEF0dGFjayA9ICgpID0+IHtcbiAgICBpZiAoY29tcC5zaG93VHVybigpID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIGNvbXAuZW50ZXJDb29yZHMocGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjaywgcGxheWVyLnN0YXJ0VHVybik7XG4gICAgbWVzc2FnZSA9IHBsYXllckJvYXJkLmFubm91bmNlKCk7XG4gICAgY29tcC5nZXRGZWVkYmFjayhtZXNzYWdlKTtcbiAgICBpZiAobWVzc2FnZSA9PT0gXCJBbGwgc2hpcHMgaGFzIGJlZW4gc2FuayFcIikgd2lubmVyID0gXCJDb21tYW5kZXIgQS5JLlwiO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICBpZiAod2lubmVyKSByZXR1cm47XG4gICAgcGxheWVyQXR0YWNrKGNvb3Jkcyk7XG4gICAgaWYgKHdpbm5lcikgcmV0dXJuO1xuICAgIGNvbXBBdHRhY2soKTtcbiAgfTtcblxuICBjb25zdCBzaG93TWVzc2FnZSA9ICgpID0+IHtcbiAgICBpZiAoIW1lc3NhZ2UpIHJldHVybiBudWxsO1xuICAgIGlmICh3aW5uZXIpIHtcbiAgICAgIGlmICghY2FsbFdpbm5lcikge1xuICAgICAgICBjYWxsV2lubmVyID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG4gICAgICBtZXNzYWdlID0gYCR7d2lubmVyfSBpcyB0aGUgd2lubmVyIWA7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfTtcblxuICBmdW5jdGlvbiBzZXRQbGF5ZXJTaGlwKGNvb3JkcywgYXhpcykge1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChjb29yZHMsIGF4aXMpO1xuICAgIG1lc3NhZ2UgPSBwbGF5ZXJCb2FyZC5hbm5vdW5jZSgpO1xuICB9XG5cbiAgY29tcEJvYXJkLnBsYWNlU2hpcFJhbmRvbWx5KCk7XG5cbiAgcmV0dXJuIHsgc2V0UGxheWVyLCBnZXRHYW1lQm9hcmQsIGF0dGFjaywgc2hvd01lc3NhZ2UsIHNldFBsYXllclNoaXAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjb25zdCBwYXJzZUdyaWRDb29yZHMgPSAoaW5kZXgpID0+IHtcbiAgbGV0IHggPSAwO1xuICBsZXQgeSA9IGluZGV4O1xuXG4gIGlmIChpbmRleCA+PSAxMCkge1xuICAgIHggPSBNYXRoLmZsb29yKGluZGV4IC8gMTApO1xuICAgIHkgPSBpbmRleCAtIHggKiAxMDtcbiAgfVxuICByZXR1cm4gW3gsIHldO1xufTtcblxuXG5jb25zdCBnZW5lcmF0ZUNvb3JkcyA9ICgpID0+IHtcbiAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgcmV0dXJuIFt4LCB5XTtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VHcmlkQ29vcmRzO1xuZXhwb3J0IHsgZ2VuZXJhdGVDb29yZHMgfVxuIiwiXG5cbmNvbnN0IGNyZWF0ZUdyaWQgPSAoY29vcmQsIHBsYXllcikgPT4ge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGdyaWQuY2xhc3NMaXN0LmFkZCgnZ3JpZCcpXG4gIGlmIChjb29yZC5zaG90ID09PSAnbWlzcycpIGdyaWQuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICBpZiAoY29vcmQuc2hvdCA9PT0gJ2hpdCcpIGdyaWQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gIGlmIChwbGF5ZXIpIHtcbiAgICBpZiAoY29vcmQuc2hpcCkgZ3JpZC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gIH1cblxuICByZXR1cm4gZ3JpZFxufVxuXG5jb25zdCBhdHRhY2hEaXZHcmlkID0gKGh0bWxCb2FyZCwgZ2FtZUJvYXJkLCBwbGF5ZXIpID0+IHtcbiAgZ2FtZUJvYXJkLmZvckVhY2gocm93ID0+IHtcbiAgICByb3cuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBjb25zdCBncmlkID0gY3JlYXRlR3JpZChjb29yZCwgcGxheWVyKTtcbiAgICAgIGh0bWxCb2FyZC5hcHBlbmRDaGlsZChncmlkKTtcbiAgICB9KVxuICB9KVxuXG59XG5cbmNvbnN0IHJlbW92ZUdyaWQgPSAoaHRtbEJvYXJkKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gaHRtbEJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpO1xuICBncmlkcy5mb3JFYWNoKGdyaWQgPT4ge1xuICAgIGh0bWxCb2FyZC5yZW1vdmVDaGlsZChncmlkKTtcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXR0YWNoRGl2R3JpZDtcbmV4cG9ydCB7IHJlbW92ZUdyaWQgIH0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG5cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbn1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXG4gKi9cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxufVxcblxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0IHtcXG4gIC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uLFxcbnNlbGVjdCB7XFxuICAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxuICovXFxuXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIE1pc2NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZW1wbGF0ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKiBjb2xvciBwYWxldHRlXFxuICAgICM5MGEzYjRcXHQoMTQ0LDE2MywxODApXFxuICAgICM1NjdkOWNcXHQoODYsMTI1LDE1NilcXG4gICAgIzBmNDE2MlxcdCgxNSw2NSw5OClcXG4gICAgIzA5MjczYVxcdCg5LDM5LDU4KVxcbiAgICAjMWMyNjQxXFx0KDI4LDM4LDY1KVxcbiAgICBodHRwczovL3d3dy5jb2xvci1oZXguY29tL2NvbG9yLXBhbGV0dGUvNzA3NzJcXG5cXG5cXG4gICAgIzk5YjVjM1xcdCgxNTMsMTgxLDE5NSlcXG4gICAgIzRjN2U5N1xcdCg3NiwxMjYsMTUxKVxcbiAgICAjMDA0ODZiXFx0KDAsNzIsMTA3KVxcbiAgICAjZmZmZmZmXFx0KDI1NSwyNTUsMjU1KVxcbiAgICBodHRwczovL3d3dy5jb2xvci1oZXguY29tL2NvbG9yLXBhbGV0dGUvNjk2MTBcXG4qL1xcblxcbmJvZHkge1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIG1pbi1oZWlnaHQ6IDk0MXB4O1xcbiAgbWluLXdpZHRoOiA2NTdweDtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA3MHB4IDFmciA2OHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk5YjVjMztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxubWFpbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtaW4taGVpZ2h0OiA4MDNweDtcXG4gIG1pbi13aWR0aDogOTA4cHg7XFxufVxcblxcbmhlYWRlcixcXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0YzdlOTc7XFxufVxcblxcbmhlYWRlciBoMSB7XFxuICBmb250LXNpemU6IDIuNnJlbTtcXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XFxuICBjb2xvcjogIzk5YjVjMztcXG4gIHRleHQtc2hhZG93OiA0cHggMXB4IGJsYWNrO1xcbiAgcGFkZGluZzogNHB4IDhweDtcXG59XFxuXFxuc2VjdGlvbiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG5mb3JtI3BsYXllciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1hcmdpbi10b3A6IDc2cHg7XFxuICByb3ctZ2FwOiAyOHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuZm9ybSNwbGF5ZXIgPiBsYWJlbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuNnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbmxhYmVsIGlucHV0IHtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHBhZGRpbmc6IDJweCA2cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBoZWlnaHQ6IG1heC1jb250ZW50O1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogNHB4IDhweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbnNlY3Rpb24jcGxhY2Uge1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmctdG9wOiAyMHB4O1xcbn1cXG5cXG5zZWN0aW9uI3BsYWNlIGRpdiNwbEJvYXJkIHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBnYXA6IDRweDtcXG59XFxuXFxuc2VjdGlvbiBkaXYjcGxCb2FyZCxcXG5zZWN0aW9uIGRpdi5ib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA0cHg7XFxuICBvdXRsaW5lOiAycHggc29saWQgYmxhY2s7XFxuICBwYWRkaW5nOiAycHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24ge1xcbiAgaGVpZ2h0OiAzMDBweDtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwYWRkaW5nLXRvcDogODBweDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCAzMHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMzBweDtcXG4gIGdhcDogNHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciA+IGRpdi5yZWZlcmVuY2Uge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I1YjdiODtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyLmF4aXNZIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdChhdXRvLWZpdCwgMzBweCk7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNjb21tYW5kZXIge1xcbiAgd2lkdGg6IDE2OHB4O1xcbiAgaGVpZ2h0OiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjY29tbWFuZGVyLmF4aXNZIHtcXG4gIGhlaWdodDogMTY4cHg7XFxuICB3aWR0aDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2JhdHRsZXNoaXAge1xcbiAgd2lkdGg6IDEzNHB4O1xcbiAgaGVpZ2h0OiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjYmF0dGxlc2hpcC5heGlzWSB7XFxuICBoZWlnaHQ6IDEzM3B4O1xcbiAgd2lkdGg6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNkZXN0cm95ZXIsXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI3N1Ym1hcmluZSB7XFxuICB3aWR0aDogMTAwcHg7XFxuICBoZWlnaHQ6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNkZXN0cm95ZXIuYXhpc1ksXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI3N1Ym1hcmluZS5heGlzWSB7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgd2lkdGg6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNwYXRyb2xCb2F0IHtcXG4gIHdpZHRoOiA2NnB4O1xcbiAgaGVpZ2h0OiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjcGF0cm9sQm9hdC5heGlzWSB7XFxuICBoZWlnaHQ6IDY2cHg7XFxuICB3aWR0aDogMzNweDtcXG59XFxuXFxuc2VjdGlvbiBkaXYgZGl2LmdyaWQge1xcbiAgYm9yZGVyOiAwO1xcbiAgb3V0bGluZTogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcXG59XFxuXFxuc2VjdGlvbiBkaXYgZGl2LmdyaWQuc2hpcCxcXG5kaXYjc2VsZWN0aW9uIGRpdiBkaXYge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2QxZDVkNjtcXG59XFxuXFxuc2VjdGlvbiNnYW1lIGRpdiBkaXYuZ3JpZC5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDAuNyk7XFxufVxcblxcbnNlY3Rpb24jZ2FtZSBkaXYgZGl2LmdyaWQubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDI1NSwgMC43KTtcXG59XFxuXFxuc2VjdGlvbiNnYW1lIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDQ2MHB4O1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4vKiBzZWN0aW9uI2dhbWUgXFxuaDIjbm90aWNlIHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTczLCAyNTUsIDE3Myk7XFxuICB3aWR0aDogNTAwcHg7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyLCA1OCwgMjIpO1xcbiAgY29sb3I6IHJnYigyNDEsIDIyNSwgMTM0KTtcXG4gIGZvbnQtZmFtaWx5OiAnQ291cmllciBOZXcnLCBDb3VyaWVyLCBtb25vc3BhY2U7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcXG59ICovXFxuXFxuc2VjdGlvbiNnYW1lIGRpdi5ib2FyZCB7XFxuICBtYXJnaW4tdG9wOiAxNDBweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyOHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAyOHB4KTtcXG59XFxuXFxuc2VjdGlvbiNub3RpY2Uge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NCwgMjU0LCAwLjMpO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAzMHB4O1xcbn1cXG5cXG5zZWN0aW9uLmhpZGRlbiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuZm9vdGVyIGE6aG92ZXIge1xcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDAgMnB4IHdoaXRlKTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwyRUFBMkU7O0FBRTNFOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsaUJBQWlCLEVBQUUsTUFBTTtFQUN6Qiw4QkFBOEIsRUFBRSxNQUFNO0FBQ3hDOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSx1QkFBdUIsRUFBRSxNQUFNO0VBQy9CLFNBQVMsRUFBRSxNQUFNO0VBQ2pCLGlCQUFpQixFQUFF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LFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBOztFQUVFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztBQUNiOztBQUVBO0VBQ0UsU0FBUztFQUNULHdCQUF3QjtFQUN4QixzQkFBc0I7QUFDeEI7O0FBRUE7O0VBRUUseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0Usc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0Usc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5Qix5QkFBeUI7RUFDekIscUJBQXFCO0FBQ3ZCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7QUFFSDtFQUNFLGlCQUFpQjtFQUNqQix1Q0FBdUM7RUFDdkMsb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsMENBQTBDO0VBQzFDLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0Usa0NBQWtDO0FBQ3BDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG5cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbn1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXG4gKi9cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxufVxcblxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0IHtcXG4gIC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uLFxcbnNlbGVjdCB7XFxuICAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxuICovXFxuXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIE1pc2NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZW1wbGF0ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKiBjb2xvciBwYWxldHRlXFxuICAgICM5MGEzYjRcXHQoMTQ0LDE2MywxODApXFxuICAgICM1NjdkOWNcXHQoODYsMTI1LDE1NilcXG4gICAgIzBmNDE2MlxcdCgxNSw2NSw5OClcXG4gICAgIzA5MjczYVxcdCg5LDM5LDU4KVxcbiAgICAjMWMyNjQxXFx0KDI4LDM4LDY1KVxcbiAgICBodHRwczovL3d3dy5jb2xvci1oZXguY29tL2NvbG9yLXBhbGV0dGUvNzA3NzJcXG5cXG5cXG4gICAgIzk5YjVjM1xcdCgxNTMsMTgxLDE5NSlcXG4gICAgIzRjN2U5N1xcdCg3NiwxMjYsMTUxKVxcbiAgICAjMDA0ODZiXFx0KDAsNzIsMTA3KVxcbiAgICAjZmZmZmZmXFx0KDI1NSwyNTUsMjU1KVxcbiAgICBodHRwczovL3d3dy5jb2xvci1oZXguY29tL2NvbG9yLXBhbGV0dGUvNjk2MTBcXG4qL1xcblxcbmJvZHkge1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIG1pbi1oZWlnaHQ6IDk0MXB4O1xcbiAgbWluLXdpZHRoOiA2NTdweDtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA3MHB4IDFmciA2OHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk5YjVjMztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxubWFpbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtaW4taGVpZ2h0OiA4MDNweDtcXG4gIG1pbi13aWR0aDogOTA4cHg7XFxufVxcblxcbmhlYWRlcixcXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0YzdlOTc7XFxufVxcblxcbmhlYWRlciBoMSB7XFxuICBmb250LXNpemU6IDIuNnJlbTtcXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XFxuICBjb2xvcjogIzk5YjVjMztcXG4gIHRleHQtc2hhZG93OiA0cHggMXB4IGJsYWNrO1xcbiAgcGFkZGluZzogNHB4IDhweDtcXG59XFxuXFxuc2VjdGlvbiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG5mb3JtI3BsYXllciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1hcmdpbi10b3A6IDc2cHg7XFxuICByb3ctZ2FwOiAyOHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuZm9ybSNwbGF5ZXIgPiBsYWJlbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuNnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbmxhYmVsIGlucHV0IHtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHBhZGRpbmc6IDJweCA2cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBoZWlnaHQ6IG1heC1jb250ZW50O1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogNHB4IDhweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbnNlY3Rpb24jcGxhY2Uge1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmctdG9wOiAyMHB4O1xcbn1cXG5cXG5zZWN0aW9uI3BsYWNlIGRpdiNwbEJvYXJkIHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBnYXA6IDRweDtcXG59XFxuXFxuc2VjdGlvbiBkaXYjcGxCb2FyZCxcXG5zZWN0aW9uIGRpdi5ib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA0cHg7XFxuICBvdXRsaW5lOiAycHggc29saWQgYmxhY2s7XFxuICBwYWRkaW5nOiAycHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24ge1xcbiAgaGVpZ2h0OiAzMDBweDtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwYWRkaW5nLXRvcDogODBweDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCAzMHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMzBweDtcXG4gIGdhcDogNHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciA+IGRpdi5yZWZlcmVuY2Uge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I1YjdiODtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyLmF4aXNZIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdChhdXRvLWZpdCwgMzBweCk7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNjb21tYW5kZXIge1xcbiAgd2lkdGg6IDE2OHB4O1xcbiAgaGVpZ2h0OiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjY29tbWFuZGVyLmF4aXNZIHtcXG4gIGhlaWdodDogMTY4cHg7XFxuICB3aWR0aDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2JhdHRsZXNoaXAge1xcbiAgd2lkdGg6IDEzNHB4O1xcbiAgaGVpZ2h0OiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjYmF0dGxlc2hpcC5heGlzWSB7XFxuICBoZWlnaHQ6IDEzM3B4O1xcbiAgd2lkdGg6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNkZXN0cm95ZXIsXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI3N1Ym1hcmluZSB7XFxuICB3aWR0aDogMTAwcHg7XFxuICBoZWlnaHQ6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNkZXN0cm95ZXIuYXhpc1ksXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI3N1Ym1hcmluZS5heGlzWSB7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgd2lkdGg6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNwYXRyb2xCb2F0IHtcXG4gIHdpZHRoOiA2NnB4O1xcbiAgaGVpZ2h0OiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjcGF0cm9sQm9hdC5heGlzWSB7XFxuICBoZWlnaHQ6IDY2cHg7XFxuICB3aWR0aDogMzNweDtcXG59XFxuXFxuc2VjdGlvbiBkaXYgZGl2LmdyaWQge1xcbiAgYm9yZGVyOiAwO1xcbiAgb3V0bGluZTogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcXG59XFxuXFxuc2VjdGlvbiBkaXYgZGl2LmdyaWQuc2hpcCxcXG5kaXYjc2VsZWN0aW9uIGRpdiBkaXYge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2QxZDVkNjtcXG59XFxuXFxuc2VjdGlvbiNnYW1lIGRpdiBkaXYuZ3JpZC5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDAuNyk7XFxufVxcblxcbnNlY3Rpb24jZ2FtZSBkaXYgZGl2LmdyaWQubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDI1NSwgMC43KTtcXG59XFxuXFxuc2VjdGlvbiNnYW1lIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDQ2MHB4O1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4vKiBzZWN0aW9uI2dhbWUgXFxuaDIjbm90aWNlIHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTczLCAyNTUsIDE3Myk7XFxuICB3aWR0aDogNTAwcHg7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyLCA1OCwgMjIpO1xcbiAgY29sb3I6IHJnYigyNDEsIDIyNSwgMTM0KTtcXG4gIGZvbnQtZmFtaWx5OiAnQ291cmllciBOZXcnLCBDb3VyaWVyLCBtb25vc3BhY2U7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcXG59ICovXFxuXFxuc2VjdGlvbiNnYW1lIGRpdi5ib2FyZCB7XFxuICBtYXJnaW4tdG9wOiAxNDBweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyOHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAyOHB4KTtcXG59XFxuXFxuc2VjdGlvbiNub3RpY2Uge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NCwgMjU0LCAwLjMpO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAzMHB4O1xcbn1cXG5cXG5zZWN0aW9uLmhpZGRlbiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuZm9vdGVyIGE6aG92ZXIge1xcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDAgMnB4IHdoaXRlKTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9HaXRIdWItTWFyay1MaWdodC0zMnB4LnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xuLy8gTW9kdWxlXG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18pO1xudmFyIGNvZGUgPSBcIjwhRE9DVFlQRSBodG1sPlxcbjxodG1sIGxhbmc9XFxcImVuXFxcIj5cXG4gIDxoZWFkPlxcbiAgICA8bWV0YSBjaGFyc2V0PVxcXCJVVEYtOFxcXCIgLz5cXG4gICAgPG1ldGEgaHR0cC1lcXVpdj1cXFwiWC1VQS1Db21wYXRpYmxlXFxcIiBjb250ZW50PVxcXCJJRT1lZGdlXFxcIiAvPlxcbiAgICA8bWV0YSBuYW1lPVxcXCJ2aWV3cG9ydFxcXCIgY29udGVudD1cXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFxcXCIgLz5cXG4gICAgPHRpdGxlPkJhdHRsZXNoaXA8L3RpdGxlPlxcbiAgPC9oZWFkPlxcbiAgPGJvZHk+XFxuICAgIDxoZWFkZXI+XFxuICAgICAgPGgxPkJhdHRsZXNoaXA8L2gxPlxcbiAgICA8L2hlYWRlcj5cXG4gICAgPG1haW4+XFxuICAgICAgPHNlY3Rpb24gaWQ9XFxcInN0YXJ0XFxcIj5cXG4gICAgICAgIDxmb3JtIGFjdGlvbj1cXFwiXFxcIiBtZXRob2Q9XFxcImdldFxcXCIgaWQ9XFxcInBsYXllclxcXCI+XFxuICAgICAgICAgIDxsYWJlbCBmb3I9XFxcInBOYW1lXFxcIj5cXG4gICAgICAgICAgICA8cD5FbnRlciBQbGF5ZXIgTmFtZTo8L3A+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcIm5hbWVcXFwiIGlkPVxcXCJwTmFtZVxcXCIgcmVxdWlyZWQgLz5cXG4gICAgICAgICAgPC9sYWJlbD5cXG4gICAgICAgICAgPGJ1dHRvbj5TdGFydCBHYW1lITwvYnV0dG9uPlxcbiAgICAgICAgPC9mb3JtPlxcbiAgICAgIDwvc2VjdGlvbj5cXG4gICAgICA8c2VjdGlvbiBpZD1cXFwicGxhY2VcXFwiIGNsYXNzPVxcXCJoaWRkZW5cXFwiPlxcbiAgICAgICAgPGgyIGNsYXNzPVxcXCJub3RpY2VcXFwiPlNldCB5b3VyIFNoaXBzPC9oMj5cXG4gICAgICAgIDxidXR0b24gaWQ9XFxcImF4aXNcXFwiPkhvcml6b250YWw8L2J1dHRvbj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcInBsQm9hcmRcXFwiPjwvZGl2PlxcbiAgICAgICAgPGRpdiBpZD1cXFwic2VsZWN0aW9uXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2hpcEhvbGRlclxcXCIgaWQ9XFxcImNvbW1hbmRlclxcXCIgZHJhZ2dhYmxlPVxcXCJ0cnVlXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXAgcmVmZXJlbmNlXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXBcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXBcXFwiPjwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2hpcEhvbGRlclxcXCIgaWQ9XFxcImJhdHRsZXNoaXBcXFwiIGRyYWdnYWJsZT1cXFwidHJ1ZVxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwIHJlZmVyZW5jZVxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXBcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzaGlwSG9sZGVyXFxcIiBpZD1cXFwiZGVzdHJveWVyXFxcIiBkcmFnZ2FibGU9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcCByZWZlcmVuY2VcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXBIb2xkZXJcXFwiIGlkPVxcXCJzdWJtYXJpbmVcXFwiIGRyYWdnYWJsZT1cXFwidHJ1ZVxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwIHJlZmVyZW5jZVxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXBcXFwiPjwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2hpcEhvbGRlclxcXCIgaWQ9XFxcInBhdHJvbEJvYXRcXFwiIGRyYWdnYWJsZT1cXFwidHJ1ZVxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwIHJlZmVyZW5jZVxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJhdHRsZVxcXCI+U3RhcnQgYmF0dGxlITwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9zZWN0aW9uPlxcbiAgICAgIDxzZWN0aW9uIGlkPVxcXCJnYW1lXFxcIiBjbGFzcz1cXFwiaGlkZGVuXFxcIj5cXG4gICAgICAgIDwhLS0gPGgyIGlkPVxcXCJub3RpY2VcXFwiPlRlc3QgdHJhbnNtaXNzaW9uLi4uPC9oMj4gLS0+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJnYW1lUGxCb2FyZFxcXCIgY2xhc3M9XFxcImJvYXJkXFxcIj48L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImdhbWVDb21wQm9hcmRcXFwiIGNsYXNzPVxcXCJib2FyZFxcXCI+PC9kaXY+XFxuICAgICAgPC9zZWN0aW9uPlxcbiAgICA8L21haW4+XFxuICAgIDxzZWN0aW9uIGlkPVxcXCJub3RpY2VcXFwiIGNsYXNzPVxcXCJoaWRkZW5cXFwiPlxcbiAgICAgIDxoMiBpZD1cXFwiYW5ub3VuY2VcXFwiPlRoZSB3aW5uZXIgaXMgUGxheWVyPC9oMj5cXG4gICAgICA8YnV0dG9uIGlkPVxcXCJyZXN0YXJ0XFxcIj5SZXN0YXJ0PC9idXR0b24+XFxuICAgIDwvc2VjdGlvbj5cXG4gICAgPGZvb3Rlcj5cXG4gICAgICA8YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vUmhhenpYSVhcXFwiPlxcbiAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyArIFwiXFxcIiBhbHQ9XFxcIkdpdEh1YlxcXCIgLz5cXG4gICAgICA8L2E+XFxuICAgIDwvZm9vdGVyPlxcbiAgPC9ib2R5PlxcbjwvaHRtbD5cXG5cIjtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGNvZGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBuby1wYXJhbS1yZWFzc2lnblxuXG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMubWF5YmVOZWVkUXVvdGVzICYmIC9bXFx0XFxuXFxmXFxyIFwiJz08PmBdLy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybCwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IFwiLi9pbmRleC5odG1sXCI7XG5pbXBvcnQgY29udHJvbERPTSBmcm9tIFwiLi9tb2R1bGVzL0RPTWNvbnRyb2xcIjsiXSwibmFtZXMiOlsiZGVmYXVsdCIsImF0dGFjaERpdkdyaWQiLCJyZW1vdmVHcmlkIiwiR2FtZSIsInBhcnNlR3JpZENvb3JkcyIsImNvbnRyb2xET00iLCJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWFpbiIsInN0YXJ0U2VjdGlvbiIsInBsYXllckZvcm0iLCJwbGF5ZXJJbnB1dCIsInN0YXJ0QnRuIiwicGxhY2VTaGlwU2VjdGlvbiIsImF4aXNCdG4iLCJwbGFjZVNoaXBCb2FyZCIsInNoaXBTZWxlY3Rpb24iLCJkb21Db21tYW5kZXIiLCJkb21CYXR0bGVzaGlwIiwiZG9tRGVzdHJveWVyIiwiZG9tU3VibWFyaW5lIiwiZG9tUGF0cm9sQm9hdCIsImJhdHRsZUJ0biIsImdhbWVTZWN0aW9uIiwiZ2FtZVBsQm9hcmQiLCJnYW1lQ29tcEJvYXJkIiwibm90aWNlU2VjdGlvbiIsIndpbm5lck5vdGljZSIsInJlc3RhcnRCdG4iLCJyZW1vdmVDaGlsZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImdhbWUiLCJnZXRCb2FyZHMiLCJheGlzIiwiZ2FtZUZpbmlzaGVkIiwidXBkYXRlQXBwQm9hcmQiLCJnZXRHYW1lQm9hcmQiLCJjaGFuZ2VBeGlzIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInRleHRDb250ZW50IiwidG9nZ2xlIiwidXBkYXRlRE9NQm9hcmQiLCJwbGF5ZXJCb2FyZCIsImNvbXBCb2FyZCIsInBsYXllciIsImNvbXAiLCJhbm5vdW5jZVdpbm5lciIsImFwcGVuZENoaWxkIiwic2hvd01lc3NhZ2UiLCJncmlkQ2xpY2tFdmVudCIsImluZGV4IiwiY29vcmQiLCJhdHRhY2siLCJzZXRUaW1lb3V0IiwiYWRkR3JpZENsaWNrRXZlbnQiLCJjb21wR3JpZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImdyaWQiLCJqIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvZ2dsZVNoaXBTZWxlY3Rpb24iLCJjb250YWlucyIsInNldFNoaXBFdmVudCIsInByZXZlbnREZWZhdWx0IiwiY29vcmRzIiwic2V0UGxheWVyU2hpcCIsInNldERyYWdORHJvcEV2ZW50cyIsInBsQm9hcmQiLCJwbEdyaWRzIiwiZXZlbnQiLCJiaW5kIiwibG9hZEdhbWUiLCJzZXRQbGF5ZXIiLCJ2YWx1ZSIsInN0YXJ0QmF0dGxlIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJnZW5lcmF0ZUNvb3JkcyIsImNvbW1hbmRlckFJIiwiYXR0YWNrQ29vcmRzRW50ZXJlZCIsImNvb3Jkc1RvRm9jdXMiLCJhZGphY2VudENvb3JkcyIsInR1cm4iLCJjaGVja0Nvb3JkaW5hdGVzIiwiZW50ZXJlZCIsIngiLCJ5IiwiY29vcmRzQ29weSIsImVudHJ5IiwicHVzaCIsImkiLCJhcnIiLCJhIiwiYiIsInNwbGljZSIsImdldEFkamFjZW50Q29vcmRzIiwiY29uc29sZSIsImxvZyIsInBvcCIsImVudGVyQ29vcmRzIiwiZW5lbXlCb2FyZCIsInBsYXllclR1cm4iLCJsZW5ndGgiLCJzaG93VHVybiIsInN0YXJ0VHVybiIsImdlbmVyYXRlQWRqYWNlbnRDb29yZHMiLCJnZXRGZWVkYmFjayIsImZlZWRiYWNrIiwiU2hpcCIsIkdhbWVCb2FyZCIsImdhbWVCb2FyZCIsImNvbW1hbmRlciIsImJhdHRsZXNoaXAiLCJkZXN0cm95ZXIiLCJzdWJtYXJpbmUiLCJwYXRyb2xCb2F0IiwicGxhY2VkU2hpcCIsImFubm91bmNlbWVudCIsInJvdyIsInNob3QiLCJzaG93R2FtZUJvYXJkIiwiZGlzcGxheWVkR2FtZWJvYXJkIiwiZGlzcGxheWVkUm93IiwiZGlwbGF5ZWRHcmlkIiwic3Bhd25Db29yZHMiLCJfcmVmIiwic2hpcExlbmd0aCIsInhBeGlzIiwieUF4aXMiLCJjb29yZGluYXRlcyIsIm5leHRDb29yZHMiLCJnZXRTaGlwSW5PcmRlciIsInNoaXAiLCJjaGVja0Nvb3JkcyIsImdyaWRPayIsInBsYWNlU2hpcCIsImFwcHJvcHJpYXRlU2hpcCIsImdldExlbmd0aCIsImNvb3Jkc09LIiwiZ2V0TmFtZSIsImF0dGFja1NoaXAiLCJzaGlwTmFtZSIsImhpdCIsInJlcG9ydEF0dGFja0NvbmRpdGlvbiIsInZlc3NlbCIsImZpbmQiLCJpc1N1bmsiLCJmaW5kSW5kZXgiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrUmVjZWl2ZWQiLCJhbm5vdW5jZSIsInBsYWNlU2hpcFJhbmRvbWx5IiwicmVmZXJlbmNlTnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tQXhpcyIsIlBsYXllciIsIm5hbWUiLCJwbGF5ZXJOYW1lIiwic2hvd05hbWUiLCJhdHRhY2tCb2FyZCIsImJvYXJkIiwiZW5lbXlUdXJuIiwibm90T0siLCJoaXRSZWNlaXZlZCIsIm1lc3NhZ2UiLCJ3aW5uZXIiLCJjYWxsV2lubmVyIiwidW5kZWZpbmVkIiwiZ2FtZUJvYXJkcyIsInBsYXllckF0dGFjayIsImNvbXBBdHRhY2siLCJjcmVhdGVHcmlkIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImh0bWxCb2FyZCIsImdyaWRzIl0sInNvdXJjZVJvb3QiOiIifQ==