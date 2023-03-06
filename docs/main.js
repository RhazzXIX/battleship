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
  const gameSection = main.querySelector("section#game");
  const gamePlBoard = gameSection.querySelector("div#gamePlBoard");
  const gameCompBoard = gameSection.querySelector("div#gameCompBoard");
  const noticeSection = body.querySelector("section#notice");
  const winnerNotice = noticeSection.querySelector("h2#announce");
  const restartBtn = noticeSection.querySelector("button#restart");

  // Initial Load
  main.removeChild(placeShipSection);
  placeShipSection.classList.remove("hidden");
  main.removeChild(gameSection);
  gameSection.classList.remove("hidden");
  body.removeChild(noticeSection);
  noticeSection.classList.remove("hidden");
  const game = (0,_game__WEBPACK_IMPORTED_MODULE_1__["default"])();
  let boards;

  // Functions for DOM control

  const gridClickEvent = index => {
    const coord = (0,_doms_parseGridCoords__WEBPACK_IMPORTED_MODULE_2__["default"])(index);
    game.attack(coord);
    (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__.removeGrid)(gamePlBoard);
    (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(gamePlBoard, game.getGameBoard().player, "player");
    (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__.removeGrid)(gameCompBoard);
    (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(gameCompBoard, game.getGameBoard().comp);
  };
  function addGridClickEvent() {
    const compGrids = gameCompBoard.querySelectorAll("div.grid");
    compGrids.forEach((grid, j) => {
      grid.addEventListener("click", e => {
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
    boards = game.getGameBoard();
    (0,_doms_divBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(placeShipBoard, boards.player, "player");
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
  playerBoard.placeShip([0, 0], "x");
  playerBoard.placeShip([3, 0], "x");
  playerBoard.placeShip([2, 8], "y");
  playerBoard.placeShip([6, 3], "y");
  playerBoard.placeShip([7, 5], "x");
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
      message = `${player.showName()} is the winner!`;
      return message;
    }
    return message;
  };
  return {
    setPlayer,
    getGameBoard,
    attack,
    showMessage
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
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n\n/* color palette\n    #90a3b4\t(144,163,180)\n    #567d9c\t(86,125,156)\n    #0f4162\t(15,65,98)\n    #09273a\t(9,39,58)\n    #1c2641\t(28,38,65)\n    https://www.color-hex.com/color-palette/70772\n\n\n    #99b5c3\t(153,181,195)\n    #4c7e97\t(76,126,151)\n    #00486b\t(0,72,107)\n    #ffffff\t(255,255,255)\n    https://www.color-hex.com/color-palette/69610\n*/\n\nbody {\n  font-size: 16px;\n  display: grid;\n  min-height: 100vh;\n  grid-template-rows: 70px 1fr 68px;\n  background-color: #99b5c3;\n}\n\nmain {\n  position: relative;\n}\n\nheader,\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nheader {\n  background-color: #4c7e97;\n}\n\nheader h1 {\n  font-size: 2.6rem;\n  letter-spacing: 2px;\n  color: #99b5c3;\n  text-shadow: 4px 1px black;\n  padding: 4px 8px;\n}\n\nsection {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\nform#player {\n  display: flex;\n  flex-direction: column;\n  margin-top: 76px;\n  row-gap: 28px;\n  align-items: center;\n}\n\nform#player > label {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-size: 1.6rem;\n  font-weight: 700;\n}\n\nlabel input {\n  border-radius: 6px;\n  padding: 2px 6px;\n  text-align: center;\n}\n\nform#player button {\n  width: fit-content;\n  padding: 2px 8px;\n  font-weight: 700;\n  border-radius: 8px;\n}\n\nsection#place {\n  align-items: center;\n  padding-top: 20px;\n}\n\nsection#place div#plBoard {\n  grid-template-columns: repeat(10, 30px);\n  grid-template-rows: repeat(10, 30px);\n  margin-top: 30px;\n  gap: 3px;\n}\n\nsection div#plBoard,\nsection div.board {\n  display: grid;\n  gap: 3px;\n  outline: 2px solid black;\n}\n\nsection div div.grid {\n  border: 0;\n  outline: 1px solid black;\n  background-color: aqua;\n}\n\nsection div div.grid.ship {\n  background-color: #90a3b4;\n}\n\nsection#game div div.grid.hit {\n  background-color: rgba(255, 0, 0, 0.7);\n}\n\nsection#game div div.grid.miss {\n  background-color: rgba(0, 0, 255, 0.7);\n}\n\nsection#game {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  /* grid-template-rows: 250px 1fr; */\n  justify-items: center;\n}\n\n/* section#game \nh2#notice {\n  grid-column: 1 / -1;\n  align-self: center;\n  border: 1px solid rgb(173, 255, 173);\n  width: 500px;\n  height: 80px;\n  border-radius: 10px;\n  background-color: rgb(22, 58, 22);\n  color: rgb(241, 225, 134);\n  font-family: 'Courier New', Courier, monospace;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  letter-spacing: 1px;\n} */\n\nsection#game div.board {\n  margin-top: 140px;\n  display: grid;\n  grid-template-columns: repeat(10, 18px);\n  grid-template-rows: repeat(10, 18px);\n}\n\nsection#notice {\n  background-color: rgba(255, 254, 254, 0.3);\n  justify-content: center;\n  align-items: center;\n  gap: 30px;\n}\n\nsection.hidden {\n  visibility: hidden;\n}\n\nfooter {\n  background-color: black;\n}\n\nfooter a:hover {\n  filter: drop-shadow(0 0 2px white);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n\n/* color palette\n    #90a3b4\t(144,163,180)\n    #567d9c\t(86,125,156)\n    #0f4162\t(15,65,98)\n    #09273a\t(9,39,58)\n    #1c2641\t(28,38,65)\n    https://www.color-hex.com/color-palette/70772\n\n\n    #99b5c3\t(153,181,195)\n    #4c7e97\t(76,126,151)\n    #00486b\t(0,72,107)\n    #ffffff\t(255,255,255)\n    https://www.color-hex.com/color-palette/69610\n*/\n\nbody {\n  font-size: 16px;\n  display: grid;\n  min-height: 100vh;\n  grid-template-rows: 70px 1fr 68px;\n  background-color: #99b5c3;\n}\n\nmain {\n  position: relative;\n}\n\nheader,\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nheader {\n  background-color: #4c7e97;\n}\n\nheader h1 {\n  font-size: 2.6rem;\n  letter-spacing: 2px;\n  color: #99b5c3;\n  text-shadow: 4px 1px black;\n  padding: 4px 8px;\n}\n\nsection {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\nform#player {\n  display: flex;\n  flex-direction: column;\n  margin-top: 76px;\n  row-gap: 28px;\n  align-items: center;\n}\n\nform#player > label {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-size: 1.6rem;\n  font-weight: 700;\n}\n\nlabel input {\n  border-radius: 6px;\n  padding: 2px 6px;\n  text-align: center;\n}\n\nform#player button {\n  width: fit-content;\n  padding: 2px 8px;\n  font-weight: 700;\n  border-radius: 8px;\n}\n\nsection#place {\n  align-items: center;\n  padding-top: 20px;\n}\n\nsection#place div#plBoard {\n  grid-template-columns: repeat(10, 30px);\n  grid-template-rows: repeat(10, 30px);\n  margin-top: 30px;\n  gap: 3px;\n}\n\nsection div#plBoard,\nsection div.board {\n  display: grid;\n  gap: 3px;\n  outline: 2px solid black;\n}\n\nsection div div.grid {\n  border: 0;\n  outline: 1px solid black;\n  background-color: aqua;\n}\n\nsection div div.grid.ship {\n  background-color: #90a3b4;\n}\n\nsection#game div div.grid.hit {\n  background-color: rgba(255, 0, 0, 0.7);\n}\n\nsection#game div div.grid.miss {\n  background-color: rgba(0, 0, 255, 0.7);\n}\n\nsection#game {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  /* grid-template-rows: 250px 1fr; */\n  justify-items: center;\n}\n\n/* section#game \nh2#notice {\n  grid-column: 1 / -1;\n  align-self: center;\n  border: 1px solid rgb(173, 255, 173);\n  width: 500px;\n  height: 80px;\n  border-radius: 10px;\n  background-color: rgb(22, 58, 22);\n  color: rgb(241, 225, 134);\n  font-family: 'Courier New', Courier, monospace;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  letter-spacing: 1px;\n} */\n\nsection#game div.board {\n  margin-top: 140px;\n  display: grid;\n  grid-template-columns: repeat(10, 18px);\n  grid-template-rows: repeat(10, 18px);\n}\n\nsection#notice {\n  background-color: rgba(255, 254, 254, 0.3);\n  justify-content: center;\n  align-items: center;\n  gap: 30px;\n}\n\nsection.hidden {\n  visibility: hidden;\n}\n\nfooter {\n  background-color: black;\n}\n\nfooter a:hover {\n  filter: drop-shadow(0 0 2px white);\n}\n"],"sourceRoot":""}]);
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
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Battleship</title>\n  </head>\n  <body>\n    <header>\n      <h1>Battleship</h1>\n    </header>\n    <main>\n      <section id=\"start\">\n        <form action=\"\" method=\"get\" id=\"player\">\n          <label for=\"pName\">\n            <p>Enter Player Name:</p>\n            <input type=\"text\" name=\"name\" id=\"pName\" required />\n          </label>\n          <button>Start Game!</button>\n        </form>\n      </section>\n      <section id=\"place\" class=\"hidden\">\n        <h2 class=\"notice\">Set your Commander</h2>\n        <button id=\"axis\">Horizontal</button>\n        <div id=\"plBoard\"></div>\n      </section>\n      <section id=\"game\" class=\"hidden\">\n        <!-- <h2 id=\"notice\">Test transmission...</h2> -->\n        <div id=\"gamePlBoard\" class=\"board\"></div>\n        <div id=\"gameCompBoard\" class=\"board\"></div>\n      </section>\n    </main>\n    <section id=\"notice\" class=\"hidden\">\n      <h2 id=\"announce\">The winner is Player</h2>\n      <button id=\"restart\">Restart</button>\n    </section>\n    <footer>\n      <a href=\"https://github.com/RhazzXIX\">\n        <img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"GitHub\" />\n      </a>\n    </footer>\n  </body>\n</html>\n";
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
/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/game */ "./src/modules/game.js");




console.log("Hello Up-skilling World!");
const game = (0,_modules_game__WEBPACK_IMPORTED_MODULE_3__["default"])();
game.setPlayer('test');
function attack() {
  game.attack([0, 0]);
  game.attack([0, 1]);
  game.attack([0, 2]);
  game.attack([0, 3]);
  game.attack([0, 4]);
  game.attack([7, 6]);
  game.attack([7, 5]);
  game.attack([3, 0]);
  game.attack([3, 2]);
  game.attack([3, 3]);
  game.attack([3, 1]);
  game.attack([2, 8]);
  game.attack([3, 8]);
  game.attack([4, 8]);
  game.attack([6, 3]);
  game.attack([7, 3]);
  game.attack([8, 3]);
  console.log(game.showMessage());
  console.log(game.showMessage());
  const board = game.getGameBoard();
  console.log(board.player);
  console.log(board.comp);
}

// attack()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0sS0FBSyxzQkFBc0IscUJBQXFCLHFCQUFxQixxQkFBcUIscUJBQXFCLHVCQUF1QixPQUFPLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxNQUFNLE1BQU0sS0FBSyxVQUFVLE9BQU8sT0FBTyxNQUFNLE1BQU0sc0JBQXNCLHFCQUFxQixPQUFPLE1BQU0sTUFBTSxNQUFNLFVBQVUsTUFBTSxPQUFPLE1BQU0sS0FBSyxzQkFBc0IsdUJBQXVCLE9BQU8sTUFBTSxNQUFNLEtBQUssWUFBWSxPQUFPLE9BQU8sTUFBTSxLQUFLLHNCQUFzQixxQkFBcUIsT0FBTyxLQUFLLFFBQVEsT0FBTyxNQUFNLEtBQUssVUFBVSxPQUFPLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFFBQVEsT0FBTyxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxrQkFBa0IsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLE1BQU0sVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sbUJBQW1CLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZ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Q0FBQztFQUNuQkwsSUFBSSxDQUFDSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDbkJMLElBQUksQ0FBQ0ssTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ25CTCxJQUFJLENBQUNLLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNuQkwsSUFBSSxDQUFDSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDbkJMLElBQUksQ0FBQ0ssTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ25CTCxJQUFJLENBQUNLLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNuQkwsSUFBSSxDQUFDSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDbkJMLElBQUksQ0FBQ0ssTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ25CTCxJQUFJLENBQUNLLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUVuQmtILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDeEgsSUFBSSxDQUFDc0gsV0FBVyxFQUFFLENBQUM7RUFDL0JDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDeEgsSUFBSSxDQUFDc0gsV0FBVyxFQUFFLENBQUM7RUFFL0IsTUFBTWQsS0FBSyxHQUFHeEcsSUFBSSxDQUFDTSxZQUFZLEVBQUU7RUFDakNpSCxPQUFPLENBQUNDLEdBQUcsQ0FBQ2hCLEtBQUssQ0FBQ2pHLE1BQU0sQ0FBQztFQUN6QmdILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDaEIsS0FBSyxDQUFDaEcsSUFBSSxDQUFDO0FBQ3pCOztBQUVBLFciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvRE9NY29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tcy9kaXZCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tcy9wYXJzZUdyaWRDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9haS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZhdWx0IGFzIGF0dGFjaERpdkdyaWQsIHJlbW92ZUdyaWQgfSBmcm9tIFwiLi9kb21zL2RpdkJvYXJkXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgcGFyc2VHcmlkQ29vcmRzIGZyb20gXCIuL2RvbXMvcGFyc2VHcmlkQ29vcmRzXCI7XG5cbmNvbnN0IGNvbnRyb2xET00gPSAoKCkgPT4ge1xuICAvLyBET00gbm9kZXNcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gIGNvbnN0IG1haW4gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICBjb25zdCBzdGFydFNlY3Rpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uI3N0YXJ0XCIpO1xuICBjb25zdCBwbGF5ZXJGb3JtID0gc3RhcnRTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtI3BsYXllclwiKTtcbiAgY29uc3QgcGxheWVySW5wdXQgPSBwbGF5ZXJGb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dCNwTmFtZVwiKTtcbiAgY29uc3Qgc3RhcnRCdG4gPSBzdGFydFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtcblxuICBjb25zdCBwbGFjZVNoaXBTZWN0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbiNwbGFjZVwiKTtcbiAgY29uc3QgYXhpc0J0biA9IHBsYWNlU2hpcFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImJ1dHRvbiNheGlzXCIpO1xuICBjb25zdCBwbGFjZVNoaXBCb2FyZCA9IHBsYWNlU2hpcFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImRpdiNwbEJvYXJkXCIpO1xuXG4gIGNvbnN0IGdhbWVTZWN0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbiNnYW1lXCIpO1xuICBjb25zdCBnYW1lUGxCb2FyZCA9IGdhbWVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJkaXYjZ2FtZVBsQm9hcmRcIik7XG4gIGNvbnN0IGdhbWVDb21wQm9hcmQgPSBnYW1lU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZGl2I2dhbWVDb21wQm9hcmRcIik7XG5cbiAgY29uc3Qgbm90aWNlU2VjdGlvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihcInNlY3Rpb24jbm90aWNlXCIpO1xuICBjb25zdCB3aW5uZXJOb3RpY2UgPSBub3RpY2VTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJoMiNhbm5vdW5jZVwiKTtcbiAgY29uc3QgcmVzdGFydEJ0biA9IG5vdGljZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImJ1dHRvbiNyZXN0YXJ0XCIpO1xuXG4gIC8vIEluaXRpYWwgTG9hZFxuICBtYWluLnJlbW92ZUNoaWxkKHBsYWNlU2hpcFNlY3Rpb24pO1xuICBwbGFjZVNoaXBTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIG1haW4ucmVtb3ZlQ2hpbGQoZ2FtZVNlY3Rpb24pO1xuICBnYW1lU2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICBib2R5LnJlbW92ZUNoaWxkKG5vdGljZVNlY3Rpb24pO1xuICBub3RpY2VTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG5cbiAgY29uc3QgZ2FtZSA9IEdhbWUoKTtcbiAgbGV0IGJvYXJkcztcblxuICAvLyBGdW5jdGlvbnMgZm9yIERPTSBjb250cm9sXG5cbiAgY29uc3QgZ3JpZENsaWNrRXZlbnQgPSAoaW5kZXgpID0+IHtcbiAgICBjb25zdCBjb29yZCA9IHBhcnNlR3JpZENvb3JkcyhpbmRleCk7XG4gICAgZ2FtZS5hdHRhY2soY29vcmQpO1xuICAgIHJlbW92ZUdyaWQoZ2FtZVBsQm9hcmQpO1xuICAgIGF0dGFjaERpdkdyaWQoZ2FtZVBsQm9hcmQsIGdhbWUuZ2V0R2FtZUJvYXJkKCkucGxheWVyLCBcInBsYXllclwiKTtcbiAgICByZW1vdmVHcmlkKGdhbWVDb21wQm9hcmQpO1xuICAgIGF0dGFjaERpdkdyaWQoZ2FtZUNvbXBCb2FyZCwgZ2FtZS5nZXRHYW1lQm9hcmQoKS5jb21wKTtcbiAgfTtcblxuICBmdW5jdGlvbiBhZGRHcmlkQ2xpY2tFdmVudCgpIHtcbiAgICBjb25zdCBjb21wR3JpZHMgPSBnYW1lQ29tcEJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYuZ3JpZFwiKTtcbiAgICBjb21wR3JpZHMuZm9yRWFjaCgoZ3JpZCwgaikgPT4ge1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZ3JpZENsaWNrRXZlbnQoaik7XG4gICAgICAgIGFkZEdyaWRDbGlja0V2ZW50KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRHYW1lKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBnYW1lLnNldFBsYXllcihwbGF5ZXJJbnB1dC52YWx1ZSk7XG4gICAgYm9hcmRzID0gZ2FtZS5nZXRHYW1lQm9hcmQoKTtcbiAgICBhdHRhY2hEaXZHcmlkKHBsYWNlU2hpcEJvYXJkLCBib2FyZHMucGxheWVyLCBcInBsYXllclwiKTtcbiAgICBtYWluLnJlbW92ZUNoaWxkKHN0YXJ0U2VjdGlvbik7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChwbGFjZVNoaXBTZWN0aW9uKTtcbiAgICBwbGF5ZXJJbnB1dC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICAvLyBFdmVudGxpc3RlbmVyc1xuXG4gIHBsYXllckZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBsb2FkR2FtZSk7XG5cbiAgLy8gc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0R2FtZSk7XG5cbiAgLy8gZ2FtZS5zZXRQbGF5ZXIoXCJ0ZXN0XCIpO1xuICAvLyBhdHRhY2hEaXZHcmlkKGdhbWVQbEJvYXJkLCBib2FyZHMucGxheWVyLCBcInBsYXllclwiKTtcbiAgLy8gYXR0YWNoRGl2R3JpZChnYW1lQ29tcEJvYXJkLCBib2FyZHMuY29tcCk7XG5cbiAgLy8gYWRkR3JpZENsaWNrRXZlbnQoXG4gIC8vICAgZ2FtZUNvbXBCb2FyZCxcbiAgLy8gICBnYW1lUGxCb2FyZCxcbiAgLy8gICBib2FyZHMsXG4gIC8vICAgZ2FtZS5hdHRhY2ssXG4gIC8vICAgcmVtb3ZlR3JpZCxcbiAgLy8gICBhdHRhY2hEaXZHcmlkXG4gIC8vICk7XG5cbiAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gIC8vICAgcmVtb3ZlR3JpZChwbGFjZVNoaXBCb2FyZCk7XG4gIC8vIH0sIDIwMDApO1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgY29udHJvbERPTTtcbiIsIlxuXG5jb25zdCBjcmVhdGVHcmlkID0gKGNvb3JkLCBwbGF5ZXIpID0+IHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBncmlkLmNsYXNzTGlzdC5hZGQoJ2dyaWQnKVxuICBpZiAoY29vcmQuc2hvdCA9PT0gJ21pc3MnKSBncmlkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgaWYgKGNvb3JkLnNob3QgPT09ICdoaXQnKSBncmlkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICBpZiAocGxheWVyKSB7XG4gICAgaWYgKGNvb3JkLnNoaXApIGdyaWQuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICB9XG5cbiAgcmV0dXJuIGdyaWRcbn1cblxuY29uc3QgYXR0YWNoRGl2R3JpZCA9IChodG1sQm9hcmQsIGdhbWVCb2FyZCwgcGxheWVyKSA9PiB7XG4gIGdhbWVCb2FyZC5mb3JFYWNoKHJvdyA9PiB7XG4gICAgcm93LmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgY29uc3QgZ3JpZCA9IGNyZWF0ZUdyaWQoY29vcmQsIHBsYXllcik7XG4gICAgICBodG1sQm9hcmQuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgfSlcbiAgfSlcblxufVxuXG5jb25zdCByZW1vdmVHcmlkID0gKGh0bWxCb2FyZCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGh0bWxCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcbiAgZ3JpZHMuZm9yRWFjaChncmlkID0+IHtcbiAgICBodG1sQm9hcmQucmVtb3ZlQ2hpbGQoZ3JpZCk7XG4gIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGF0dGFjaERpdkdyaWQ7XG5leHBvcnQgeyByZW1vdmVHcmlkICB9IiwiY29uc3QgcGFyc2VHcmlkQ29vcmRzID0gKGluZGV4KSA9PiB7XG4gIGxldCB4ID0gMDtcbiAgbGV0IHkgPSBpbmRleDtcblxuICBpZiAoaW5kZXggPj0gMTApIHtcbiAgICB4ID0gTWF0aC5mbG9vcihpbmRleCAvIDEwKTtcbiAgICB5ID0gaW5kZXggLSB4ICogMTA7XG4gIH1cbiAgcmV0dXJuIFt4LCB5XTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlR3JpZENvb3JkcztcbiIsImNvbnN0IGNvbW1hbmRlckFJID0gKCkgPT4ge1xuICBjb25zdCBhdHRhY2tDb29yZHNFbnRlcmVkID0gW107XG4gIGxldCB0dXJuID0gZmFsc2U7XG5cbiAgY29uc3QgZ2VuZXJhdGVDb29yZHMgPSAoKSA9PiB7XG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIHJldHVybiBbeCwgeV07XG4gIH07XG5cbiAgY29uc3QgY2hlY2tDb29yZGluYXRlcyA9IChjb29yZHMpID0+IHtcbiAgICBsZXQgZW50ZXJlZCA9IGZhbHNlO1xuICAgIGNvbnN0IFt4LCB5XSA9IFsuLi5jb29yZHNdO1xuICAgIGNvbnN0IGNvb3Jkc0NvcHkgPSBbXTtcbiAgICBhdHRhY2tDb29yZHNFbnRlcmVkLmZvckVhY2goKGVudHJ5KSA9PiBjb29yZHNDb3B5LnB1c2goZW50cnkpKTtcbiAgICBjb29yZHNDb3B5LmZvckVhY2goKGVudHJ5LCBpLCBhcnIpID0+IHtcbiAgICAgIGNvbnN0IFthLCBiXSA9IFsuLi5lbnRyeV07XG4gICAgICBpZiAoYSA9PT0geCAmJiBiID09PSB5KSB7XG4gICAgICAgIGVudGVyZWQgPSB0cnVlO1xuICAgICAgICBhcnIuc3BsaWNlKGkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudGVyZWQ7XG4gIH07XG5cbiAgY29uc3QgZW50ZXJDb29yZHMgPSAoZW5lbXlCb2FyZCwgcGxheWVyVHVybikgPT4ge1xuICAgIGlmICh0dXJuID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIGlmIChhdHRhY2tDb29yZHNFbnRlcmVkLmxlbmd0aCA9PT0gMTAwKSByZXR1cm47XG4gICAgY29uc3QgY29vcmRzID0gZ2VuZXJhdGVDb29yZHMoKTtcbiAgICBjb25zdCBlbnRlcmVkID0gY2hlY2tDb29yZGluYXRlcyhjb29yZHMpO1xuICAgIGlmICghZW50ZXJlZCkge1xuICAgICAgYXR0YWNrQ29vcmRzRW50ZXJlZC5wdXNoKGNvb3Jkcyk7XG4gICAgICBlbmVteUJvYXJkKGNvb3Jkcyk7XG4gICAgICB0dXJuID0gZmFsc2U7XG4gICAgICBwbGF5ZXJUdXJuKCk7XG4gICAgfSBlbHNlIGlmIChlbnRlcmVkKSB7XG4gICAgICBlbnRlckNvb3JkcyhlbmVteUJvYXJkLCBwbGF5ZXJUdXJuKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2hvd1R1cm4gPSAoKSA9PiB0dXJuO1xuXG4gIGNvbnN0IHN0YXJ0VHVybiA9ICgpID0+IHtcbiAgICB0dXJuID0gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4geyBlbnRlckNvb3Jkcywgc2hvd1R1cm4sIHN0YXJ0VHVybiB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZGVyQUk7XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IEdhbWVCb2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gW107XG5cbiAgY29uc3QgY29tbWFuZGVyID0gU2hpcChcIkNvbW1hbmRlclwiLCA1KTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IFNoaXAoXCJCYXR0bGVzaGlwXCIsIDQpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKFwiRGVzdHJveWVyXCIsIDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKFwiU3VibWFyaW5lXCIsIDMpO1xuICBjb25zdCBwYXRyb2xCb2F0ID0gU2hpcChcIlBhdHJvbCBCb2F0XCIsIDIpO1xuXG4gIGNvbnN0IHBsYWNlZFNoaXAgPSBbXTtcblxuICBsZXQgYW5ub3VuY2VtZW50ID0gXCJcIjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICBjb25zdCByb3cgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgIGNvbnN0IGdyaWQgPSB7IHNob3Q6IG51bGwgfTtcbiAgICAgIHJvdy5wdXNoKGdyaWQpO1xuICAgIH1cbiAgICBnYW1lQm9hcmQucHVzaChyb3cpO1xuICB9XG5cbiAgY29uc3Qgc2hvd0dhbWVCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5ZWRHYW1lYm9hcmQgPSBbXTtcbiAgICBnYW1lQm9hcmQuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICBjb25zdCBkaXNwbGF5ZWRSb3cgPSBbXTtcbiAgICAgIHJvdy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpcGxheWVkR3JpZCA9IHsgLi4uZ3JpZCB9O1xuICAgICAgICBkaXNwbGF5ZWRSb3cucHVzaChkaXBsYXllZEdyaWQpO1xuICAgICAgfSk7XG4gICAgICBkaXNwbGF5ZWRHYW1lYm9hcmQucHVzaChkaXNwbGF5ZWRSb3cpO1xuICAgIH0pO1xuICAgIHJldHVybiBkaXNwbGF5ZWRHYW1lYm9hcmQ7XG4gIH07XG5cbiAgY29uc3Qgc3Bhd25Db29yZHMgPSAoW3gsIHldLCBheGlzLCBzaGlwTGVuZ3RoKSA9PiB7XG4gICAgbGV0IHhBeGlzID0geDtcbiAgICBsZXQgeUF4aXMgPSB5O1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW1t4QXhpcywgeUF4aXNdXTtcbiAgICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcExlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHlBeGlzICs9IDE7XG4gICAgICAgIGNvbnN0IG5leHRDb29yZHMgPSBbeEF4aXMsIHlBeGlzXTtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChuZXh0Q29vcmRzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXBMZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB4QXhpcyArPSAxO1xuICAgICAgICBjb25zdCBuZXh0Q29vcmRzID0gW3hBeGlzLCB5QXhpc107XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2gobmV4dENvb3Jkcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwSW5PcmRlciA9ICgpID0+IHtcbiAgICBsZXQgc2hpcDtcbiAgICBzd2l0Y2ggKHBsYWNlZFNoaXAubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHNoaXAgPSBiYXR0bGVzaGlwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc2hpcCA9IGRlc3Ryb3llcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHNoaXAgPSBzdWJtYXJpbmU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBzaGlwID0gcGF0cm9sQm9hdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzaGlwID0gY29tbWFuZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBzaGlwO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrQ29vcmRzID0gKGNvb3JkcykgPT4ge1xuICAgIGxldCBncmlkT2s7XG4gICAgY29vcmRzLmZvckVhY2goKGNvb3JkLCBpLCBhcnIpID0+IHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IFsuLi5jb29yZF07XG4gICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSB4IDwgMDpcbiAgICAgICAgICBncmlkT2sgPSBmYWxzZTtcbiAgICAgICAgICBhcnIuc3BsaWNlKGkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2FzZSB5IDwgMDpcbiAgICAgICAgICBncmlkT2sgPSBmYWxzZTtcbiAgICAgICAgICBhcnIuc3BsaWNlKGkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2FzZSB4ID4gOTpcbiAgICAgICAgICBncmlkT2sgPSBmYWxzZTtcbiAgICAgICAgICBhcnIuc3BsaWNlKGkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2FzZSB5ID4gOTpcbiAgICAgICAgICBncmlkT2sgPSBmYWxzZTtcbiAgICAgICAgICBhcnIuc3BsaWNlKGkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBncmlkT2sgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGdhbWVCb2FyZFt4XVt5XS5zaGlwKSB7XG4gICAgICAgIGdyaWRPayA9IGZhbHNlO1xuICAgICAgICBhcnIuc3BsaWNlKGkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBncmlkT2s7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGNvb3JkLCBheGlzKSA9PiB7XG4gICAgaWYgKHBsYWNlZFNoaXAubGVuZ3RoID09PSA1KSByZXR1cm47XG4gICAgY29uc3QgYXBwcm9wcmlhdGVTaGlwID0gZ2V0U2hpcEluT3JkZXIoKTtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHNwYXduQ29vcmRzKGNvb3JkLCBheGlzLCBhcHByb3ByaWF0ZVNoaXAuZ2V0TGVuZ3RoKCkpO1xuICAgIGNvbnN0IGNvb3Jkc09LID0gY2hlY2tDb29yZHMoY29vcmRpbmF0ZXMpO1xuICAgIGlmICghY29vcmRzT0spIHtcbiAgICAgIGFubm91bmNlbWVudCA9IFwiQ2hlY2sgY29vcmRpbmF0ZXMgYWdhaW4uXCI7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IFsuLi5ncmlkXTtcbiAgICAgIGdhbWVCb2FyZFt4XVt5XS5zaGlwID0gYXBwcm9wcmlhdGVTaGlwLmdldE5hbWUoKTtcbiAgICB9KTtcblxuICAgIHBsYWNlZFNoaXAucHVzaChhcHByb3ByaWF0ZVNoaXApO1xuICAgIGlmIChwbGFjZWRTaGlwLmxlbmd0aCA9PT0gNSkge1xuICAgICAgYW5ub3VuY2VtZW50ID0gXCJBbGwgc2hpcHMgaGFzIGJlZW4gcGxhY2VkLlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbm5vdW5jZW1lbnQgPSBgUGxhY2VkICR7YXBwcm9wcmlhdGVTaGlwLmdldE5hbWUoKX1gO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhdHRhY2tTaGlwID0gKHNoaXBOYW1lKSA9PiB7XG4gICAgcGxhY2VkU2hpcC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBpZiAoc2hpcC5nZXROYW1lKCkgPT09IHNoaXBOYW1lKSBzaGlwLmhpdCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlcG9ydEF0dGFja0NvbmRpdGlvbiA9IChncmlkKSA9PiB7XG4gICAgYW5ub3VuY2VtZW50ID0gZ3JpZC5zaG90O1xuICAgIGlmICghZ3JpZC5zaGlwKSByZXR1cm47XG4gICAgY29uc3QgdmVzc2VsID0gcGxhY2VkU2hpcC5maW5kKChzaGlwKSA9PiBzaGlwLmdldE5hbWUoKSA9PT0gZ3JpZC5zaGlwKTtcbiAgICBpZiAoIXZlc3NlbC5pc1N1bmsoKSkgcmV0dXJuO1xuICAgIGFubm91bmNlbWVudCA9IGAke3Zlc3NlbC5nZXROYW1lKCl9IGhhcyBiZWVuIHNhbmshYDtcbiAgICBjb25zdCBpbmRleCA9IHBsYWNlZFNoaXAuZmluZEluZGV4KChzaGlwKSA9PiBzaGlwID09PSB2ZXNzZWwpO1xuICAgIHBsYWNlZFNoaXAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBpZiAocGxhY2VkU2hpcC5sZW5ndGggPT09IDApIGFubm91bmNlbWVudCA9IGBBbGwgc2hpcHMgaGFzIGJlZW4gc2FuayFgO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcbiAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRdO1xuICAgIGxldCBhdHRhY2tSZWNlaXZlZCA9IHRydWU7XG4gICAgY29uc3QgZ3JpZCA9IGdhbWVCb2FyZFt4XVt5XTtcbiAgICBpZiAoZ3JpZC5zaG90ICE9PSBudWxsKSB7XG4gICAgICBhdHRhY2tSZWNlaXZlZCA9IGZhbHNlO1xuICAgICAgYW5ub3VuY2VtZW50ID0gXCJJbGxlZ2FsIHNob3QhXCI7XG4gICAgICByZXR1cm4gYXR0YWNrUmVjZWl2ZWQ7XG4gICAgfVxuICAgIGlmIChncmlkLnNoaXApIHtcbiAgICAgIGdyaWQuc2hvdCA9IFwiaGl0XCI7XG4gICAgICBhdHRhY2tTaGlwKGdyaWQuc2hpcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyaWQuc2hvdCA9IFwibWlzc1wiO1xuICAgIH1cbiAgICByZXBvcnRBdHRhY2tDb25kaXRpb24oZ3JpZCk7XG4gICAgcmV0dXJuIGF0dGFja1JlY2VpdmVkO1xuICB9O1xuXG4gIGNvbnN0IGFubm91bmNlID0gKCkgPT4gYW5ub3VuY2VtZW50O1xuXG4gIHJldHVybiB7IHNob3dHYW1lQm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYW5ub3VuY2UgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVCb2FyZDtcbiIsImNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuXG4gIGxldCB0dXJuID0gdHJ1ZTtcblxuICBjb25zdCBzaG93TmFtZSA9ICgpID0+IHBsYXllck5hbWU7XG5cbiAgY29uc3Qgc2hvd1R1cm4gPSAoKSA9PiB0dXJuO1xuXG4gIGNvbnN0IGF0dGFja0JvYXJkID0gKGNvb3JkcywgYm9hcmQsIGVuZW15VHVybikgPT4ge1xuICAgIGNvbnN0IG5vdE9LID0gZmFsc2U7XG4gICAgaWYgKHR1cm4gPT09IGZhbHNlKSByZXR1cm47XG4gICAgaWYgKGJvYXJkKGNvb3JkcykgPT09IG5vdE9LKSByZXR1cm47XG4gICAgdHVybiA9IGZhbHNlO1xuICAgIGVuZW15VHVybigpO1xuICB9O1xuXG4gIGNvbnN0IHN0YXJ0VHVybiA9ICgpID0+IHtcbiAgICB0dXJuID0gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4geyBzaG93TmFtZSwgc2hvd1R1cm4sIGF0dGFja0JvYXJkLCBzdGFydFR1cm4gfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IFNoaXAgPSAobmFtZSwgbGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBOYW1lID0gbmFtZTtcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgbGV0IGhpdFJlY2VpdmVkID0gMDtcbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChoaXRSZWNlaXZlZCA9PT0gc2hpcExlbmd0aCkgcmV0dXJuO1xuICAgIGhpdFJlY2VpdmVkICs9IDE7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZiAoaGl0UmVjZWl2ZWQgPT09IHNoaXBMZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gc2hpcExlbmd0aDtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHNoaXBOYW1lO1xuXG4gIHJldHVybiB7IGhpdCwgaXNTdW5rLCBnZXRMZW5ndGgsIGdldE5hbWUgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gXCIuL2ZhY3Rvcmllcy9nYW1lQm9hcmRcIjtcbmltcG9ydCBjb21tYW5kZXJBSSBmcm9tIFwiLi9mYWN0b3JpZXMvYWlcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vZmFjdG9yaWVzL3BsYXllclwiO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICBsZXQgcGxheWVyO1xuICBjb25zdCBjb21wID0gY29tbWFuZGVyQUkoKTtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgY29uc3QgY29tcEJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIGxldCBtZXNzYWdlO1xuICBsZXQgd2lubmVyO1xuICBsZXQgY2FsbFdpbm5lciA9IGZhbHNlO1xuXG4gIGNvbnN0IGdhbWVib2FyZHMgPSB7XG4gICAgcGxheWVyOiBwbGF5ZXJCb2FyZC5zaG93R2FtZUJvYXJkKCksXG4gICAgY29tcDogY29tcEJvYXJkLnNob3dHYW1lQm9hcmQoKSxcbiAgfTtcblxuICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoWzAsIDBdLCBcInhcIik7XG4gIHBsYXllckJvYXJkLnBsYWNlU2hpcChbMywgMF0sIFwieFwiKTtcbiAgcGxheWVyQm9hcmQucGxhY2VTaGlwKFsyLCA4XSwgXCJ5XCIpO1xuICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoWzYsIDNdLCBcInlcIik7XG4gIHBsYXllckJvYXJkLnBsYWNlU2hpcChbNywgNV0sIFwieFwiKTtcblxuICBjb21wQm9hcmQucGxhY2VTaGlwKFswLCAwXSwgXCJ4XCIpO1xuICBjb21wQm9hcmQucGxhY2VTaGlwKFszLCAwXSwgXCJ4XCIpO1xuICBjb21wQm9hcmQucGxhY2VTaGlwKFsyLCA4XSwgXCJ5XCIpO1xuICBjb21wQm9hcmQucGxhY2VTaGlwKFs2LCAzXSwgXCJ5XCIpO1xuICBjb21wQm9hcmQucGxhY2VTaGlwKFs3LCA1XSwgXCJ4XCIpO1xuXG4gIGNvbnN0IHNldFBsYXllciA9IChuYW1lKSA9PiB7XG4gICAgaWYgKHBsYXllciAhPT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgcGxheWVyID0gUGxheWVyKG5hbWUpO1xuICB9O1xuXG4gIGNvbnN0IGdldEdhbWVCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBnYW1lQm9hcmRzID0ge1xuICAgICAgcGxheWVyOiBwbGF5ZXJCb2FyZC5zaG93R2FtZUJvYXJkKCksXG4gICAgICBjb21wOiBjb21wQm9hcmQuc2hvd0dhbWVCb2FyZCgpLFxuICAgIH07XG4gICAgcmV0dXJuIGdhbWVCb2FyZHM7XG4gIH07XG5cbiAgY29uc3QgcGxheWVyQXR0YWNrID0gKGNvb3JkcykgPT4ge1xuICAgIGlmIChwbGF5ZXIuc2hvd1R1cm4oKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICBwbGF5ZXIuYXR0YWNrQm9hcmQoY29vcmRzLCBjb21wQm9hcmQucmVjZWl2ZUF0dGFjaywgY29tcC5zdGFydFR1cm4pO1xuICAgIG1lc3NhZ2UgPSBjb21wQm9hcmQuYW5ub3VuY2UoKTtcbiAgICBpZiAoY29tcEJvYXJkLmFubm91bmNlKCkgPT09IFwiQWxsIHNoaXBzIGhhcyBiZWVuIHNhbmshXCIpXG4gICAgICB3aW5uZXIgPSBwbGF5ZXIuc2hvd05hbWUoKTtcbiAgfTtcblxuICBjb25zdCBjb21wQXR0YWNrID0gKCkgPT4ge1xuICAgIGlmIChjb21wLnNob3dUdXJuKCkgPT09IGZhbHNlKSByZXR1cm47XG4gICAgY29tcC5lbnRlckNvb3JkcyhwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrLCBwbGF5ZXIuc3RhcnRUdXJuKTtcbiAgICBtZXNzYWdlID0gcGxheWVyQm9hcmQuYW5ub3VuY2UoKTtcbiAgICBpZiAocGxheWVyQm9hcmQuYW5ub3VuY2UoKSA9PT0gXCJBbGwgc2hpcHMgaGFzIGJlZW4gc2FuayFcIilcbiAgICAgIHdpbm5lciA9IFwiQ29tbWFuZGVyIEEuSS5cIjtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoY29vcmRzKSA9PiB7XG4gICAgaWYgKHdpbm5lcikgcmV0dXJuO1xuICAgIHBsYXllckF0dGFjayhjb29yZHMpO1xuICAgIGlmICh3aW5uZXIpIHJldHVybjtcbiAgICBjb21wQXR0YWNrKCk7XG4gIH07XG5cbiAgY29uc3Qgc2hvd01lc3NhZ2UgPSAoKSA9PiB7XG4gICAgaWYgKCFtZXNzYWdlKSByZXR1cm4gbnVsbDtcbiAgICBpZiAod2lubmVyKSB7XG4gICAgICBpZiAoIWNhbGxXaW5uZXIpIHtcbiAgICAgICAgY2FsbFdpbm5lciA9IHRydWU7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgfVxuICAgICAgbWVzc2FnZSA9IGAke3BsYXllci5zaG93TmFtZSgpfSBpcyB0aGUgd2lubmVyIWA7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfTtcblxuICByZXR1cm4geyBzZXRQbGF5ZXIsIGdldEdhbWVCb2FyZCwgYXR0YWNrLCBzaG93TWVzc2FnZSB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQge1xcbiAgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHtcXG4gIC8qIDEgKi9cXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXG4gKi9cXG5cXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5sZWdlbmQge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXG4gKi9cXG5cXG5wcm9ncmVzcyB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxuICovXFxuXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxuICovXFxuXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcbiAqL1xcblxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXG59XFxuXFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5cXG5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdW1tYXJ5IHtcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXG59XFxuXFxuLyogTWlzY1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRlbXBsYXRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcbiAqL1xcblxcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qIGNvbG9yIHBhbGV0dGVcXG4gICAgIzkwYTNiNFxcdCgxNDQsMTYzLDE4MClcXG4gICAgIzU2N2Q5Y1xcdCg4NiwxMjUsMTU2KVxcbiAgICAjMGY0MTYyXFx0KDE1LDY1LDk4KVxcbiAgICAjMDkyNzNhXFx0KDksMzksNTgpXFxuICAgICMxYzI2NDFcXHQoMjgsMzgsNjUpXFxuICAgIGh0dHBzOi8vd3d3LmNvbG9yLWhleC5jb20vY29sb3ItcGFsZXR0ZS83MDc3MlxcblxcblxcbiAgICAjOTliNWMzXFx0KDE1MywxODEsMTk1KVxcbiAgICAjNGM3ZTk3XFx0KDc2LDEyNiwxNTEpXFxuICAgICMwMDQ4NmJcXHQoMCw3MiwxMDcpXFxuICAgICNmZmZmZmZcXHQoMjU1LDI1NSwyNTUpXFxuICAgIGh0dHBzOi8vd3d3LmNvbG9yLWhleC5jb20vY29sb3ItcGFsZXR0ZS82OTYxMFxcbiovXFxuXFxuYm9keSB7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDcwcHggMWZyIDY4cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTliNWMzO1xcbn1cXG5cXG5tYWluIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuaGVhZGVyLFxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjN2U5NztcXG59XFxuXFxuaGVhZGVyIGgxIHtcXG4gIGZvbnQtc2l6ZTogMi42cmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXG4gIGNvbG9yOiAjOTliNWMzO1xcbiAgdGV4dC1zaGFkb3c6IDRweCAxcHggYmxhY2s7XFxuICBwYWRkaW5nOiA0cHggOHB4O1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbmZvcm0jcGxheWVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luLXRvcDogNzZweDtcXG4gIHJvdy1nYXA6IDI4cHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5mb3JtI3BsYXllciA+IGxhYmVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuXFxubGFiZWwgaW5wdXQge1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgcGFkZGluZzogMnB4IDZweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuZm9ybSNwbGF5ZXIgYnV0dG9uIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIHBhZGRpbmc6IDJweCA4cHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbn1cXG5cXG5zZWN0aW9uI3BsYWNlIHtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG59XFxuXFxuc2VjdGlvbiNwbGFjZSBkaXYjcGxCb2FyZCB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgZ2FwOiAzcHg7XFxufVxcblxcbnNlY3Rpb24gZGl2I3BsQm9hcmQsXFxuc2VjdGlvbiBkaXYuYm9hcmQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogM3B4O1xcbiAgb3V0bGluZTogMnB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG5zZWN0aW9uIGRpdiBkaXYuZ3JpZCB7XFxuICBib3JkZXI6IDA7XFxuICBvdXRsaW5lOiAxcHggc29saWQgYmxhY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbn1cXG5cXG5zZWN0aW9uIGRpdiBkaXYuZ3JpZC5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5MGEzYjQ7XFxufVxcblxcbnNlY3Rpb24jZ2FtZSBkaXYgZGl2LmdyaWQuaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjcpO1xcbn1cXG5cXG5zZWN0aW9uI2dhbWUgZGl2IGRpdi5ncmlkLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAyNTUsIDAuNyk7XFxufVxcblxcbnNlY3Rpb24jZ2FtZSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgLyogZ3JpZC10ZW1wbGF0ZS1yb3dzOiAyNTBweCAxZnI7ICovXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi8qIHNlY3Rpb24jZ2FtZSBcXG5oMiNub3RpY2Uge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigxNzMsIDI1NSwgMTczKTtcXG4gIHdpZHRoOiA1MDBweDtcXG4gIGhlaWdodDogODBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIsIDU4LCAyMik7XFxuICBjb2xvcjogcmdiKDI0MSwgMjI1LCAxMzQpO1xcbiAgZm9udC1mYW1pbHk6ICdDb3VyaWVyIE5ldycsIENvdXJpZXIsIG1vbm9zcGFjZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBsZXR0ZXItc3BhY2luZzogMXB4O1xcbn0gKi9cXG5cXG5zZWN0aW9uI2dhbWUgZGl2LmJvYXJkIHtcXG4gIG1hcmdpbi10b3A6IDE0MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxOHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxOHB4KTtcXG59XFxuXFxuc2VjdGlvbiNub3RpY2Uge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NCwgMjU0LCAwLjMpO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAzMHB4O1xcbn1cXG5cXG5zZWN0aW9uLmhpZGRlbiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuZm9vdGVyIGE6aG92ZXIge1xcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDAgMnB4IHdoaXRlKTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwyRUFBMkU7O0FBRTNFOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsaUJBQWlCLEVBQUUsTUFBTTtFQUN6Qiw4QkFBOEIsRUFBRSxNQUFNO0FBQ3hDOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSx1QkFBdUIsRUFBRSxNQUFNO0VBQy9CLFNBQVMsRUFBRSxNQUFNO0VBQ2pCLGlCQUFpQixFQUFFLE1BQU07QUFDM0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLG1CQUFtQixFQUFFLE1BQU07RUFDM0IsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxpQ0FBaUMsRUFBRSxNQUFNO0FBQzNDOztBQUVBOztFQUVFOztBQUVGOztFQUVFLG1CQUFtQjtBQUNyQjs7QUFFQTs7O0VBR0U7O0FBRUY7OztFQUdFLGlDQUFpQyxFQUFFLE1BQU07RUFDekMsY0FBYyxFQUFFLE1BQU07QUFDeEI7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LGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHVDQUF1QztFQUN2QyxvQ0FBb0M7RUFDcEMsZ0JBQWdCO0VBQ2hCLFFBQVE7QUFDVjs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsUUFBUTtFQUNSLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLFNBQVM7RUFDVCx3QkFBd0I7RUFDeEIsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0Usc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0Usc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQ0FBbUM7RUFDbkMscUJBQXFCO0FBQ3ZCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7QUFFSDtFQUNFLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsdUNBQXVDO0VBQ3ZDLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLDBDQUEwQztFQUMxQyx1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtDQUFrQztBQUNwQ1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuXFxuLyogRG9jdW1lbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG59XFxuXFxuLyogU2VjdGlvbnNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLyoqXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxuICovXFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcbiAqL1xcblxcbmhyIHtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnByZSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5jb2RlLFxcbmtiZCxcXG5zYW1wIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07XFxufVxcblxcbnN1cCB7XFxuICB0b3A6IC0wLjVlbTtcXG59XFxuXFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbn1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCxcXG5vcHRncm91cCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCB7XFxuICAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3Qge1xcbiAgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyogY29sb3IgcGFsZXR0ZVxcbiAgICAjOTBhM2I0XFx0KDE0NCwxNjMsMTgwKVxcbiAgICAjNTY3ZDljXFx0KDg2LDEyNSwxNTYpXFxuICAgICMwZjQxNjJcXHQoMTUsNjUsOTgpXFxuICAgICMwOTI3M2FcXHQoOSwzOSw1OClcXG4gICAgIzFjMjY0MVxcdCgyOCwzOCw2NSlcXG4gICAgaHR0cHM6Ly93d3cuY29sb3ItaGV4LmNvbS9jb2xvci1wYWxldHRlLzcwNzcyXFxuXFxuXFxuICAgICM5OWI1YzNcXHQoMTUzLDE4MSwxOTUpXFxuICAgICM0YzdlOTdcXHQoNzYsMTI2LDE1MSlcXG4gICAgIzAwNDg2YlxcdCgwLDcyLDEwNylcXG4gICAgI2ZmZmZmZlxcdCgyNTUsMjU1LDI1NSlcXG4gICAgaHR0cHM6Ly93d3cuY29sb3ItaGV4LmNvbS9jb2xvci1wYWxldHRlLzY5NjEwXFxuKi9cXG5cXG5ib2R5IHtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogNzBweCAxZnIgNjhweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5OWI1YzM7XFxufVxcblxcbm1haW4ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG5oZWFkZXIsXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGM3ZTk3O1xcbn1cXG5cXG5oZWFkZXIgaDEge1xcbiAgZm9udC1zaXplOiAyLjZyZW07XFxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xcbiAgY29sb3I6ICM5OWI1YzM7XFxuICB0ZXh0LXNoYWRvdzogNHB4IDFweCBibGFjaztcXG4gIHBhZGRpbmc6IDRweCA4cHg7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuZm9ybSNwbGF5ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtYXJnaW4tdG9wOiA3NnB4O1xcbiAgcm93LWdhcDogMjhweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmZvcm0jcGxheWVyID4gbGFiZWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjZyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cXG5sYWJlbCBpbnB1dCB7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBwYWRkaW5nOiAycHggNnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5mb3JtI3BsYXllciBidXR0b24ge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogMnB4IDhweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbnNlY3Rpb24jcGxhY2Uge1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmctdG9wOiAyMHB4O1xcbn1cXG5cXG5zZWN0aW9uI3BsYWNlIGRpdiNwbEJvYXJkIHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBnYXA6IDNweDtcXG59XFxuXFxuc2VjdGlvbiBkaXYjcGxCb2FyZCxcXG5zZWN0aW9uIGRpdi5ib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxuICBvdXRsaW5lOiAycHggc29saWQgYmxhY2s7XFxufVxcblxcbnNlY3Rpb24gZGl2IGRpdi5ncmlkIHtcXG4gIGJvcmRlcjogMDtcXG4gIG91dGxpbmU6IDFweCBzb2xpZCBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxufVxcblxcbnNlY3Rpb24gZGl2IGRpdi5ncmlkLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzkwYTNiNDtcXG59XFxuXFxuc2VjdGlvbiNnYW1lIGRpdiBkaXYuZ3JpZC5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDAuNyk7XFxufVxcblxcbnNlY3Rpb24jZ2FtZSBkaXYgZGl2LmdyaWQubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDI1NSwgMC43KTtcXG59XFxuXFxuc2VjdGlvbiNnYW1lIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAvKiBncmlkLXRlbXBsYXRlLXJvd3M6IDI1MHB4IDFmcjsgKi9cXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLyogc2VjdGlvbiNnYW1lIFxcbmgyI25vdGljZSB7XFxuICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDE3MywgMjU1LCAxNzMpO1xcbiAgd2lkdGg6IDUwMHB4O1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMiwgNTgsIDIyKTtcXG4gIGNvbG9yOiByZ2IoMjQxLCAyMjUsIDEzNCk7XFxuICBmb250LWZhbWlseTogJ0NvdXJpZXIgTmV3JywgQ291cmllciwgbW9ub3NwYWNlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XFxufSAqL1xcblxcbnNlY3Rpb24jZ2FtZSBkaXYuYm9hcmQge1xcbiAgbWFyZ2luLXRvcDogMTQwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDE4cHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDE4cHgpO1xcbn1cXG5cXG5zZWN0aW9uI25vdGljZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU0LCAyNTQsIDAuMyk7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDMwcHg7XFxufVxcblxcbnNlY3Rpb24uaGlkZGVuIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG5mb290ZXIgYTpob3ZlciB7XFxuICBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgMCAycHggd2hpdGUpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvaHRtbC1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL0dpdEh1Yi1NYXJrLUxpZ2h0LTMycHgucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG4vLyBNb2R1bGVcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8wX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfMF9fXyk7XG52YXIgY29kZSA9IFwiPCFET0NUWVBFIGh0bWw+XFxuPGh0bWwgbGFuZz1cXFwiZW5cXFwiPlxcbiAgPGhlYWQ+XFxuICAgIDxtZXRhIGNoYXJzZXQ9XFxcIlVURi04XFxcIiAvPlxcbiAgICA8bWV0YSBodHRwLWVxdWl2PVxcXCJYLVVBLUNvbXBhdGlibGVcXFwiIGNvbnRlbnQ9XFxcIklFPWVkZ2VcXFwiIC8+XFxuICAgIDxtZXRhIG5hbWU9XFxcInZpZXdwb3J0XFxcIiBjb250ZW50PVxcXCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXFxcIiAvPlxcbiAgICA8dGl0bGU+QmF0dGxlc2hpcDwvdGl0bGU+XFxuICA8L2hlYWQ+XFxuICA8Ym9keT5cXG4gICAgPGhlYWRlcj5cXG4gICAgICA8aDE+QmF0dGxlc2hpcDwvaDE+XFxuICAgIDwvaGVhZGVyPlxcbiAgICA8bWFpbj5cXG4gICAgICA8c2VjdGlvbiBpZD1cXFwic3RhcnRcXFwiPlxcbiAgICAgICAgPGZvcm0gYWN0aW9uPVxcXCJcXFwiIG1ldGhvZD1cXFwiZ2V0XFxcIiBpZD1cXFwicGxheWVyXFxcIj5cXG4gICAgICAgICAgPGxhYmVsIGZvcj1cXFwicE5hbWVcXFwiPlxcbiAgICAgICAgICAgIDxwPkVudGVyIFBsYXllciBOYW1lOjwvcD5cXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmFtZT1cXFwibmFtZVxcXCIgaWQ9XFxcInBOYW1lXFxcIiByZXF1aXJlZCAvPlxcbiAgICAgICAgICA8L2xhYmVsPlxcbiAgICAgICAgICA8YnV0dG9uPlN0YXJ0IEdhbWUhPC9idXR0b24+XFxuICAgICAgICA8L2Zvcm0+XFxuICAgICAgPC9zZWN0aW9uPlxcbiAgICAgIDxzZWN0aW9uIGlkPVxcXCJwbGFjZVxcXCIgY2xhc3M9XFxcImhpZGRlblxcXCI+XFxuICAgICAgICA8aDIgY2xhc3M9XFxcIm5vdGljZVxcXCI+U2V0IHlvdXIgQ29tbWFuZGVyPC9oMj5cXG4gICAgICAgIDxidXR0b24gaWQ9XFxcImF4aXNcXFwiPkhvcml6b250YWw8L2J1dHRvbj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcInBsQm9hcmRcXFwiPjwvZGl2PlxcbiAgICAgIDwvc2VjdGlvbj5cXG4gICAgICA8c2VjdGlvbiBpZD1cXFwiZ2FtZVxcXCIgY2xhc3M9XFxcImhpZGRlblxcXCI+XFxuICAgICAgICA8IS0tIDxoMiBpZD1cXFwibm90aWNlXFxcIj5UZXN0IHRyYW5zbWlzc2lvbi4uLjwvaDI+IC0tPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiZ2FtZVBsQm9hcmRcXFwiIGNsYXNzPVxcXCJib2FyZFxcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJnYW1lQ29tcEJvYXJkXFxcIiBjbGFzcz1cXFwiYm9hcmRcXFwiPjwvZGl2PlxcbiAgICAgIDwvc2VjdGlvbj5cXG4gICAgPC9tYWluPlxcbiAgICA8c2VjdGlvbiBpZD1cXFwibm90aWNlXFxcIiBjbGFzcz1cXFwiaGlkZGVuXFxcIj5cXG4gICAgICA8aDIgaWQ9XFxcImFubm91bmNlXFxcIj5UaGUgd2lubmVyIGlzIFBsYXllcjwvaDI+XFxuICAgICAgPGJ1dHRvbiBpZD1cXFwicmVzdGFydFxcXCI+UmVzdGFydDwvYnV0dG9uPlxcbiAgICA8L3NlY3Rpb24+XFxuICAgIDxmb290ZXI+XFxuICAgICAgPGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL1JoYXp6WElYXFxcIj5cXG4gICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzBfX18gKyBcIlxcXCIgYWx0PVxcXCJHaXRIdWJcXFwiIC8+XFxuICAgICAgPC9hPlxcbiAgICA8L2Zvb3Rlcj5cXG4gIDwvYm9keT5cXG48L2h0bWw+XFxuXCI7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZSwgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLm1heWJlTmVlZFF1b3RlcyAmJiAvW1xcdFxcblxcZlxcciBcIic9PD5gXS8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwsIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIi4vaW5kZXguaHRtbFwiO1xuaW1wb3J0IGNvbnRyb2xET00gZnJvbSBcIi4vbW9kdWxlcy9ET01jb250cm9sXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9tb2R1bGVzL2dhbWVcIjtcblxuY29uc29sZS5sb2coXCJIZWxsbyBVcC1za2lsbGluZyBXb3JsZCFcIik7XG5cbmNvbnN0IGdhbWUgPSBHYW1lKCk7XG5cbmdhbWUuc2V0UGxheWVyKCd0ZXN0Jyk7XG5cbmZ1bmN0aW9uIGF0dGFjayAoKSB7XG4gIGdhbWUuYXR0YWNrKFswLCAwXSlcbiAgZ2FtZS5hdHRhY2soWzAsIDFdKVxuICBnYW1lLmF0dGFjayhbMCwgMl0pXG4gIGdhbWUuYXR0YWNrKFswLCAzXSlcbiAgZ2FtZS5hdHRhY2soWzAsIDRdKVxuICBnYW1lLmF0dGFjayhbNywgNl0pXG4gIGdhbWUuYXR0YWNrKFs3LCA1XSlcbiAgZ2FtZS5hdHRhY2soWzMsIDBdKVxuICBnYW1lLmF0dGFjayhbMywgMl0pXG4gIGdhbWUuYXR0YWNrKFszLCAzXSlcbiAgZ2FtZS5hdHRhY2soWzMsIDFdKVxuICBnYW1lLmF0dGFjayhbMiwgOF0pXG4gIGdhbWUuYXR0YWNrKFszLCA4XSlcbiAgZ2FtZS5hdHRhY2soWzQsIDhdKVxuICBnYW1lLmF0dGFjayhbNiwgM10pXG4gIGdhbWUuYXR0YWNrKFs3LCAzXSlcbiAgZ2FtZS5hdHRhY2soWzgsIDNdKVxuXG4gIGNvbnNvbGUubG9nKGdhbWUuc2hvd01lc3NhZ2UoKSk7XG4gIGNvbnNvbGUubG9nKGdhbWUuc2hvd01lc3NhZ2UoKSk7XG4gIFxuICBjb25zdCBib2FyZCA9IGdhbWUuZ2V0R2FtZUJvYXJkKCk7XG4gIGNvbnNvbGUubG9nKGJvYXJkLnBsYXllcilcbiAgY29uc29sZS5sb2coYm9hcmQuY29tcClcbn1cblxuLy8gYXR0YWNrKCkiXSwibmFtZXMiOlsiZGVmYXVsdCIsImF0dGFjaERpdkdyaWQiLCJyZW1vdmVHcmlkIiwiR2FtZSIsInBhcnNlR3JpZENvb3JkcyIsImNvbnRyb2xET00iLCJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWFpbiIsInN0YXJ0U2VjdGlvbiIsInBsYXllckZvcm0iLCJwbGF5ZXJJbnB1dCIsInN0YXJ0QnRuIiwicGxhY2VTaGlwU2VjdGlvbiIsImF4aXNCdG4iLCJwbGFjZVNoaXBCb2FyZCIsImdhbWVTZWN0aW9uIiwiZ2FtZVBsQm9hcmQiLCJnYW1lQ29tcEJvYXJkIiwibm90aWNlU2VjdGlvbiIsIndpbm5lck5vdGljZSIsInJlc3RhcnRCdG4iLCJyZW1vdmVDaGlsZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImdhbWUiLCJib2FyZHMiLCJncmlkQ2xpY2tFdmVudCIsImluZGV4IiwiY29vcmQiLCJhdHRhY2siLCJnZXRHYW1lQm9hcmQiLCJwbGF5ZXIiLCJjb21wIiwiYWRkR3JpZENsaWNrRXZlbnQiLCJjb21wR3JpZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImdyaWQiLCJqIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJsb2FkR2FtZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzZXRQbGF5ZXIiLCJ2YWx1ZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlR3JpZCIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJzaG90Iiwic2hpcCIsImh0bWxCb2FyZCIsImdhbWVCb2FyZCIsInJvdyIsImdyaWRzIiwieCIsInkiLCJNYXRoIiwiZmxvb3IiLCJjb21tYW5kZXJBSSIsImF0dGFja0Nvb3Jkc0VudGVyZWQiLCJ0dXJuIiwiZ2VuZXJhdGVDb29yZHMiLCJyYW5kb20iLCJjaGVja0Nvb3JkaW5hdGVzIiwiY29vcmRzIiwiZW50ZXJlZCIsImNvb3Jkc0NvcHkiLCJlbnRyeSIsInB1c2giLCJpIiwiYXJyIiwiYSIsImIiLCJzcGxpY2UiLCJlbnRlckNvb3JkcyIsImVuZW15Qm9hcmQiLCJwbGF5ZXJUdXJuIiwibGVuZ3RoIiwic2hvd1R1cm4iLCJzdGFydFR1cm4iLCJTaGlwIiwiR2FtZUJvYXJkIiwiY29tbWFuZGVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJwbGFjZWRTaGlwIiwiYW5ub3VuY2VtZW50Iiwic2hvd0dhbWVCb2FyZCIsImRpc3BsYXllZEdhbWVib2FyZCIsImRpc3BsYXllZFJvdyIsImRpcGxheWVkR3JpZCIsInNwYXduQ29vcmRzIiwiX3JlZiIsImF4aXMiLCJzaGlwTGVuZ3RoIiwieEF4aXMiLCJ5QXhpcyIsImNvb3JkaW5hdGVzIiwibmV4dENvb3JkcyIsImdldFNoaXBJbk9yZGVyIiwiY2hlY2tDb29yZHMiLCJncmlkT2siLCJwbGFjZVNoaXAiLCJhcHByb3ByaWF0ZVNoaXAiLCJnZXRMZW5ndGgiLCJjb29yZHNPSyIsImdldE5hbWUiLCJhdHRhY2tTaGlwIiwic2hpcE5hbWUiLCJoaXQiLCJyZXBvcnRBdHRhY2tDb25kaXRpb24iLCJ2ZXNzZWwiLCJmaW5kIiwiaXNTdW5rIiwiZmluZEluZGV4IiwicmVjZWl2ZUF0dGFjayIsImF0dGFja1JlY2VpdmVkIiwiYW5ub3VuY2UiLCJQbGF5ZXIiLCJuYW1lIiwicGxheWVyTmFtZSIsInNob3dOYW1lIiwiYXR0YWNrQm9hcmQiLCJib2FyZCIsImVuZW15VHVybiIsIm5vdE9LIiwiaGl0UmVjZWl2ZWQiLCJwbGF5ZXJCb2FyZCIsImNvbXBCb2FyZCIsIm1lc3NhZ2UiLCJ3aW5uZXIiLCJjYWxsV2lubmVyIiwiZ2FtZWJvYXJkcyIsInVuZGVmaW5lZCIsImdhbWVCb2FyZHMiLCJwbGF5ZXJBdHRhY2siLCJjb21wQXR0YWNrIiwic2hvd01lc3NhZ2UiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==