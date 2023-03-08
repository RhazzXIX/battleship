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
/* harmony import */ var _doms_divBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./doms/divBoard */ "./src/modules/doms/divBoard.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/modules/game.js");
/* harmony import */ var _doms_parseGridCoords__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./doms/parseGridCoords */ "./src/modules/doms/parseGridCoords.js");



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
    (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__.removeGrid)(playerBoard);
    (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(playerBoard, getBoards.player, "player");
    if (compBoard) {
      (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__.removeGrid)(compBoard);
      (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(compBoard, getBoards.comp);
    }
  }
  function announceWinner() {
    body.appendChild(noticeSection);
    winnerNotice.textContent = game.showMessage();
  }
  const gridClickEvent = index => {
    const coord = (0,_doms_parseGridCoords__WEBPACK_IMPORTED_MODULE_2__["default"])(index);
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
    const coords = (0,_doms_parseGridCoords__WEBPACK_IMPORTED_MODULE_2__["default"])(this);
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
    (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(placeShipBoard, getBoards.player, "player");
    setDragNDropEvents(placeShipBoard);
    main.removeChild(startSection);
    main.appendChild(placeShipSection);
    playerInput.value = "";
  }
  function startBattle(event) {
    event.stopPropagation();
    updateAppBoard();
    (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(gamePlBoard, getBoards.player, "player");
    (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(gameCompBoard, getBoards.comp);
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

/***/ "./src/modules/doms/divBoard.js":
/*!**************************************!*\
  !*** ./src/modules/doms/divBoard.js ***!
  \**************************************/
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

/***/ "./src/modules/doms/parseGridCoords.js":
/*!*********************************************!*\
  !*** ./src/modules/doms/parseGridCoords.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseGridCoords);

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
const commanderAI = () => {
  const attackCoordsEntered = [];
  let turn = false;
  const generateCoords = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  };
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
  const enterCoords = (enemyBoard, playerTurn) => {
    if (turn === false) return;
    if (attackCoordsEntered.length === 100) return;
    const coords = generateCoords();
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
  return {
    enterCoords,
    showTurn,
    startTurn
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
  return {
    showGameBoard,
    placeShip,
    receiveAttack,
    announce
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
  const gameboards = {
    player: playerBoard.showGameBoard(),
    comp: compBoard.showGameBoard()
  };
  compBoard.placeShip([0, 0], "x");
  compBoard.placeShip([3, 0], "x");
  compBoard.placeShip([2, 8], "y");
  compBoard.placeShip([6, 3], "y");
  compBoard.placeShip([7, 5], "x");
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
    if (compBoard.announce() === "All ships has been sank!") winner = player.showName();
  };
  const compAttack = () => {
    if (comp.showTurn() === false) return;
    comp.enterCoords(playerBoard.receiveAttack, player.startTurn);
    message = playerBoard.announce();
    if (playerBoard.announce() === "All ships has been sank!") winner = "Commander A.I.";
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
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n\n/* color palette\n    #90a3b4\t(144,163,180)\n    #567d9c\t(86,125,156)\n    #0f4162\t(15,65,98)\n    #09273a\t(9,39,58)\n    #1c2641\t(28,38,65)\n    https://www.color-hex.com/color-palette/70772\n\n\n    #99b5c3\t(153,181,195)\n    #4c7e97\t(76,126,151)\n    #00486b\t(0,72,107)\n    #ffffff\t(255,255,255)\n    https://www.color-hex.com/color-palette/69610\n*/\n\nbody {\n  font-size: 16px;\n  display: grid;\n  min-height: 100vh;\n  grid-template-rows: 70px 1fr 68px;\n  background-color: #99b5c3;\n}\n\nmain {\n  position: relative;\n  min-height: 803px;\n  min-width: 908px;\n}\n\nheader,\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nheader {\n  background-color: #4c7e97;\n}\n\nheader h1 {\n  font-size: 2.6rem;\n  letter-spacing: 2px;\n  color: #99b5c3;\n  text-shadow: 4px 1px black;\n  padding: 4px 8px;\n}\n\nsection {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\nform#player {\n  display: flex;\n  flex-direction: column;\n  margin-top: 76px;\n  row-gap: 28px;\n  align-items: center;\n}\n\nform#player > label {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-size: 1.6rem;\n  font-weight: 700;\n}\n\nlabel input {\n  border-radius: 6px;\n  padding: 2px 6px;\n  text-align: center;\n}\n\nform#player button {\n  width: fit-content;\n  padding: 2px 8px;\n  font-weight: 700;\n  border-radius: 8px;\n}\n\nsection#place {\n  align-items: center;\n  padding-top: 20px;\n}\n\nsection#place button {\n  height: max-content;\n  padding: 4px 8px;\n  border-radius: 8px;\n}\n\nsection#place div#plBoard {\n  grid-template-columns: repeat(10, 30px);\n  grid-template-rows: repeat(10, 30px);\n  margin-top: 30px;\n  gap: 4px;\n}\n\nsection div#plBoard,\nsection div.board {\n  display: grid;\n  gap: 4px;\n  outline: 2px solid black;\n  padding: 2px;\n}\n\ndiv#selection {\n  height: 300px;\n  width: 300px;\n  display: grid;\n  padding-top: 80px;\n  justify-content: center;\n}\n\ndiv#selection > div.shipHolder {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, 30px);\n  grid-template-rows: 30px;\n  gap: 4px;\n  justify-content: center;\n  align-content: center;\n}\n\ndiv#selection > div.shipHolder > div.reference {\n  background-color: #b5b7b8;\n}\n\ndiv#selection > div.shipHolder.axisY {\n  display: grid;\n  grid-template-rows: repeat(auto-fit, 30px);\n  grid-template-columns: 30px;\n}\n\ndiv#selection > div.shipHolder#commander {\n  width: 168px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#commander.axisY {\n  height: 168px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#battleship {\n  width: 134px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#battleship.axisY {\n  height: 133px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#destroyer,\ndiv#selection > div.shipHolder#submarine {\n  width: 100px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#destroyer.axisY,\ndiv#selection > div.shipHolder#submarine.axisY {\n  height: 100px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#patrolBoat {\n  width: 66px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#patrolBoat.axisY {\n  height: 66px;\n  width: 33px;\n}\n\nsection div div.grid {\n  border: 0;\n  outline: 1px solid black;\n  background-color: aqua;\n}\n\nsection div div.grid.ship,\ndiv#selection div div {\n  background-color: #d1d5d6;\n}\n\nsection#game div div.grid.hit {\n  background-color: rgba(255, 0, 0, 0.7);\n}\n\nsection#game div div.grid.miss {\n  background-color: rgba(0, 0, 255, 0.7);\n}\n\nsection#game {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  /* grid-template-rows: 250px 1fr; */\n  justify-items: center;\n}\n\n/* section#game \nh2#notice {\n  grid-column: 1 / -1;\n  align-self: center;\n  border: 1px solid rgb(173, 255, 173);\n  width: 500px;\n  height: 80px;\n  border-radius: 10px;\n  background-color: rgb(22, 58, 22);\n  color: rgb(241, 225, 134);\n  font-family: 'Courier New', Courier, monospace;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  letter-spacing: 1px;\n} */\n\nsection#game div.board {\n  margin-top: 140px;\n  display: grid;\n  grid-template-columns: repeat(10, 18px);\n  grid-template-rows: repeat(10, 18px);\n}\n\nsection#notice {\n  background-color: rgba(255, 254, 254, 0.3);\n  justify-content: center;\n  align-items: center;\n  gap: 30px;\n}\n\nsection.hidden {\n  visibility: hidden;\n}\n\nfooter {\n  background-color: black;\n}\n\nfooter a:hover {\n  filter: drop-shadow(0 0 2px white);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n\n/* color palette\n    #90a3b4\t(144,163,180)\n    #567d9c\t(86,125,156)\n    #0f4162\t(15,65,98)\n    #09273a\t(9,39,58)\n    #1c2641\t(28,38,65)\n    https://www.color-hex.com/color-palette/70772\n\n\n    #99b5c3\t(153,181,195)\n    #4c7e97\t(76,126,151)\n    #00486b\t(0,72,107)\n    #ffffff\t(255,255,255)\n    https://www.color-hex.com/color-palette/69610\n*/\n\nbody {\n  font-size: 16px;\n  display: grid;\n  min-height: 100vh;\n  grid-template-rows: 70px 1fr 68px;\n  background-color: #99b5c3;\n}\n\nmain {\n  position: relative;\n  min-height: 803px;\n  min-width: 908px;\n}\n\nheader,\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nheader {\n  background-color: #4c7e97;\n}\n\nheader h1 {\n  font-size: 2.6rem;\n  letter-spacing: 2px;\n  color: #99b5c3;\n  text-shadow: 4px 1px black;\n  padding: 4px 8px;\n}\n\nsection {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\nform#player {\n  display: flex;\n  flex-direction: column;\n  margin-top: 76px;\n  row-gap: 28px;\n  align-items: center;\n}\n\nform#player > label {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-size: 1.6rem;\n  font-weight: 700;\n}\n\nlabel input {\n  border-radius: 6px;\n  padding: 2px 6px;\n  text-align: center;\n}\n\nform#player button {\n  width: fit-content;\n  padding: 2px 8px;\n  font-weight: 700;\n  border-radius: 8px;\n}\n\nsection#place {\n  align-items: center;\n  padding-top: 20px;\n}\n\nsection#place button {\n  height: max-content;\n  padding: 4px 8px;\n  border-radius: 8px;\n}\n\nsection#place div#plBoard {\n  grid-template-columns: repeat(10, 30px);\n  grid-template-rows: repeat(10, 30px);\n  margin-top: 30px;\n  gap: 4px;\n}\n\nsection div#plBoard,\nsection div.board {\n  display: grid;\n  gap: 4px;\n  outline: 2px solid black;\n  padding: 2px;\n}\n\ndiv#selection {\n  height: 300px;\n  width: 300px;\n  display: grid;\n  padding-top: 80px;\n  justify-content: center;\n}\n\ndiv#selection > div.shipHolder {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, 30px);\n  grid-template-rows: 30px;\n  gap: 4px;\n  justify-content: center;\n  align-content: center;\n}\n\ndiv#selection > div.shipHolder > div.reference {\n  background-color: #b5b7b8;\n}\n\ndiv#selection > div.shipHolder.axisY {\n  display: grid;\n  grid-template-rows: repeat(auto-fit, 30px);\n  grid-template-columns: 30px;\n}\n\ndiv#selection > div.shipHolder#commander {\n  width: 168px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#commander.axisY {\n  height: 168px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#battleship {\n  width: 134px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#battleship.axisY {\n  height: 133px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#destroyer,\ndiv#selection > div.shipHolder#submarine {\n  width: 100px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#destroyer.axisY,\ndiv#selection > div.shipHolder#submarine.axisY {\n  height: 100px;\n  width: 33px;\n}\n\ndiv#selection > div.shipHolder#patrolBoat {\n  width: 66px;\n  height: 33px;\n}\n\ndiv#selection > div.shipHolder#patrolBoat.axisY {\n  height: 66px;\n  width: 33px;\n}\n\nsection div div.grid {\n  border: 0;\n  outline: 1px solid black;\n  background-color: aqua;\n}\n\nsection div div.grid.ship,\ndiv#selection div div {\n  background-color: #d1d5d6;\n}\n\nsection#game div div.grid.hit {\n  background-color: rgba(255, 0, 0, 0.7);\n}\n\nsection#game div div.grid.miss {\n  background-color: rgba(0, 0, 255, 0.7);\n}\n\nsection#game {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  /* grid-template-rows: 250px 1fr; */\n  justify-items: center;\n}\n\n/* section#game \nh2#notice {\n  grid-column: 1 / -1;\n  align-self: center;\n  border: 1px solid rgb(173, 255, 173);\n  width: 500px;\n  height: 80px;\n  border-radius: 10px;\n  background-color: rgb(22, 58, 22);\n  color: rgb(241, 225, 134);\n  font-family: 'Courier New', Courier, monospace;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  letter-spacing: 1px;\n} */\n\nsection#game div.board {\n  margin-top: 140px;\n  display: grid;\n  grid-template-columns: repeat(10, 18px);\n  grid-template-rows: repeat(10, 18px);\n}\n\nsection#notice {\n  background-color: rgba(255, 254, 254, 0.3);\n  justify-content: center;\n  align-items: center;\n  gap: 30px;\n}\n\nsection.hidden {\n  visibility: hidden;\n}\n\nfooter {\n  background-color: black;\n}\n\nfooter a:hover {\n  filter: drop-shadow(0 0 2px white);\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVUsTUFBTSxLQUFLLFFBQVEsT0FBTyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssUUFBUSxRQUFRLE1BQU0sU0FBUyxzQkFBc0IscUJBQXFCLHVCQUF1QixxQkFBcUIsT0FBTyxPQUFPLE1BQU0sTUFBTSxVQUFVLFlBQVksT0FBTyxPQUFPLE1BQU0sTUFBTSxVQUFVLFlBQVksT0FBTyxNQUFNLE1BQU0sUUFBUSxZQUFZLE9BQU8sTUFBTSxNQUFNLFFBQVEsWUFBWSxXQUFXLE1BQU0sTUFBTSxNQUFNLFFBQVEsWUFBWSxPQUFPLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxTQUFTLE1BQU0sS0FBSyxzQkFBc0IscUJBQXFCLHFCQUFxQixxQkFBcUIscUJBQXFCLHVCQUF1QixPQUFPLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxNQUFNLE1BQU0sS0FBSyxVQUFVLE9BQU8sT0FBTyxNQUFNLE1BQU0sc0JBQXNCLHFCQUFxQixPQUFPLE1BQU0sTUFBTSxNQUFNLFVBQVUsTUFBTSxPQUFPLE1BQU0sS0FBSyxzQkFBc0IsdUJBQXVCLE9BQU8sTUFBTSxNQUFNLEtBQUssWUFBWSxPQUFPLE9BQU8sTUFBTSxLQUFLLHNCQUFzQixxQkFBcUIsT0FBTyxLQUFLLFFBQVEsT0FBTyxNQUFNLEtBQUssVUFBVSxPQUFPLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFFBQVEsT0FBTyxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxrQkFBa0IsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxNQUFNLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FB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O1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7Ozs7Ozs7Ozs7O0FDQXFCO0FBQ0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvRE9NY29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tcy9kaXZCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tcy9wYXJzZUdyaWRDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9haS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZhdWx0IGFzIGF0dGFjaERpdkdyaWQsIHJlbW92ZUdyaWQgfSBmcm9tIFwiLi9kb21zL2RpdkJvYXJkXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgcGFyc2VHcmlkQ29vcmRzIGZyb20gXCIuL2RvbXMvcGFyc2VHcmlkQ29vcmRzXCI7XG5cbmNvbnN0IGNvbnRyb2xET00gPSAoKCkgPT4ge1xuICAvLyBET00gbm9kZXNcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gIGNvbnN0IG1haW4gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICBjb25zdCBzdGFydFNlY3Rpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uI3N0YXJ0XCIpO1xuICBjb25zdCBwbGF5ZXJGb3JtID0gc3RhcnRTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtI3BsYXllclwiKTtcbiAgY29uc3QgcGxheWVySW5wdXQgPSBwbGF5ZXJGb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dCNwTmFtZVwiKTtcbiAgY29uc3Qgc3RhcnRCdG4gPSBzdGFydFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtcblxuICBjb25zdCBwbGFjZVNoaXBTZWN0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbiNwbGFjZVwiKTtcbiAgY29uc3QgYXhpc0J0biA9IHBsYWNlU2hpcFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImJ1dHRvbiNheGlzXCIpO1xuICBjb25zdCBwbGFjZVNoaXBCb2FyZCA9IHBsYWNlU2hpcFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImRpdiNwbEJvYXJkXCIpO1xuICBjb25zdCBzaGlwU2VsZWN0aW9uID0gcGxhY2VTaGlwU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZGl2I3NlbGVjdGlvblwiKTtcbiAgY29uc3QgZG9tQ29tbWFuZGVyID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZGl2I2NvbW1hbmRlclwiKTtcbiAgY29uc3QgZG9tQmF0dGxlc2hpcCA9IHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcImRpdiNiYXR0bGVzaGlwXCIpO1xuICBjb25zdCBkb21EZXN0cm95ZXIgPSBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJkaXYjZGVzdHJveWVyXCIpO1xuICBjb25zdCBkb21TdWJtYXJpbmUgPSBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJkaXYjc3VibWFyaW5lXCIpO1xuICBjb25zdCBkb21QYXRyb2xCb2F0ID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZGl2I3BhdHJvbEJvYXRcIik7XG4gIGNvbnN0IGJhdHRsZUJ0biA9IHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcImJ1dHRvbiNiYXR0bGVcIik7XG5cbiAgY29uc3QgZ2FtZVNlY3Rpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uI2dhbWVcIik7XG4gIGNvbnN0IGdhbWVQbEJvYXJkID0gZ2FtZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImRpdiNnYW1lUGxCb2FyZFwiKTtcbiAgY29uc3QgZ2FtZUNvbXBCb2FyZCA9IGdhbWVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJkaXYjZ2FtZUNvbXBCb2FyZFwiKTtcblxuICBjb25zdCBub3RpY2VTZWN0aW9uID0gYm9keS5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbiNub3RpY2VcIik7XG4gIGNvbnN0IHdpbm5lck5vdGljZSA9IG5vdGljZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImgyI2Fubm91bmNlXCIpO1xuICBjb25zdCByZXN0YXJ0QnRuID0gbm90aWNlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uI3Jlc3RhcnRcIik7XG5cbiAgLy8gSW5pdGlhbCBMb2FkXG5cbiAgLy8gbWFpbi5yZW1vdmVDaGlsZChzdGFydFNlY3Rpb24pO1xuICAvLyBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbUNvbW1hbmRlcik7XG4gIHNoaXBTZWxlY3Rpb24ucmVtb3ZlQ2hpbGQoZG9tQmF0dGxlc2hpcCk7XG4gIHNoaXBTZWxlY3Rpb24ucmVtb3ZlQ2hpbGQoZG9tRGVzdHJveWVyKTtcbiAgc2hpcFNlbGVjdGlvbi5yZW1vdmVDaGlsZChkb21TdWJtYXJpbmUpO1xuICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbVBhdHJvbEJvYXQpO1xuICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGJhdHRsZUJ0bik7XG4gIG1haW4ucmVtb3ZlQ2hpbGQocGxhY2VTaGlwU2VjdGlvbik7XG4gIHBsYWNlU2hpcFNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgbWFpbi5yZW1vdmVDaGlsZChnYW1lU2VjdGlvbik7XG4gIGdhbWVTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIGJvZHkucmVtb3ZlQ2hpbGQobm90aWNlU2VjdGlvbik7XG4gIG5vdGljZVNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcblxuICBjb25zdCBnYW1lID0gR2FtZSgpO1xuICBsZXQgZ2V0Qm9hcmRzO1xuICBsZXQgYXhpcyA9IFwieFwiO1xuICBsZXQgZ2FtZUZpbmlzaGVkID0gZmFsc2U7XG5cbiAgLy8gRnVuY3Rpb25zIGZvciBET00gY29udHJvbFxuXG4gIGNvbnN0IHVwZGF0ZUFwcEJvYXJkID0gKCkgPT4ge1xuICAgIGdldEJvYXJkcyA9IGdhbWUuZ2V0R2FtZUJvYXJkKCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gY2hhbmdlQXhpcyhlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgIGF4aXMgPSBcInlcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgYXhpcyA9IFwieFwiO1xuICAgIH1cbiAgICBpZiAoYXhpc0J0bi50ZXh0Q29udGVudCA9PT0gXCJIb3Jpem9udGFsXCIpIHtcbiAgICAgIGF4aXNCdG4udGV4dENvbnRlbnQgPSBcIlZlcnRpY2FsXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF4aXNCdG4udGV4dENvbnRlbnQgPSBcIkhvcml6b250YWxcIjtcbiAgICB9XG4gICAgZG9tQ29tbWFuZGVyLmNsYXNzTGlzdC50b2dnbGUoXCJheGlzWVwiKTtcbiAgICBkb21CYXR0bGVzaGlwLmNsYXNzTGlzdC50b2dnbGUoXCJheGlzWVwiKTtcbiAgICBkb21EZXN0cm95ZXIuY2xhc3NMaXN0LnRvZ2dsZShcImF4aXNZXCIpO1xuICAgIGRvbVN1Ym1hcmluZS5jbGFzc0xpc3QudG9nZ2xlKFwiYXhpc1lcIik7XG4gICAgZG9tUGF0cm9sQm9hdC5jbGFzc0xpc3QudG9nZ2xlKFwiYXhpc1lcIik7XG4gICAgYmF0dGxlQnRuLmNsYXNzTGlzdC50b2dnbGUoXCJheGlzWVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZURPTUJvYXJkKHBsYXllckJvYXJkLCBjb21wQm9hcmQpIHtcbiAgICByZW1vdmVHcmlkKHBsYXllckJvYXJkKTtcbiAgICBhdHRhY2hEaXZHcmlkKHBsYXllckJvYXJkLCBnZXRCb2FyZHMucGxheWVyLCBcInBsYXllclwiKTtcbiAgICBpZiAoY29tcEJvYXJkKSB7XG4gICAgICByZW1vdmVHcmlkKGNvbXBCb2FyZCk7XG4gICAgICBhdHRhY2hEaXZHcmlkKGNvbXBCb2FyZCwgZ2V0Qm9hcmRzLmNvbXApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFubm91bmNlV2lubmVyKCkge1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobm90aWNlU2VjdGlvbik7XG4gICAgd2lubmVyTm90aWNlLnRleHRDb250ZW50ID0gZ2FtZS5zaG93TWVzc2FnZSgpO1xuICB9XG5cbiAgY29uc3QgZ3JpZENsaWNrRXZlbnQgPSAoaW5kZXgpID0+IHtcbiAgICBjb25zdCBjb29yZCA9IHBhcnNlR3JpZENvb3JkcyhpbmRleCk7XG4gICAgZ2FtZS5hdHRhY2soY29vcmQpO1xuICAgIHVwZGF0ZUFwcEJvYXJkKCk7XG4gICAgdXBkYXRlRE9NQm9hcmQoZ2FtZVBsQm9hcmQsIGdhbWVDb21wQm9hcmQpO1xuICAgIGlmIChnYW1lLnNob3dNZXNzYWdlKCkgPT09IFwiQWxsIHNoaXBzIGhhcyBiZWVuIHNhbmshXCIpIHtcbiAgICAgIGdhbWVGaW5pc2hlZCA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KGFubm91bmNlV2lubmVyLCA1MDApO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBhZGRHcmlkQ2xpY2tFdmVudCgpIHtcbiAgICBjb25zdCBjb21wR3JpZHMgPSBnYW1lQ29tcEJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYuZ3JpZFwiKTtcbiAgICBjb21wR3JpZHMuZm9yRWFjaCgoZ3JpZCwgaikgPT4ge1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZ3JpZENsaWNrRXZlbnQoaik7XG4gICAgICAgIGlmICghZ2FtZUZpbmlzaGVkKSB7XG4gICAgICAgICAgYWRkR3JpZENsaWNrRXZlbnQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVTaGlwU2VsZWN0aW9uKCkge1xuICAgIGlmIChzaGlwU2VsZWN0aW9uLmNvbnRhaW5zKGRvbUNvbW1hbmRlcikpIHtcbiAgICAgIHNoaXBTZWxlY3Rpb24ucmVtb3ZlQ2hpbGQoZG9tQ29tbWFuZGVyKTtcbiAgICAgIHNoaXBTZWxlY3Rpb24uYXBwZW5kQ2hpbGQoZG9tQmF0dGxlc2hpcCk7XG4gICAgfSBlbHNlIGlmIChzaGlwU2VsZWN0aW9uLmNvbnRhaW5zKGRvbUJhdHRsZXNoaXApKSB7XG4gICAgICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbUJhdHRsZXNoaXApO1xuICAgICAgc2hpcFNlbGVjdGlvbi5hcHBlbmRDaGlsZChkb21EZXN0cm95ZXIpO1xuICAgIH0gZWxzZSBpZiAoc2hpcFNlbGVjdGlvbi5jb250YWlucyhkb21EZXN0cm95ZXIpKSB7XG4gICAgICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbURlc3Ryb3llcik7XG4gICAgICBzaGlwU2VsZWN0aW9uLmFwcGVuZENoaWxkKGRvbVN1Ym1hcmluZSk7XG4gICAgfSBlbHNlIGlmIChzaGlwU2VsZWN0aW9uLmNvbnRhaW5zKGRvbVN1Ym1hcmluZSkpIHtcbiAgICAgIHNoaXBTZWxlY3Rpb24ucmVtb3ZlQ2hpbGQoZG9tU3VibWFyaW5lKTtcbiAgICAgIHNoaXBTZWxlY3Rpb24uYXBwZW5kQ2hpbGQoZG9tUGF0cm9sQm9hdCk7XG4gICAgfSBlbHNlIGlmIChzaGlwU2VsZWN0aW9uLmNvbnRhaW5zKGRvbVBhdHJvbEJvYXQpKSB7XG4gICAgICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbVBhdHJvbEJvYXQpO1xuICAgICAgc2hpcFNlbGVjdGlvbi5hcHBlbmRDaGlsZChiYXR0bGVCdG4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFNoaXBFdmVudChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgY29vcmRzID0gcGFyc2VHcmlkQ29vcmRzKHRoaXMpO1xuXG4gICAgZ2FtZS5zZXRQbGF5ZXJTaGlwKGNvb3JkcywgYXhpcyk7XG4gICAgdXBkYXRlQXBwQm9hcmQoKTtcbiAgICBpZiAoZ2FtZS5zaG93TWVzc2FnZSgpICE9PSBcIkNoZWNrIGNvb3JkaW5hdGVzIGFnYWluLlwiKSB7XG4gICAgICB0b2dnbGVTaGlwU2VsZWN0aW9uKCk7XG4gICAgICB1cGRhdGVET01Cb2FyZChwbGFjZVNoaXBCb2FyZCk7XG4gICAgICBzZXREcmFnTkRyb3BFdmVudHMocGxhY2VTaGlwQm9hcmQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldERyYWdORHJvcEV2ZW50cyhwbEJvYXJkKSB7XG4gICAgY29uc3QgcGxHcmlkcyA9IHBsQm9hcmQucXVlcnlTZWxlY3RvckFsbChcImRpdi5ncmlkXCIpO1xuICAgIHBsR3JpZHMuZm9yRWFjaCgoZ3JpZCwgaW5kZXgpID0+IHtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBzZXRTaGlwRXZlbnQuYmluZChpbmRleCkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZEdhbWUoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGdhbWUuc2V0UGxheWVyKHBsYXllcklucHV0LnZhbHVlKTtcbiAgICB1cGRhdGVBcHBCb2FyZCgpO1xuICAgIGF0dGFjaERpdkdyaWQocGxhY2VTaGlwQm9hcmQsIGdldEJvYXJkcy5wbGF5ZXIsIFwicGxheWVyXCIpO1xuICAgIHNldERyYWdORHJvcEV2ZW50cyhwbGFjZVNoaXBCb2FyZCk7XG4gICAgbWFpbi5yZW1vdmVDaGlsZChzdGFydFNlY3Rpb24pO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocGxhY2VTaGlwU2VjdGlvbik7XG4gICAgcGxheWVySW5wdXQudmFsdWUgPSBcIlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRCYXR0bGUoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB1cGRhdGVBcHBCb2FyZCgpO1xuICAgIGF0dGFjaERpdkdyaWQoZ2FtZVBsQm9hcmQsIGdldEJvYXJkcy5wbGF5ZXIsIFwicGxheWVyXCIpO1xuICAgIGF0dGFjaERpdkdyaWQoZ2FtZUNvbXBCb2FyZCwgZ2V0Qm9hcmRzLmNvbXApO1xuICAgIGFkZEdyaWRDbGlja0V2ZW50KCk7XG4gICAgbWFpbi5yZW1vdmVDaGlsZChwbGFjZVNoaXBTZWN0aW9uKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGdhbWVTZWN0aW9uKTtcbiAgfVxuXG4gIC8vIEV2ZW50bGlzdGVuZXJzXG5cbiAgcGxheWVyRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGxvYWRHYW1lKTtcbiAgYXhpc0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hhbmdlQXhpcyk7XG4gIGJhdHRsZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRCYXR0bGUpO1xuICByZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9KTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xET007XG4iLCJcblxuY29uc3QgY3JlYXRlR3JpZCA9IChjb29yZCwgcGxheWVyKSA9PiB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJylcbiAgaWYgKGNvb3JkLnNob3QgPT09ICdtaXNzJykgZ3JpZC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gIGlmIChjb29yZC5zaG90ID09PSAnaGl0JykgZ3JpZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgaWYgKHBsYXllcikge1xuICAgIGlmIChjb29yZC5zaGlwKSBncmlkLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgfVxuXG4gIHJldHVybiBncmlkXG59XG5cbmNvbnN0IGF0dGFjaERpdkdyaWQgPSAoaHRtbEJvYXJkLCBnYW1lQm9hcmQsIHBsYXllcikgPT4ge1xuICBnYW1lQm9hcmQuZm9yRWFjaChyb3cgPT4ge1xuICAgIHJvdy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgIGNvbnN0IGdyaWQgPSBjcmVhdGVHcmlkKGNvb3JkLCBwbGF5ZXIpO1xuICAgICAgaHRtbEJvYXJkLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgIH0pXG4gIH0pXG5cbn1cblxuY29uc3QgcmVtb3ZlR3JpZCA9IChodG1sQm9hcmQpID0+IHtcbiAgY29uc3QgZ3JpZHMgPSBodG1sQm9hcmQucXVlcnlTZWxlY3RvckFsbCgnZGl2Jyk7XG4gIGdyaWRzLmZvckVhY2goZ3JpZCA9PiB7XG4gICAgaHRtbEJvYXJkLnJlbW92ZUNoaWxkKGdyaWQpO1xuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBhdHRhY2hEaXZHcmlkO1xuZXhwb3J0IHsgcmVtb3ZlR3JpZCAgfSIsImNvbnN0IHBhcnNlR3JpZENvb3JkcyA9IChpbmRleCkgPT4ge1xuICBsZXQgeCA9IDA7XG4gIGxldCB5ID0gaW5kZXg7XG5cbiAgaWYgKGluZGV4ID49IDEwKSB7XG4gICAgeCA9IE1hdGguZmxvb3IoaW5kZXggLyAxMCk7XG4gICAgeSA9IGluZGV4IC0geCAqIDEwO1xuICB9XG4gIHJldHVybiBbeCwgeV07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYXJzZUdyaWRDb29yZHM7XG4iLCJjb25zdCBjb21tYW5kZXJBSSA9ICgpID0+IHtcbiAgY29uc3QgYXR0YWNrQ29vcmRzRW50ZXJlZCA9IFtdO1xuICBsZXQgdHVybiA9IGZhbHNlO1xuXG4gIGNvbnN0IGdlbmVyYXRlQ29vcmRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICByZXR1cm4gW3gsIHldO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrQ29vcmRpbmF0ZXMgPSAoY29vcmRzKSA9PiB7XG4gICAgbGV0IGVudGVyZWQgPSBmYWxzZTtcbiAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRzXTtcbiAgICBjb25zdCBjb29yZHNDb3B5ID0gW107XG4gICAgYXR0YWNrQ29vcmRzRW50ZXJlZC5mb3JFYWNoKChlbnRyeSkgPT4gY29vcmRzQ29weS5wdXNoKGVudHJ5KSk7XG4gICAgY29vcmRzQ29weS5mb3JFYWNoKChlbnRyeSwgaSwgYXJyKSA9PiB7XG4gICAgICBjb25zdCBbYSwgYl0gPSBbLi4uZW50cnldO1xuICAgICAgaWYgKGEgPT09IHggJiYgYiA9PT0geSkge1xuICAgICAgICBlbnRlcmVkID0gdHJ1ZTtcbiAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRlcmVkO1xuICB9O1xuXG4gIGNvbnN0IGVudGVyQ29vcmRzID0gKGVuZW15Qm9hcmQsIHBsYXllclR1cm4pID0+IHtcbiAgICBpZiAodHVybiA9PT0gZmFsc2UpIHJldHVybjtcbiAgICBpZiAoYXR0YWNrQ29vcmRzRW50ZXJlZC5sZW5ndGggPT09IDEwMCkgcmV0dXJuO1xuICAgIGNvbnN0IGNvb3JkcyA9IGdlbmVyYXRlQ29vcmRzKCk7XG4gICAgY29uc3QgZW50ZXJlZCA9IGNoZWNrQ29vcmRpbmF0ZXMoY29vcmRzKTtcbiAgICBpZiAoIWVudGVyZWQpIHtcbiAgICAgIGF0dGFja0Nvb3Jkc0VudGVyZWQucHVzaChjb29yZHMpO1xuICAgICAgZW5lbXlCb2FyZChjb29yZHMpO1xuICAgICAgdHVybiA9IGZhbHNlO1xuICAgICAgcGxheWVyVHVybigpO1xuICAgIH0gZWxzZSBpZiAoZW50ZXJlZCkge1xuICAgICAgZW50ZXJDb29yZHMoZW5lbXlCb2FyZCwgcGxheWVyVHVybik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNob3dUdXJuID0gKCkgPT4gdHVybjtcblxuICBjb25zdCBzdGFydFR1cm4gPSAoKSA9PiB7XG4gICAgdHVybiA9IHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIHsgZW50ZXJDb29yZHMsIHNob3dUdXJuLCBzdGFydFR1cm4gfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRlckFJO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IFtdO1xuXG4gIGNvbnN0IGNvbW1hbmRlciA9IFNoaXAoXCJDb21tYW5kZXJcIiwgNSk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKFwiQmF0dGxlc2hpcFwiLCA0KTtcbiAgY29uc3QgZGVzdHJveWVyID0gU2hpcChcIkRlc3Ryb3llclwiLCAzKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gU2hpcChcIlN1Ym1hcmluZVwiLCAzKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IFNoaXAoXCJQYXRyb2wgQm9hdFwiLCAyKTtcblxuICBjb25zdCBwbGFjZWRTaGlwID0gW107XG5cbiAgbGV0IGFubm91bmNlbWVudCA9IFwiXCI7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgY29uc3Qgcm93ID0gW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICBjb25zdCBncmlkID0geyBzaG90OiBudWxsIH07XG4gICAgICByb3cucHVzaChncmlkKTtcbiAgICB9XG4gICAgZ2FtZUJvYXJkLnB1c2gocm93KTtcbiAgfVxuXG4gIGNvbnN0IHNob3dHYW1lQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheWVkR2FtZWJvYXJkID0gW107XG4gICAgZ2FtZUJvYXJkLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgY29uc3QgZGlzcGxheWVkUm93ID0gW107XG4gICAgICByb3cuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICBjb25zdCBkaXBsYXllZEdyaWQgPSB7IC4uLmdyaWQgfTtcbiAgICAgICAgZGlzcGxheWVkUm93LnB1c2goZGlwbGF5ZWRHcmlkKTtcbiAgICAgIH0pO1xuICAgICAgZGlzcGxheWVkR2FtZWJvYXJkLnB1c2goZGlzcGxheWVkUm93KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGlzcGxheWVkR2FtZWJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IHNwYXduQ29vcmRzID0gKFt4LCB5XSwgYXhpcywgc2hpcExlbmd0aCkgPT4ge1xuICAgIGxldCB4QXhpcyA9IHg7XG4gICAgbGV0IHlBeGlzID0geTtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtbeEF4aXMsIHlBeGlzXV07XG4gICAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXBMZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB5QXhpcyArPSAxO1xuICAgICAgICBjb25zdCBuZXh0Q29vcmRzID0gW3hBeGlzLCB5QXhpc107XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2gobmV4dENvb3Jkcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChheGlzID09PSBcInlcIikge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwTGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgeEF4aXMgKz0gMTtcbiAgICAgICAgY29uc3QgbmV4dENvb3JkcyA9IFt4QXhpcywgeUF4aXNdO1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKG5leHRDb29yZHMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcEluT3JkZXIgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXA7XG4gICAgc3dpdGNoIChwbGFjZWRTaGlwLmxlbmd0aCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBzaGlwID0gYmF0dGxlc2hpcDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHNoaXAgPSBkZXN0cm95ZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBzaGlwID0gc3VibWFyaW5lO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgc2hpcCA9IHBhdHJvbEJvYXQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc2hpcCA9IGNvbW1hbmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hpcDtcbiAgfTtcblxuICBjb25zdCBjaGVja0Nvb3JkcyA9IChjb29yZHMpID0+IHtcbiAgICBsZXQgZ3JpZE9rO1xuICAgIGNvb3Jkcy5mb3JFYWNoKChjb29yZCwgaSwgYXJyKSA9PiB7XG4gICAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRdO1xuICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgeCA8IDA6XG4gICAgICAgICAgZ3JpZE9rID0gZmFsc2U7XG4gICAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgeSA8IDA6XG4gICAgICAgICAgZ3JpZE9rID0gZmFsc2U7XG4gICAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgeCA+IDk6XG4gICAgICAgICAgZ3JpZE9rID0gZmFsc2U7XG4gICAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgeSA+IDk6XG4gICAgICAgICAgZ3JpZE9rID0gZmFsc2U7XG4gICAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZ3JpZE9rID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChnYW1lQm9hcmRbeF1beV0uc2hpcCkge1xuICAgICAgICBncmlkT2sgPSBmYWxzZTtcbiAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZ3JpZE9rO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChjb29yZCwgYXhpcykgPT4ge1xuICAgIGlmIChwbGFjZWRTaGlwLmxlbmd0aCA9PT0gNSkgcmV0dXJuO1xuICAgIGNvbnN0IGFwcHJvcHJpYXRlU2hpcCA9IGdldFNoaXBJbk9yZGVyKCk7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBzcGF3bkNvb3Jkcyhjb29yZCwgYXhpcywgYXBwcm9wcmlhdGVTaGlwLmdldExlbmd0aCgpKTtcbiAgICBjb25zdCBjb29yZHNPSyA9IGNoZWNrQ29vcmRzKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoIWNvb3Jkc09LKSB7XG4gICAgICBhbm5vdW5jZW1lbnQgPSBcIkNoZWNrIGNvb3JkaW5hdGVzIGFnYWluLlwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBjb25zdCBbeCwgeV0gPSBbLi4uZ3JpZF07XG4gICAgICBnYW1lQm9hcmRbeF1beV0uc2hpcCA9IGFwcHJvcHJpYXRlU2hpcC5nZXROYW1lKCk7XG4gICAgfSk7XG5cbiAgICBwbGFjZWRTaGlwLnB1c2goYXBwcm9wcmlhdGVTaGlwKTtcbiAgICBpZiAocGxhY2VkU2hpcC5sZW5ndGggPT09IDUpIHtcbiAgICAgIGFubm91bmNlbWVudCA9IFwiQWxsIHNoaXBzIGhhcyBiZWVuIHBsYWNlZC5cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgYW5ub3VuY2VtZW50ID0gYFBsYWNlZCAke2FwcHJvcHJpYXRlU2hpcC5nZXROYW1lKCl9YDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrU2hpcCA9IChzaGlwTmFtZSkgPT4ge1xuICAgIHBsYWNlZFNoaXAuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuZ2V0TmFtZSgpID09PSBzaGlwTmFtZSkgc2hpcC5oaXQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByZXBvcnRBdHRhY2tDb25kaXRpb24gPSAoZ3JpZCkgPT4ge1xuICAgIGFubm91bmNlbWVudCA9IGdyaWQuc2hvdDtcbiAgICBpZiAoIWdyaWQuc2hpcCkgcmV0dXJuO1xuICAgIGNvbnN0IHZlc3NlbCA9IHBsYWNlZFNoaXAuZmluZCgoc2hpcCkgPT4gc2hpcC5nZXROYW1lKCkgPT09IGdyaWQuc2hpcCk7XG4gICAgaWYgKCF2ZXNzZWwuaXNTdW5rKCkpIHJldHVybjtcbiAgICBhbm5vdW5jZW1lbnQgPSBgJHt2ZXNzZWwuZ2V0TmFtZSgpfSBoYXMgYmVlbiBzYW5rIWA7XG4gICAgY29uc3QgaW5kZXggPSBwbGFjZWRTaGlwLmZpbmRJbmRleCgoc2hpcCkgPT4gc2hpcCA9PT0gdmVzc2VsKTtcbiAgICBwbGFjZWRTaGlwLnNwbGljZShpbmRleCwgMSk7XG4gICAgaWYgKHBsYWNlZFNoaXAubGVuZ3RoID09PSAwKSBhbm5vdW5jZW1lbnQgPSBgQWxsIHNoaXBzIGhhcyBiZWVuIHNhbmshYDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkKSA9PiB7XG4gICAgY29uc3QgW3gsIHldID0gWy4uLmNvb3JkXTtcbiAgICBsZXQgYXR0YWNrUmVjZWl2ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGdyaWQgPSBnYW1lQm9hcmRbeF1beV07XG4gICAgaWYgKGdyaWQuc2hvdCAhPT0gbnVsbCkge1xuICAgICAgYXR0YWNrUmVjZWl2ZWQgPSBmYWxzZTtcbiAgICAgIGFubm91bmNlbWVudCA9IFwiSWxsZWdhbCBzaG90IVwiO1xuICAgICAgcmV0dXJuIGF0dGFja1JlY2VpdmVkO1xuICAgIH1cbiAgICBpZiAoZ3JpZC5zaGlwKSB7XG4gICAgICBncmlkLnNob3QgPSBcImhpdFwiO1xuICAgICAgYXR0YWNrU2hpcChncmlkLnNoaXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmlkLnNob3QgPSBcIm1pc3NcIjtcbiAgICB9XG4gICAgcmVwb3J0QXR0YWNrQ29uZGl0aW9uKGdyaWQpO1xuICAgIHJldHVybiBhdHRhY2tSZWNlaXZlZDtcbiAgfTtcblxuICBjb25zdCBhbm5vdW5jZSA9ICgpID0+IGFubm91bmNlbWVudDtcblxuICByZXR1cm4geyBzaG93R2FtZUJvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGFubm91bmNlIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lQm9hcmQ7XG4iLCJjb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcblxuICBsZXQgdHVybiA9IHRydWU7XG5cbiAgY29uc3Qgc2hvd05hbWUgPSAoKSA9PiBwbGF5ZXJOYW1lO1xuXG4gIGNvbnN0IHNob3dUdXJuID0gKCkgPT4gdHVybjtcblxuICBjb25zdCBhdHRhY2tCb2FyZCA9IChjb29yZHMsIGJvYXJkLCBlbmVteVR1cm4pID0+IHtcbiAgICBjb25zdCBub3RPSyA9IGZhbHNlO1xuICAgIGlmICh0dXJuID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIGlmIChib2FyZChjb29yZHMpID09PSBub3RPSykgcmV0dXJuO1xuICAgIHR1cm4gPSBmYWxzZTtcbiAgICBlbmVteVR1cm4oKTtcbiAgfTtcblxuICBjb25zdCBzdGFydFR1cm4gPSAoKSA9PiB7XG4gICAgdHVybiA9IHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIHsgc2hvd05hbWUsIHNob3dUdXJuLCBhdHRhY2tCb2FyZCwgc3RhcnRUdXJuIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBTaGlwID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwTmFtZSA9IG5hbWU7XG4gIGNvbnN0IHNoaXBMZW5ndGggPSBsZW5ndGg7XG4gIGxldCBoaXRSZWNlaXZlZCA9IDA7XG4gIGNvbnN0IGhpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoaGl0UmVjZWl2ZWQgPT09IHNoaXBMZW5ndGgpIHJldHVybjtcbiAgICBoaXRSZWNlaXZlZCArPSAxO1xuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGhpdFJlY2VpdmVkID09PSBzaGlwTGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IHNoaXBMZW5ndGg7XG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBzaGlwTmFtZTtcblxuICByZXR1cm4geyBoaXQsIGlzU3VuaywgZ2V0TGVuZ3RoLCBnZXROYW1lIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZUJvYXJkXCI7XG5pbXBvcnQgY29tbWFuZGVyQUkgZnJvbSBcIi4vZmFjdG9yaWVzL2FpXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2ZhY3Rvcmllcy9wbGF5ZXJcIjtcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgbGV0IHBsYXllcjtcbiAgY29uc3QgY29tcCA9IGNvbW1hbmRlckFJKCk7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXBCb2FyZCA9IEdhbWVCb2FyZCgpO1xuICBsZXQgbWVzc2FnZTtcbiAgbGV0IHdpbm5lcjtcbiAgbGV0IGNhbGxXaW5uZXIgPSBmYWxzZTtcblxuICBjb25zdCBnYW1lYm9hcmRzID0ge1xuICAgIHBsYXllcjogcGxheWVyQm9hcmQuc2hvd0dhbWVCb2FyZCgpLFxuICAgIGNvbXA6IGNvbXBCb2FyZC5zaG93R2FtZUJvYXJkKCksXG4gIH07XG5cbiAgY29tcEJvYXJkLnBsYWNlU2hpcChbMCwgMF0sIFwieFwiKTtcbiAgY29tcEJvYXJkLnBsYWNlU2hpcChbMywgMF0sIFwieFwiKTtcbiAgY29tcEJvYXJkLnBsYWNlU2hpcChbMiwgOF0sIFwieVwiKTtcbiAgY29tcEJvYXJkLnBsYWNlU2hpcChbNiwgM10sIFwieVwiKTtcbiAgY29tcEJvYXJkLnBsYWNlU2hpcChbNywgNV0sIFwieFwiKTtcblxuICBjb25zdCBzZXRQbGF5ZXIgPSAobmFtZSkgPT4ge1xuICAgIGlmIChwbGF5ZXIgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgIHBsYXllciA9IFBsYXllcihuYW1lKTtcbiAgfTtcblxuICBjb25zdCBnZXRHYW1lQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgZ2FtZUJvYXJkcyA9IHtcbiAgICAgIHBsYXllcjogcGxheWVyQm9hcmQuc2hvd0dhbWVCb2FyZCgpLFxuICAgICAgY29tcDogY29tcEJvYXJkLnNob3dHYW1lQm9hcmQoKSxcbiAgICB9O1xuICAgIHJldHVybiBnYW1lQm9hcmRzO1xuICB9O1xuXG4gIGNvbnN0IHBsYXllckF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICBpZiAocGxheWVyLnNob3dUdXJuKCkgPT09IGZhbHNlKSByZXR1cm47XG4gICAgcGxheWVyLmF0dGFja0JvYXJkKGNvb3JkcywgY29tcEJvYXJkLnJlY2VpdmVBdHRhY2ssIGNvbXAuc3RhcnRUdXJuKTtcbiAgICBtZXNzYWdlID0gY29tcEJvYXJkLmFubm91bmNlKCk7XG4gICAgaWYgKGNvbXBCb2FyZC5hbm5vdW5jZSgpID09PSBcIkFsbCBzaGlwcyBoYXMgYmVlbiBzYW5rIVwiKVxuICAgICAgd2lubmVyID0gcGxheWVyLnNob3dOYW1lKCk7XG4gIH07XG5cbiAgY29uc3QgY29tcEF0dGFjayA9ICgpID0+IHtcbiAgICBpZiAoY29tcC5zaG93VHVybigpID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIGNvbXAuZW50ZXJDb29yZHMocGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjaywgcGxheWVyLnN0YXJ0VHVybik7XG4gICAgbWVzc2FnZSA9IHBsYXllckJvYXJkLmFubm91bmNlKCk7XG4gICAgaWYgKHBsYXllckJvYXJkLmFubm91bmNlKCkgPT09IFwiQWxsIHNoaXBzIGhhcyBiZWVuIHNhbmshXCIpXG4gICAgICB3aW5uZXIgPSBcIkNvbW1hbmRlciBBLkkuXCI7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGNvb3JkcykgPT4ge1xuICAgIGlmICh3aW5uZXIpIHJldHVybjtcbiAgICBwbGF5ZXJBdHRhY2soY29vcmRzKTtcbiAgICBpZiAod2lubmVyKSByZXR1cm47XG4gICAgY29tcEF0dGFjaygpO1xuICB9O1xuXG4gIGNvbnN0IHNob3dNZXNzYWdlID0gKCkgPT4ge1xuICAgIGlmICghbWVzc2FnZSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHdpbm5lcikge1xuICAgICAgaWYgKCFjYWxsV2lubmVyKSB7XG4gICAgICAgIGNhbGxXaW5uZXIgPSB0cnVlO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIG1lc3NhZ2UgPSBgJHt3aW5uZXJ9IGlzIHRoZSB3aW5uZXIhYDtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH1cblxuICAgIHJldHVybiBtZXNzYWdlO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHNldFBsYXllclNoaXAoY29vcmRzLCBheGlzKSB7XG4gICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKGNvb3JkcywgYXhpcyk7XG4gICAgbWVzc2FnZSA9IHBsYXllckJvYXJkLmFubm91bmNlKCk7XG4gIH1cblxuICByZXR1cm4geyBzZXRQbGF5ZXIsIGdldEdhbWVCb2FyZCwgYXR0YWNrLCBzaG93TWVzc2FnZSwgc2V0UGxheWVyU2hpcCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQge1xcbiAgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHtcXG4gIC8qIDEgKi9cXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXG4gKi9cXG5cXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5sZWdlbmQge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXG4gKi9cXG5cXG5wcm9ncmVzcyB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxuICovXFxuXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxuICovXFxuXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcbiAqL1xcblxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXG59XFxuXFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5cXG5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdW1tYXJ5IHtcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXG59XFxuXFxuLyogTWlzY1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRlbXBsYXRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcbiAqL1xcblxcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qIGNvbG9yIHBhbGV0dGVcXG4gICAgIzkwYTNiNFxcdCgxNDQsMTYzLDE4MClcXG4gICAgIzU2N2Q5Y1xcdCg4NiwxMjUsMTU2KVxcbiAgICAjMGY0MTYyXFx0KDE1LDY1LDk4KVxcbiAgICAjMDkyNzNhXFx0KDksMzksNTgpXFxuICAgICMxYzI2NDFcXHQoMjgsMzgsNjUpXFxuICAgIGh0dHBzOi8vd3d3LmNvbG9yLWhleC5jb20vY29sb3ItcGFsZXR0ZS83MDc3MlxcblxcblxcbiAgICAjOTliNWMzXFx0KDE1MywxODEsMTk1KVxcbiAgICAjNGM3ZTk3XFx0KDc2LDEyNiwxNTEpXFxuICAgICMwMDQ4NmJcXHQoMCw3MiwxMDcpXFxuICAgICNmZmZmZmZcXHQoMjU1LDI1NSwyNTUpXFxuICAgIGh0dHBzOi8vd3d3LmNvbG9yLWhleC5jb20vY29sb3ItcGFsZXR0ZS82OTYxMFxcbiovXFxuXFxuYm9keSB7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDcwcHggMWZyIDY4cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTliNWMzO1xcbn1cXG5cXG5tYWluIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1pbi1oZWlnaHQ6IDgwM3B4O1xcbiAgbWluLXdpZHRoOiA5MDhweDtcXG59XFxuXFxuaGVhZGVyLFxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjN2U5NztcXG59XFxuXFxuaGVhZGVyIGgxIHtcXG4gIGZvbnQtc2l6ZTogMi42cmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXG4gIGNvbG9yOiAjOTliNWMzO1xcbiAgdGV4dC1zaGFkb3c6IDRweCAxcHggYmxhY2s7XFxuICBwYWRkaW5nOiA0cHggOHB4O1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbmZvcm0jcGxheWVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luLXRvcDogNzZweDtcXG4gIHJvdy1nYXA6IDI4cHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5mb3JtI3BsYXllciA+IGxhYmVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuXFxubGFiZWwgaW5wdXQge1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgcGFkZGluZzogMnB4IDZweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuZm9ybSNwbGF5ZXIgYnV0dG9uIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIHBhZGRpbmc6IDJweCA4cHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbn1cXG5cXG5zZWN0aW9uI3BsYWNlIHtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG59XFxuXFxuc2VjdGlvbiNwbGFjZSBidXR0b24ge1xcbiAgaGVpZ2h0OiBtYXgtY29udGVudDtcXG4gIHBhZGRpbmc6IDRweCA4cHg7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbnNlY3Rpb24jcGxhY2UgZGl2I3BsQm9hcmQge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgbWFyZ2luLXRvcDogMzBweDtcXG4gIGdhcDogNHB4O1xcbn1cXG5cXG5zZWN0aW9uIGRpdiNwbEJvYXJkLFxcbnNlY3Rpb24gZGl2LmJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDRweDtcXG4gIG91dGxpbmU6IDJweCBzb2xpZCBibGFjaztcXG4gIHBhZGRpbmc6IDJweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiB7XFxuICBoZWlnaHQ6IDMwMHB4O1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBhZGRpbmctdG9wOiA4MHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIDMwcHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAzMHB4O1xcbiAgZ2FwOiA0cHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyID4gZGl2LnJlZmVyZW5jZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjViN2I4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIuYXhpc1kge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KGF1dG8tZml0LCAzMHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2NvbW1hbmRlciB7XFxuICB3aWR0aDogMTY4cHg7XFxuICBoZWlnaHQ6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNjb21tYW5kZXIuYXhpc1kge1xcbiAgaGVpZ2h0OiAxNjhweDtcXG4gIHdpZHRoOiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjYmF0dGxlc2hpcCB7XFxuICB3aWR0aDogMTM0cHg7XFxuICBoZWlnaHQ6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNiYXR0bGVzaGlwLmF4aXNZIHtcXG4gIGhlaWdodDogMTMzcHg7XFxuICB3aWR0aDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2Rlc3Ryb3llcixcXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjc3VibWFyaW5lIHtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGhlaWdodDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2Rlc3Ryb3llci5heGlzWSxcXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjc3VibWFyaW5lLmF4aXNZIHtcXG4gIGhlaWdodDogMTAwcHg7XFxuICB3aWR0aDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI3BhdHJvbEJvYXQge1xcbiAgd2lkdGg6IDY2cHg7XFxuICBoZWlnaHQ6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNwYXRyb2xCb2F0LmF4aXNZIHtcXG4gIGhlaWdodDogNjZweDtcXG4gIHdpZHRoOiAzM3B4O1xcbn1cXG5cXG5zZWN0aW9uIGRpdiBkaXYuZ3JpZCB7XFxuICBib3JkZXI6IDA7XFxuICBvdXRsaW5lOiAxcHggc29saWQgYmxhY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbn1cXG5cXG5zZWN0aW9uIGRpdiBkaXYuZ3JpZC5zaGlwLFxcbmRpdiNzZWxlY3Rpb24gZGl2IGRpdiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDFkNWQ2O1xcbn1cXG5cXG5zZWN0aW9uI2dhbWUgZGl2IGRpdi5ncmlkLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMC43KTtcXG59XFxuXFxuc2VjdGlvbiNnYW1lIGRpdiBkaXYuZ3JpZC5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMjU1LCAwLjcpO1xcbn1cXG5cXG5zZWN0aW9uI2dhbWUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIC8qIGdyaWQtdGVtcGxhdGUtcm93czogMjUwcHggMWZyOyAqL1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4vKiBzZWN0aW9uI2dhbWUgXFxuaDIjbm90aWNlIHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTczLCAyNTUsIDE3Myk7XFxuICB3aWR0aDogNTAwcHg7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyLCA1OCwgMjIpO1xcbiAgY29sb3I6IHJnYigyNDEsIDIyNSwgMTM0KTtcXG4gIGZvbnQtZmFtaWx5OiAnQ291cmllciBOZXcnLCBDb3VyaWVyLCBtb25vc3BhY2U7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcXG59ICovXFxuXFxuc2VjdGlvbiNnYW1lIGRpdi5ib2FyZCB7XFxuICBtYXJnaW4tdG9wOiAxNDBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMThweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMThweCk7XFxufVxcblxcbnNlY3Rpb24jbm90aWNlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTQsIDI1NCwgMC4zKTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMzBweDtcXG59XFxuXFxuc2VjdGlvbi5oaWRkZW4ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbmZvb3RlciBhOmhvdmVyIHtcXG4gIGZpbHRlcjogZHJvcC1zaGFkb3coMCAwIDJweCB3aGl0ZSk7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsMkVBQTJFOztBQUUzRTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjtFQUNFLGlCQUFpQixFQUFFLE1BQU07RUFDekIsOEJBQThCLEVBQUUsTUFBTTtBQUN4Qzs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsU0FBUztBQUNYOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsdUJBQXVCLEVBQUUsTUFBTTtFQUMvQixTQUFTLEVBQUUsTUFBTTtFQUNqQixpQkFBaUIsRUFBRSxNQUFNO0FBQzNCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLGlDQUFpQyxFQUFFLE1BQU07RUFDekMsY0FBYyxFQUFFLE1BQU07QUFDeEI7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFF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Q2I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFNBQVM7RUFDVCx3QkFBd0I7RUFDeEIsc0JBQXNCO0FBQ3hCOztBQUVBOztFQUVFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUNBQW1DO0VBQ25DLHFCQUFxQjtBQUN2Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7O0FBRUg7RUFDRSxpQkFBaUI7RUFDakIsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSwwQ0FBMEM7RUFDMUMsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQge1xcbiAgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHtcXG4gIC8qIDEgKi9cXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXG4gKi9cXG5cXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5sZWdlbmQge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXG4gKi9cXG5cXG5wcm9ncmVzcyB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxuICovXFxuXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxuICovXFxuXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcbiAqL1xcblxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXG59XFxuXFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5cXG5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdW1tYXJ5IHtcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXG59XFxuXFxuLyogTWlzY1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRlbXBsYXRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcbiAqL1xcblxcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qIGNvbG9yIHBhbGV0dGVcXG4gICAgIzkwYTNiNFxcdCgxNDQsMTYzLDE4MClcXG4gICAgIzU2N2Q5Y1xcdCg4NiwxMjUsMTU2KVxcbiAgICAjMGY0MTYyXFx0KDE1LDY1LDk4KVxcbiAgICAjMDkyNzNhXFx0KDksMzksNTgpXFxuICAgICMxYzI2NDFcXHQoMjgsMzgsNjUpXFxuICAgIGh0dHBzOi8vd3d3LmNvbG9yLWhleC5jb20vY29sb3ItcGFsZXR0ZS83MDc3MlxcblxcblxcbiAgICAjOTliNWMzXFx0KDE1MywxODEsMTk1KVxcbiAgICAjNGM3ZTk3XFx0KDc2LDEyNiwxNTEpXFxuICAgICMwMDQ4NmJcXHQoMCw3MiwxMDcpXFxuICAgICNmZmZmZmZcXHQoMjU1LDI1NSwyNTUpXFxuICAgIGh0dHBzOi8vd3d3LmNvbG9yLWhleC5jb20vY29sb3ItcGFsZXR0ZS82OTYxMFxcbiovXFxuXFxuYm9keSB7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDcwcHggMWZyIDY4cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTliNWMzO1xcbn1cXG5cXG5tYWluIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1pbi1oZWlnaHQ6IDgwM3B4O1xcbiAgbWluLXdpZHRoOiA5MDhweDtcXG59XFxuXFxuaGVhZGVyLFxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjN2U5NztcXG59XFxuXFxuaGVhZGVyIGgxIHtcXG4gIGZvbnQtc2l6ZTogMi42cmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXG4gIGNvbG9yOiAjOTliNWMzO1xcbiAgdGV4dC1zaGFkb3c6IDRweCAxcHggYmxhY2s7XFxuICBwYWRkaW5nOiA0cHggOHB4O1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbmZvcm0jcGxheWVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luLXRvcDogNzZweDtcXG4gIHJvdy1nYXA6IDI4cHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5mb3JtI3BsYXllciA+IGxhYmVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuXFxubGFiZWwgaW5wdXQge1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgcGFkZGluZzogMnB4IDZweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuZm9ybSNwbGF5ZXIgYnV0dG9uIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIHBhZGRpbmc6IDJweCA4cHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbn1cXG5cXG5zZWN0aW9uI3BsYWNlIHtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG59XFxuXFxuc2VjdGlvbiNwbGFjZSBidXR0b24ge1xcbiAgaGVpZ2h0OiBtYXgtY29udGVudDtcXG4gIHBhZGRpbmc6IDRweCA4cHg7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbnNlY3Rpb24jcGxhY2UgZGl2I3BsQm9hcmQge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgbWFyZ2luLXRvcDogMzBweDtcXG4gIGdhcDogNHB4O1xcbn1cXG5cXG5zZWN0aW9uIGRpdiNwbEJvYXJkLFxcbnNlY3Rpb24gZGl2LmJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDRweDtcXG4gIG91dGxpbmU6IDJweCBzb2xpZCBibGFjaztcXG4gIHBhZGRpbmc6IDJweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiB7XFxuICBoZWlnaHQ6IDMwMHB4O1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBhZGRpbmctdG9wOiA4MHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIDMwcHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAzMHB4O1xcbiAgZ2FwOiA0cHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyID4gZGl2LnJlZmVyZW5jZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjViN2I4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIuYXhpc1kge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KGF1dG8tZml0LCAzMHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2NvbW1hbmRlciB7XFxuICB3aWR0aDogMTY4cHg7XFxuICBoZWlnaHQ6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNjb21tYW5kZXIuYXhpc1kge1xcbiAgaGVpZ2h0OiAxNjhweDtcXG4gIHdpZHRoOiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjYmF0dGxlc2hpcCB7XFxuICB3aWR0aDogMTM0cHg7XFxuICBoZWlnaHQ6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNiYXR0bGVzaGlwLmF4aXNZIHtcXG4gIGhlaWdodDogMTMzcHg7XFxuICB3aWR0aDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2Rlc3Ryb3llcixcXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjc3VibWFyaW5lIHtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGhlaWdodDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2Rlc3Ryb3llci5heGlzWSxcXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjc3VibWFyaW5lLmF4aXNZIHtcXG4gIGhlaWdodDogMTAwcHg7XFxuICB3aWR0aDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI3BhdHJvbEJvYXQge1xcbiAgd2lkdGg6IDY2cHg7XFxuICBoZWlnaHQ6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNwYXRyb2xCb2F0LmF4aXNZIHtcXG4gIGhlaWdodDogNjZweDtcXG4gIHdpZHRoOiAzM3B4O1xcbn1cXG5cXG5zZWN0aW9uIGRpdiBkaXYuZ3JpZCB7XFxuICBib3JkZXI6IDA7XFxuICBvdXRsaW5lOiAxcHggc29saWQgYmxhY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbn1cXG5cXG5zZWN0aW9uIGRpdiBkaXYuZ3JpZC5zaGlwLFxcbmRpdiNzZWxlY3Rpb24gZGl2IGRpdiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDFkNWQ2O1xcbn1cXG5cXG5zZWN0aW9uI2dhbWUgZGl2IGRpdi5ncmlkLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMC43KTtcXG59XFxuXFxuc2VjdGlvbiNnYW1lIGRpdiBkaXYuZ3JpZC5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMjU1LCAwLjcpO1xcbn1cXG5cXG5zZWN0aW9uI2dhbWUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIC8qIGdyaWQtdGVtcGxhdGUtcm93czogMjUwcHggMWZyOyAqL1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4vKiBzZWN0aW9uI2dhbWUgXFxuaDIjbm90aWNlIHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTczLCAyNTUsIDE3Myk7XFxuICB3aWR0aDogNTAwcHg7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyLCA1OCwgMjIpO1xcbiAgY29sb3I6IHJnYigyNDEsIDIyNSwgMTM0KTtcXG4gIGZvbnQtZmFtaWx5OiAnQ291cmllciBOZXcnLCBDb3VyaWVyLCBtb25vc3BhY2U7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcXG59ICovXFxuXFxuc2VjdGlvbiNnYW1lIGRpdi5ib2FyZCB7XFxuICBtYXJnaW4tdG9wOiAxNDBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMThweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMThweCk7XFxufVxcblxcbnNlY3Rpb24jbm90aWNlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTQsIDI1NCwgMC4zKTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMzBweDtcXG59XFxuXFxuc2VjdGlvbi5oaWRkZW4ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbmZvb3RlciBhOmhvdmVyIHtcXG4gIGZpbHRlcjogZHJvcC1zaGFkb3coMCAwIDJweCB3aGl0ZSk7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvR2l0SHViLU1hcmstTGlnaHQtMzJweC5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbi8vIE1vZHVsZVxudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzBfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8wX19fKTtcbnZhciBjb2RlID0gXCI8IURPQ1RZUEUgaHRtbD5cXG48aHRtbCBsYW5nPVxcXCJlblxcXCI+XFxuICA8aGVhZD5cXG4gICAgPG1ldGEgY2hhcnNldD1cXFwiVVRGLThcXFwiIC8+XFxuICAgIDxtZXRhIGh0dHAtZXF1aXY9XFxcIlgtVUEtQ29tcGF0aWJsZVxcXCIgY29udGVudD1cXFwiSUU9ZWRnZVxcXCIgLz5cXG4gICAgPG1ldGEgbmFtZT1cXFwidmlld3BvcnRcXFwiIGNvbnRlbnQ9XFxcIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcXFwiIC8+XFxuICAgIDx0aXRsZT5CYXR0bGVzaGlwPC90aXRsZT5cXG4gIDwvaGVhZD5cXG4gIDxib2R5PlxcbiAgICA8aGVhZGVyPlxcbiAgICAgIDxoMT5CYXR0bGVzaGlwPC9oMT5cXG4gICAgPC9oZWFkZXI+XFxuICAgIDxtYWluPlxcbiAgICAgIDxzZWN0aW9uIGlkPVxcXCJzdGFydFxcXCI+XFxuICAgICAgICA8Zm9ybSBhY3Rpb249XFxcIlxcXCIgbWV0aG9kPVxcXCJnZXRcXFwiIGlkPVxcXCJwbGF5ZXJcXFwiPlxcbiAgICAgICAgICA8bGFiZWwgZm9yPVxcXCJwTmFtZVxcXCI+XFxuICAgICAgICAgICAgPHA+RW50ZXIgUGxheWVyIE5hbWU6PC9wPlxcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCJuYW1lXFxcIiBpZD1cXFwicE5hbWVcXFwiIHJlcXVpcmVkIC8+XFxuICAgICAgICAgIDwvbGFiZWw+XFxuICAgICAgICAgIDxidXR0b24+U3RhcnQgR2FtZSE8L2J1dHRvbj5cXG4gICAgICAgIDwvZm9ybT5cXG4gICAgICA8L3NlY3Rpb24+XFxuICAgICAgPHNlY3Rpb24gaWQ9XFxcInBsYWNlXFxcIiBjbGFzcz1cXFwiaGlkZGVuXFxcIj5cXG4gICAgICAgIDxoMiBjbGFzcz1cXFwibm90aWNlXFxcIj5TZXQgeW91ciBTaGlwczwvaDI+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCJheGlzXFxcIj5Ib3Jpem9udGFsPC9idXR0b24+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJwbEJvYXJkXFxcIj48L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcInNlbGVjdGlvblxcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXBIb2xkZXJcXFwiIGlkPVxcXCJjb21tYW5kZXJcXFwiIGRyYWdnYWJsZT1cXFwidHJ1ZVxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwIHJlZmVyZW5jZVxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXBcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXBIb2xkZXJcXFwiIGlkPVxcXCJiYXR0bGVzaGlwXFxcIiBkcmFnZ2FibGU9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcCByZWZlcmVuY2VcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXBcXFwiPjwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2hpcEhvbGRlclxcXCIgaWQ9XFxcImRlc3Ryb3llclxcXCIgZHJhZ2dhYmxlPVxcXCJ0cnVlXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXAgcmVmZXJlbmNlXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXBcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzaGlwSG9sZGVyXFxcIiBpZD1cXFwic3VibWFyaW5lXFxcIiBkcmFnZ2FibGU9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcCByZWZlcmVuY2VcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXBIb2xkZXJcXFwiIGlkPVxcXCJwYXRyb2xCb2F0XFxcIiBkcmFnZ2FibGU9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcCByZWZlcmVuY2VcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJiYXR0bGVcXFwiPlN0YXJ0IGJhdHRsZSE8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvc2VjdGlvbj5cXG4gICAgICA8c2VjdGlvbiBpZD1cXFwiZ2FtZVxcXCIgY2xhc3M9XFxcImhpZGRlblxcXCI+XFxuICAgICAgICA8IS0tIDxoMiBpZD1cXFwibm90aWNlXFxcIj5UZXN0IHRyYW5zbWlzc2lvbi4uLjwvaDI+IC0tPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiZ2FtZVBsQm9hcmRcXFwiIGNsYXNzPVxcXCJib2FyZFxcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJnYW1lQ29tcEJvYXJkXFxcIiBjbGFzcz1cXFwiYm9hcmRcXFwiPjwvZGl2PlxcbiAgICAgIDwvc2VjdGlvbj5cXG4gICAgPC9tYWluPlxcbiAgICA8c2VjdGlvbiBpZD1cXFwibm90aWNlXFxcIiBjbGFzcz1cXFwiaGlkZGVuXFxcIj5cXG4gICAgICA8aDIgaWQ9XFxcImFubm91bmNlXFxcIj5UaGUgd2lubmVyIGlzIFBsYXllcjwvaDI+XFxuICAgICAgPGJ1dHRvbiBpZD1cXFwicmVzdGFydFxcXCI+UmVzdGFydDwvYnV0dG9uPlxcbiAgICA8L3NlY3Rpb24+XFxuICAgIDxmb290ZXI+XFxuICAgICAgPGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL1JoYXp6WElYXFxcIj5cXG4gICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzBfX18gKyBcIlxcXCIgYWx0PVxcXCJHaXRIdWJcXFwiIC8+XFxuICAgICAgPC9hPlxcbiAgICA8L2Zvb3Rlcj5cXG4gIDwvYm9keT5cXG48L2h0bWw+XFxuXCI7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZSwgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLm1heWJlTmVlZFF1b3RlcyAmJiAvW1xcdFxcblxcZlxcciBcIic9PD5gXS8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwsIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIi4vaW5kZXguaHRtbFwiO1xuaW1wb3J0IGNvbnRyb2xET00gZnJvbSBcIi4vbW9kdWxlcy9ET01jb250cm9sXCI7Il0sIm5hbWVzIjpbImRlZmF1bHQiLCJhdHRhY2hEaXZHcmlkIiwicmVtb3ZlR3JpZCIsIkdhbWUiLCJwYXJzZUdyaWRDb29yZHMiLCJjb250cm9sRE9NIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm1haW4iLCJzdGFydFNlY3Rpb24iLCJwbGF5ZXJGb3JtIiwicGxheWVySW5wdXQiLCJzdGFydEJ0biIsInBsYWNlU2hpcFNlY3Rpb24iLCJheGlzQnRuIiwicGxhY2VTaGlwQm9hcmQiLCJzaGlwU2VsZWN0aW9uIiwiZG9tQ29tbWFuZGVyIiwiZG9tQmF0dGxlc2hpcCIsImRvbURlc3Ryb3llciIsImRvbVN1Ym1hcmluZSIsImRvbVBhdHJvbEJvYXQiLCJiYXR0bGVCdG4iLCJnYW1lU2VjdGlvbiIsImdhbWVQbEJvYXJkIiwiZ2FtZUNvbXBCb2FyZCIsIm5vdGljZVNlY3Rpb24iLCJ3aW5uZXJOb3RpY2UiLCJyZXN0YXJ0QnRuIiwicmVtb3ZlQ2hpbGQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJnYW1lIiwiZ2V0Qm9hcmRzIiwiYXhpcyIsImdhbWVGaW5pc2hlZCIsInVwZGF0ZUFwcEJvYXJkIiwiZ2V0R2FtZUJvYXJkIiwiY2hhbmdlQXhpcyIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ0ZXh0Q29udGVudCIsInRvZ2dsZSIsInVwZGF0ZURPTUJvYXJkIiwicGxheWVyQm9hcmQiLCJjb21wQm9hcmQiLCJwbGF5ZXIiLCJjb21wIiwiYW5ub3VuY2VXaW5uZXIiLCJhcHBlbmRDaGlsZCIsInNob3dNZXNzYWdlIiwiZ3JpZENsaWNrRXZlbnQiLCJpbmRleCIsImNvb3JkIiwiYXR0YWNrIiwic2V0VGltZW91dCIsImFkZEdyaWRDbGlja0V2ZW50IiwiY29tcEdyaWRzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJncmlkIiwiaiIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b2dnbGVTaGlwU2VsZWN0aW9uIiwiY29udGFpbnMiLCJzZXRTaGlwRXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNvb3JkcyIsInNldFBsYXllclNoaXAiLCJzZXREcmFnTkRyb3BFdmVudHMiLCJwbEJvYXJkIiwicGxHcmlkcyIsImV2ZW50IiwiYmluZCIsImxvYWRHYW1lIiwic2V0UGxheWVyIiwidmFsdWUiLCJzdGFydEJhdHRsZSIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY3JlYXRlR3JpZCIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJzaG90Iiwic2hpcCIsImh0bWxCb2FyZCIsImdhbWVCb2FyZCIsInJvdyIsImdyaWRzIiwieCIsInkiLCJNYXRoIiwiZmxvb3IiLCJjb21tYW5kZXJBSSIsImF0dGFja0Nvb3Jkc0VudGVyZWQiLCJ0dXJuIiwiZ2VuZXJhdGVDb29yZHMiLCJyYW5kb20iLCJjaGVja0Nvb3JkaW5hdGVzIiwiZW50ZXJlZCIsImNvb3Jkc0NvcHkiLCJlbnRyeSIsInB1c2giLCJpIiwiYXJyIiwiYSIsImIiLCJzcGxpY2UiLCJlbnRlckNvb3JkcyIsImVuZW15Qm9hcmQiLCJwbGF5ZXJUdXJuIiwibGVuZ3RoIiwic2hvd1R1cm4iLCJzdGFydFR1cm4iLCJTaGlwIiwiR2FtZUJvYXJkIiwiY29tbWFuZGVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJwbGFjZWRTaGlwIiwiYW5ub3VuY2VtZW50Iiwic2hvd0dhbWVCb2FyZCIsImRpc3BsYXllZEdhbWVib2FyZCIsImRpc3BsYXllZFJvdyIsImRpcGxheWVkR3JpZCIsInNwYXduQ29vcmRzIiwiX3JlZiIsInNoaXBMZW5ndGgiLCJ4QXhpcyIsInlBeGlzIiwiY29vcmRpbmF0ZXMiLCJuZXh0Q29vcmRzIiwiZ2V0U2hpcEluT3JkZXIiLCJjaGVja0Nvb3JkcyIsImdyaWRPayIsInBsYWNlU2hpcCIsImFwcHJvcHJpYXRlU2hpcCIsImdldExlbmd0aCIsImNvb3Jkc09LIiwiZ2V0TmFtZSIsImF0dGFja1NoaXAiLCJzaGlwTmFtZSIsImhpdCIsInJlcG9ydEF0dGFja0NvbmRpdGlvbiIsInZlc3NlbCIsImZpbmQiLCJpc1N1bmsiLCJmaW5kSW5kZXgiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrUmVjZWl2ZWQiLCJhbm5vdW5jZSIsIlBsYXllciIsIm5hbWUiLCJwbGF5ZXJOYW1lIiwic2hvd05hbWUiLCJhdHRhY2tCb2FyZCIsImJvYXJkIiwiZW5lbXlUdXJuIiwibm90T0siLCJoaXRSZWNlaXZlZCIsIm1lc3NhZ2UiLCJ3aW5uZXIiLCJjYWxsV2lubmVyIiwiZ2FtZWJvYXJkcyIsInVuZGVmaW5lZCIsImdhbWVCb2FyZHMiLCJwbGF5ZXJBdHRhY2siLCJjb21wQXR0YWNrIl0sInNvdXJjZVJvb3QiOiIifQ==