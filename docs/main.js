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
  const inlineCoords = [];
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
    if (adjacentCoords.length === 1) {
      coordsToFocus.splice(0);
    }
    return adjacentCoords.pop();
  }
  function getInlineCoords() {
    if (inlineCoords.length === 1) {
      coordsToFocus.splice(0);
    }
    return inlineCoords.pop();
  }
  const enterCoords = (enemyBoard, playerTurn) => {
    if (turn === false) return;
    if (attackCoordsEntered.length === 100) return;
    let coords = (0,_helpers_coordinatesHandler__WEBPACK_IMPORTED_MODULE_0__.generateCoords)();
    if (inlineCoords.length) {
      coords = getInlineCoords();
    } else if (adjacentCoords.length) {
      coords = getAdjacentCoords();
    }
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
  function generateInlineCoords() {
    const [x, y] = [...coordsToFocus[0]];
    const [a, b] = [...attackCoordsEntered[attackCoordsEntered.length - 1]];
    if (a === x) {
      if (b < y) {
        if (y + 1 < 10) inlineCoords.push([x, y + 1]);
        if (b - 1 >= 0) inlineCoords.push([a, b - 1]);
      }
      if (b > y) {
        if (b + 1 < 10) inlineCoords.push([a, b + 1]);
        if (y - 1 >= 0) inlineCoords.push([x, y - 1]);
      }
    }
    if (b === y) {
      if (a < x) {
        if (x + 1 < 10) adjacentCoords.push([x + 1, y]);
        if (a - 1 >= 0) adjacentCoords.push([a - 1, b]);
      }
      if (a > x) {
        if (x - 1 >= 0) adjacentCoords.push([x - 1, y]);
        if (a + 1 < 10) adjacentCoords.push([a + 1, b]);
      }
    }
  }
  function getFeedback(feedback) {
    if (feedback === "hit") {
      if (coordsToFocus.length) {
        generateInlineCoords();
        return;
      }
      coordsToFocus.push(attackCoordsEntered[attackCoordsEntered.length - 1]);
      generateAdjacentCoords();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLFFBQVEsWUFBWSxXQUFXLE1BQU0sTUFBTSxNQUFNLFFBQVEsWUFBWSxPQUFPLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxTQUFTLE1BQU0sS0FBSyxzQkFBc0IscUJBQXFCLHFCQUFxQixxQkFBcUIscUJBQXFCLHVCQUF1QixPQUFPLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxNQUFNLE1BQU0sS0FBSyxVQUFVLE9BQU8sT0FBTyxNQUFNLE1BQU0sc0JBQXNCLHFCQUFxQixPQUFPLE1BQU0sTUFBTSxNQUFNLFVBQVUsTUFBTSxPQUFPLE1BQU0sS0FBSyxzQkFBc0IsdUJBQXVCLE9BQU8sTUFBTSxNQUFNLEtBQUssWUFBWSxPQUFPLE9BQU8sTUFBTSxLQUFLLHNCQUFzQixxQkFBcUIsT0FBTyxLQUFLLFFBQVEsT0FBTyxNQUFNLEtBQUssVUFBVSxPQUFPLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFFBQVEsT0FBTyxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxrQkFBa0IsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLE1BQU0sVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE1BQU0sTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEs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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7Ozs7Ozs7Ozs7O0FDQXFCO0FBQ0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvRE9NY29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL2FpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvaGVscGVycy9jb29yZGluYXRlc0hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2hlbHBlcnMvZGl2Qm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZhdWx0IGFzIGF0dGFjaERpdkdyaWQsIHJlbW92ZUdyaWQgfSBmcm9tIFwiLi9oZWxwZXJzL2RpdkJvYXJkXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgcGFyc2VHcmlkQ29vcmRzIGZyb20gXCIuL2hlbHBlcnMvY29vcmRpbmF0ZXNIYW5kbGVyXCI7XG5cbmNvbnN0IGNvbnRyb2xET00gPSAoKCkgPT4ge1xuICAvLyBET00gbm9kZXNcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gIGNvbnN0IG1haW4gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICBjb25zdCBzdGFydFNlY3Rpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uI3N0YXJ0XCIpO1xuICBjb25zdCBwbGF5ZXJGb3JtID0gc3RhcnRTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtI3BsYXllclwiKTtcbiAgY29uc3QgcGxheWVySW5wdXQgPSBwbGF5ZXJGb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dCNwTmFtZVwiKTtcbiAgY29uc3Qgc3RhcnRCdG4gPSBzdGFydFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtcblxuICBjb25zdCBwbGFjZVNoaXBTZWN0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbiNwbGFjZVwiKTtcbiAgY29uc3QgYXhpc0J0biA9IHBsYWNlU2hpcFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImJ1dHRvbiNheGlzXCIpO1xuICBjb25zdCBwbGFjZVNoaXBCb2FyZCA9IHBsYWNlU2hpcFNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImRpdiNwbEJvYXJkXCIpO1xuICBjb25zdCBzaGlwU2VsZWN0aW9uID0gcGxhY2VTaGlwU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZGl2I3NlbGVjdGlvblwiKTtcbiAgY29uc3QgZG9tQ29tbWFuZGVyID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZGl2I2NvbW1hbmRlclwiKTtcbiAgY29uc3QgZG9tQmF0dGxlc2hpcCA9IHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcImRpdiNiYXR0bGVzaGlwXCIpO1xuICBjb25zdCBkb21EZXN0cm95ZXIgPSBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJkaXYjZGVzdHJveWVyXCIpO1xuICBjb25zdCBkb21TdWJtYXJpbmUgPSBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJkaXYjc3VibWFyaW5lXCIpO1xuICBjb25zdCBkb21QYXRyb2xCb2F0ID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFwiZGl2I3BhdHJvbEJvYXRcIik7XG4gIGNvbnN0IGJhdHRsZUJ0biA9IHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcImJ1dHRvbiNiYXR0bGVcIik7XG5cbiAgY29uc3QgZ2FtZVNlY3Rpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uI2dhbWVcIik7XG4gIGNvbnN0IGdhbWVQbEJvYXJkID0gZ2FtZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImRpdiNnYW1lUGxCb2FyZFwiKTtcbiAgY29uc3QgZ2FtZUNvbXBCb2FyZCA9IGdhbWVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCJkaXYjZ2FtZUNvbXBCb2FyZFwiKTtcblxuICBjb25zdCBub3RpY2VTZWN0aW9uID0gYm9keS5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbiNub3RpY2VcIik7XG4gIGNvbnN0IHdpbm5lck5vdGljZSA9IG5vdGljZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcImgyI2Fubm91bmNlXCIpO1xuICBjb25zdCByZXN0YXJ0QnRuID0gbm90aWNlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uI3Jlc3RhcnRcIik7XG5cbiAgLy8gSW5pdGlhbCBMb2FkXG5cbiAgLy8gbWFpbi5yZW1vdmVDaGlsZChzdGFydFNlY3Rpb24pO1xuICAvLyBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbUNvbW1hbmRlcik7XG4gIHNoaXBTZWxlY3Rpb24ucmVtb3ZlQ2hpbGQoZG9tQmF0dGxlc2hpcCk7XG4gIHNoaXBTZWxlY3Rpb24ucmVtb3ZlQ2hpbGQoZG9tRGVzdHJveWVyKTtcbiAgc2hpcFNlbGVjdGlvbi5yZW1vdmVDaGlsZChkb21TdWJtYXJpbmUpO1xuICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbVBhdHJvbEJvYXQpO1xuICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGJhdHRsZUJ0bik7XG4gIG1haW4ucmVtb3ZlQ2hpbGQocGxhY2VTaGlwU2VjdGlvbik7XG4gIHBsYWNlU2hpcFNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgbWFpbi5yZW1vdmVDaGlsZChnYW1lU2VjdGlvbik7XG4gIGdhbWVTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIGJvZHkucmVtb3ZlQ2hpbGQobm90aWNlU2VjdGlvbik7XG4gIG5vdGljZVNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcblxuICBjb25zdCBnYW1lID0gR2FtZSgpO1xuICBsZXQgZ2V0Qm9hcmRzO1xuICBsZXQgYXhpcyA9IFwieFwiO1xuICBsZXQgZ2FtZUZpbmlzaGVkID0gZmFsc2U7XG5cbiAgLy8gRnVuY3Rpb25zIGZvciBET00gY29udHJvbFxuXG4gIGNvbnN0IHVwZGF0ZUFwcEJvYXJkID0gKCkgPT4ge1xuICAgIGdldEJvYXJkcyA9IGdhbWUuZ2V0R2FtZUJvYXJkKCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gY2hhbmdlQXhpcyhlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgIGF4aXMgPSBcInlcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgYXhpcyA9IFwieFwiO1xuICAgIH1cbiAgICBpZiAoYXhpc0J0bi50ZXh0Q29udGVudCA9PT0gXCJIb3Jpem9udGFsXCIpIHtcbiAgICAgIGF4aXNCdG4udGV4dENvbnRlbnQgPSBcIlZlcnRpY2FsXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF4aXNCdG4udGV4dENvbnRlbnQgPSBcIkhvcml6b250YWxcIjtcbiAgICB9XG4gICAgZG9tQ29tbWFuZGVyLmNsYXNzTGlzdC50b2dnbGUoXCJheGlzWVwiKTtcbiAgICBkb21CYXR0bGVzaGlwLmNsYXNzTGlzdC50b2dnbGUoXCJheGlzWVwiKTtcbiAgICBkb21EZXN0cm95ZXIuY2xhc3NMaXN0LnRvZ2dsZShcImF4aXNZXCIpO1xuICAgIGRvbVN1Ym1hcmluZS5jbGFzc0xpc3QudG9nZ2xlKFwiYXhpc1lcIik7XG4gICAgZG9tUGF0cm9sQm9hdC5jbGFzc0xpc3QudG9nZ2xlKFwiYXhpc1lcIik7XG4gICAgYmF0dGxlQnRuLmNsYXNzTGlzdC50b2dnbGUoXCJheGlzWVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZURPTUJvYXJkKHBsYXllckJvYXJkLCBjb21wQm9hcmQpIHtcbiAgICByZW1vdmVHcmlkKHBsYXllckJvYXJkKTtcbiAgICBhdHRhY2hEaXZHcmlkKHBsYXllckJvYXJkLCBnZXRCb2FyZHMucGxheWVyLCBcInBsYXllclwiKTtcbiAgICBpZiAoY29tcEJvYXJkKSB7XG4gICAgICByZW1vdmVHcmlkKGNvbXBCb2FyZCk7XG4gICAgICBhdHRhY2hEaXZHcmlkKGNvbXBCb2FyZCwgZ2V0Qm9hcmRzLmNvbXApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFubm91bmNlV2lubmVyKCkge1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobm90aWNlU2VjdGlvbik7XG4gICAgd2lubmVyTm90aWNlLnRleHRDb250ZW50ID0gZ2FtZS5zaG93TWVzc2FnZSgpO1xuICB9XG5cbiAgY29uc3QgZ3JpZENsaWNrRXZlbnQgPSAoaW5kZXgpID0+IHtcbiAgICBjb25zdCBjb29yZCA9IHBhcnNlR3JpZENvb3JkcyhpbmRleCk7XG4gICAgZ2FtZS5hdHRhY2soY29vcmQpO1xuICAgIHVwZGF0ZUFwcEJvYXJkKCk7XG4gICAgdXBkYXRlRE9NQm9hcmQoZ2FtZVBsQm9hcmQsIGdhbWVDb21wQm9hcmQpO1xuICAgIGlmIChnYW1lLnNob3dNZXNzYWdlKCkgPT09IFwiQWxsIHNoaXBzIGhhcyBiZWVuIHNhbmshXCIpIHtcbiAgICAgIGdhbWVGaW5pc2hlZCA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KGFubm91bmNlV2lubmVyLCA1MDApO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBhZGRHcmlkQ2xpY2tFdmVudCgpIHtcbiAgICBjb25zdCBjb21wR3JpZHMgPSBnYW1lQ29tcEJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYuZ3JpZFwiKTtcbiAgICBjb21wR3JpZHMuZm9yRWFjaCgoZ3JpZCwgaikgPT4ge1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZ3JpZENsaWNrRXZlbnQoaik7XG4gICAgICAgIGlmICghZ2FtZUZpbmlzaGVkKSB7XG4gICAgICAgICAgYWRkR3JpZENsaWNrRXZlbnQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVTaGlwU2VsZWN0aW9uKCkge1xuICAgIGlmIChzaGlwU2VsZWN0aW9uLmNvbnRhaW5zKGRvbUNvbW1hbmRlcikpIHtcbiAgICAgIHNoaXBTZWxlY3Rpb24ucmVtb3ZlQ2hpbGQoZG9tQ29tbWFuZGVyKTtcbiAgICAgIHNoaXBTZWxlY3Rpb24uYXBwZW5kQ2hpbGQoZG9tQmF0dGxlc2hpcCk7XG4gICAgfSBlbHNlIGlmIChzaGlwU2VsZWN0aW9uLmNvbnRhaW5zKGRvbUJhdHRsZXNoaXApKSB7XG4gICAgICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbUJhdHRsZXNoaXApO1xuICAgICAgc2hpcFNlbGVjdGlvbi5hcHBlbmRDaGlsZChkb21EZXN0cm95ZXIpO1xuICAgIH0gZWxzZSBpZiAoc2hpcFNlbGVjdGlvbi5jb250YWlucyhkb21EZXN0cm95ZXIpKSB7XG4gICAgICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbURlc3Ryb3llcik7XG4gICAgICBzaGlwU2VsZWN0aW9uLmFwcGVuZENoaWxkKGRvbVN1Ym1hcmluZSk7XG4gICAgfSBlbHNlIGlmIChzaGlwU2VsZWN0aW9uLmNvbnRhaW5zKGRvbVN1Ym1hcmluZSkpIHtcbiAgICAgIHNoaXBTZWxlY3Rpb24ucmVtb3ZlQ2hpbGQoZG9tU3VibWFyaW5lKTtcbiAgICAgIHNoaXBTZWxlY3Rpb24uYXBwZW5kQ2hpbGQoZG9tUGF0cm9sQm9hdCk7XG4gICAgfSBlbHNlIGlmIChzaGlwU2VsZWN0aW9uLmNvbnRhaW5zKGRvbVBhdHJvbEJvYXQpKSB7XG4gICAgICBzaGlwU2VsZWN0aW9uLnJlbW92ZUNoaWxkKGRvbVBhdHJvbEJvYXQpO1xuICAgICAgc2hpcFNlbGVjdGlvbi5hcHBlbmRDaGlsZChiYXR0bGVCdG4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFNoaXBFdmVudChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgY29vcmRzID0gcGFyc2VHcmlkQ29vcmRzKHRoaXMpO1xuXG4gICAgZ2FtZS5zZXRQbGF5ZXJTaGlwKGNvb3JkcywgYXhpcyk7XG4gICAgdXBkYXRlQXBwQm9hcmQoKTtcbiAgICBpZiAoZ2FtZS5zaG93TWVzc2FnZSgpICE9PSBcIkNoZWNrIGNvb3JkaW5hdGVzIGFnYWluLlwiKSB7XG4gICAgICB0b2dnbGVTaGlwU2VsZWN0aW9uKCk7XG4gICAgICB1cGRhdGVET01Cb2FyZChwbGFjZVNoaXBCb2FyZCk7XG4gICAgICBzZXREcmFnTkRyb3BFdmVudHMocGxhY2VTaGlwQm9hcmQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldERyYWdORHJvcEV2ZW50cyhwbEJvYXJkKSB7XG4gICAgY29uc3QgcGxHcmlkcyA9IHBsQm9hcmQucXVlcnlTZWxlY3RvckFsbChcImRpdi5ncmlkXCIpO1xuICAgIHBsR3JpZHMuZm9yRWFjaCgoZ3JpZCwgaW5kZXgpID0+IHtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBzZXRTaGlwRXZlbnQuYmluZChpbmRleCkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZEdhbWUoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGdhbWUuc2V0UGxheWVyKHBsYXllcklucHV0LnZhbHVlKTtcbiAgICB1cGRhdGVBcHBCb2FyZCgpO1xuICAgIGF0dGFjaERpdkdyaWQocGxhY2VTaGlwQm9hcmQsIGdldEJvYXJkcy5wbGF5ZXIsIFwicGxheWVyXCIpO1xuICAgIHNldERyYWdORHJvcEV2ZW50cyhwbGFjZVNoaXBCb2FyZCk7XG4gICAgbWFpbi5yZW1vdmVDaGlsZChzdGFydFNlY3Rpb24pO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocGxhY2VTaGlwU2VjdGlvbik7XG4gICAgcGxheWVySW5wdXQudmFsdWUgPSBcIlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRCYXR0bGUoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB1cGRhdGVBcHBCb2FyZCgpO1xuICAgIGF0dGFjaERpdkdyaWQoZ2FtZVBsQm9hcmQsIGdldEJvYXJkcy5wbGF5ZXIsIFwicGxheWVyXCIpO1xuICAgIGF0dGFjaERpdkdyaWQoZ2FtZUNvbXBCb2FyZCwgZ2V0Qm9hcmRzLmNvbXApO1xuICAgIGFkZEdyaWRDbGlja0V2ZW50KCk7XG4gICAgbWFpbi5yZW1vdmVDaGlsZChwbGFjZVNoaXBTZWN0aW9uKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGdhbWVTZWN0aW9uKTtcbiAgfVxuXG4gIC8vIEV2ZW50bGlzdGVuZXJzXG5cbiAgcGxheWVyRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGxvYWRHYW1lKTtcbiAgYXhpc0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hhbmdlQXhpcyk7XG4gIGJhdHRsZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRCYXR0bGUpO1xuICByZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9KTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xET007XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZUNvb3JkcyB9IGZyb20gXCIuLi9oZWxwZXJzL2Nvb3JkaW5hdGVzSGFuZGxlclwiO1xuXG5jb25zdCBjb21tYW5kZXJBSSA9ICgpID0+IHtcbiAgY29uc3QgYXR0YWNrQ29vcmRzRW50ZXJlZCA9IFtdO1xuICBjb25zdCBjb29yZHNUb0ZvY3VzID0gW107XG4gIGNvbnN0IGFkamFjZW50Q29vcmRzID0gW107XG4gIGNvbnN0IGlubGluZUNvb3JkcyA9IFtdO1xuICBsZXQgdHVybiA9IGZhbHNlO1xuXG4gIGNvbnN0IGNoZWNrQ29vcmRpbmF0ZXMgPSAoY29vcmRzKSA9PiB7XG4gICAgbGV0IGVudGVyZWQgPSBmYWxzZTtcbiAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRzXTtcbiAgICBjb25zdCBjb29yZHNDb3B5ID0gW107XG4gICAgYXR0YWNrQ29vcmRzRW50ZXJlZC5mb3JFYWNoKChlbnRyeSkgPT4gY29vcmRzQ29weS5wdXNoKGVudHJ5KSk7XG4gICAgY29vcmRzQ29weS5mb3JFYWNoKChlbnRyeSwgaSwgYXJyKSA9PiB7XG4gICAgICBjb25zdCBbYSwgYl0gPSBbLi4uZW50cnldO1xuICAgICAgaWYgKGEgPT09IHggJiYgYiA9PT0geSkge1xuICAgICAgICBlbnRlcmVkID0gdHJ1ZTtcbiAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRlcmVkO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGdldEFkamFjZW50Q29vcmRzKCkge1xuICAgIGlmIChhZGphY2VudENvb3Jkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvb3Jkc1RvRm9jdXMuc3BsaWNlKDApO1xuICAgIH1cbiAgICByZXR1cm4gYWRqYWNlbnRDb29yZHMucG9wKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbmxpbmVDb29yZHMoKSB7XG4gICAgaWYgKGlubGluZUNvb3Jkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvb3Jkc1RvRm9jdXMuc3BsaWNlKDApO1xuICAgIH1cbiAgICByZXR1cm4gaW5saW5lQ29vcmRzLnBvcCgpO1xuICB9XG5cbiAgY29uc3QgZW50ZXJDb29yZHMgPSAoZW5lbXlCb2FyZCwgcGxheWVyVHVybikgPT4ge1xuICAgIGlmICh0dXJuID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIGlmIChhdHRhY2tDb29yZHNFbnRlcmVkLmxlbmd0aCA9PT0gMTAwKSByZXR1cm47XG4gICAgbGV0IGNvb3JkcyA9IGdlbmVyYXRlQ29vcmRzKCk7XG4gICAgaWYgKGlubGluZUNvb3Jkcy5sZW5ndGgpIHtcbiAgICAgIGNvb3JkcyA9IGdldElubGluZUNvb3JkcygpO1xuICAgIH0gZWxzZSBpZiAoYWRqYWNlbnRDb29yZHMubGVuZ3RoKSB7XG4gICAgICBjb29yZHMgPSBnZXRBZGphY2VudENvb3JkcygpO1xuICAgIH1cbiAgICBjb25zdCBlbnRlcmVkID0gY2hlY2tDb29yZGluYXRlcyhjb29yZHMpO1xuICAgIGlmICghZW50ZXJlZCkge1xuICAgICAgYXR0YWNrQ29vcmRzRW50ZXJlZC5wdXNoKGNvb3Jkcyk7XG4gICAgICBlbmVteUJvYXJkKGNvb3Jkcyk7XG4gICAgICB0dXJuID0gZmFsc2U7XG4gICAgICBwbGF5ZXJUdXJuKCk7XG4gICAgfSBlbHNlIGlmIChlbnRlcmVkKSB7XG4gICAgICBlbnRlckNvb3JkcyhlbmVteUJvYXJkLCBwbGF5ZXJUdXJuKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2hvd1R1cm4gPSAoKSA9PiB0dXJuO1xuXG4gIGNvbnN0IHN0YXJ0VHVybiA9ICgpID0+IHtcbiAgICB0dXJuID0gdHJ1ZTtcbiAgfTtcblxuICBmdW5jdGlvbiBnZW5lcmF0ZUFkamFjZW50Q29vcmRzKCkge1xuICAgIGNvbnN0IFt4LCB5XSA9IFsuLi5jb29yZHNUb0ZvY3VzWzBdXTtcbiAgICBpZiAoeSArIDEgPCAxMCkgYWRqYWNlbnRDb29yZHMucHVzaChbeCwgeSArIDFdKTtcbiAgICBpZiAoeCArIDEgPCAxMCkgYWRqYWNlbnRDb29yZHMucHVzaChbeCArIDEsIHldKTtcbiAgICBpZiAoeSAtIDEgPj0gMCkgYWRqYWNlbnRDb29yZHMucHVzaChbeCwgeSAtIDFdKTtcbiAgICBpZiAoeCAtIDEgPj0gMCkgYWRqYWNlbnRDb29yZHMucHVzaChbeCAtIDEsIHldKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSW5saW5lQ29vcmRzKCkge1xuICAgIGNvbnN0IFt4LCB5XSA9IFsuLi5jb29yZHNUb0ZvY3VzWzBdXTtcbiAgICBjb25zdCBbYSwgYl0gPSBbLi4uYXR0YWNrQ29vcmRzRW50ZXJlZFthdHRhY2tDb29yZHNFbnRlcmVkLmxlbmd0aCAtIDFdXTtcbiAgICBpZiAoYSA9PT0geCkge1xuICAgICAgaWYgKGIgPCB5KSB7XG4gICAgICAgIGlmICh5ICsgMSA8IDEwKSBpbmxpbmVDb29yZHMucHVzaChbeCwgeSArIDFdKTtcbiAgICAgICAgaWYgKGIgLSAxID49IDApIGlubGluZUNvb3Jkcy5wdXNoKFthLCBiIC0gMV0pO1xuICAgICAgfVxuICAgICAgaWYgKGIgPiB5KSB7XG4gICAgICAgIGlmIChiICsgMSA8IDEwKSBpbmxpbmVDb29yZHMucHVzaChbYSwgYiArIDFdKTtcbiAgICAgICAgaWYgKHkgLSAxID49IDApIGlubGluZUNvb3Jkcy5wdXNoKFt4LCB5IC0gMV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYiA9PT0geSkge1xuICAgICAgaWYgKGEgPCB4KSB7XG4gICAgICAgIGlmICh4ICsgMSA8IDEwKSBhZGphY2VudENvb3Jkcy5wdXNoKFt4ICsgMSwgeV0pO1xuICAgICAgICBpZiAoYSAtIDEgPj0gMCkgYWRqYWNlbnRDb29yZHMucHVzaChbYSAtIDEsIGJdKTtcbiAgICAgIH1cbiAgICAgIGlmIChhID4geCkge1xuICAgICAgICBpZiAoeCAtIDEgPj0gMCkgYWRqYWNlbnRDb29yZHMucHVzaChbeCAtIDEsIHldKTtcbiAgICAgICAgaWYgKGEgKyAxIDwgMTApIGFkamFjZW50Q29vcmRzLnB1c2goW2EgKyAxLCBiXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RmVlZGJhY2soZmVlZGJhY2spIHtcbiAgICBpZiAoZmVlZGJhY2sgPT09IFwiaGl0XCIpIHtcbiAgICAgIGlmIChjb29yZHNUb0ZvY3VzLmxlbmd0aCkge1xuICAgICAgICBnZW5lcmF0ZUlubGluZUNvb3JkcygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb29yZHNUb0ZvY3VzLnB1c2goYXR0YWNrQ29vcmRzRW50ZXJlZFthdHRhY2tDb29yZHNFbnRlcmVkLmxlbmd0aCAtIDFdKTtcbiAgICAgIGdlbmVyYXRlQWRqYWNlbnRDb29yZHMoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBlbnRlckNvb3Jkcywgc2hvd1R1cm4sIHN0YXJ0VHVybiwgZ2V0RmVlZGJhY2sgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRlckFJO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgZ2VuZXJhdGVDb29yZHMgfSBmcm9tIFwiLi4vaGVscGVycy9jb29yZGluYXRlc0hhbmRsZXJcIjtcblxuY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBnYW1lQm9hcmQgPSBbXTtcblxuICBjb25zdCBjb21tYW5kZXIgPSBTaGlwKFwiQ29tbWFuZGVyXCIsIDUpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gU2hpcChcIkJhdHRsZXNoaXBcIiwgNCk7XG4gIGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoXCJEZXN0cm95ZXJcIiwgMyk7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoXCJTdWJtYXJpbmVcIiwgMyk7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBTaGlwKFwiUGF0cm9sIEJvYXRcIiwgMik7XG5cbiAgY29uc3QgcGxhY2VkU2hpcCA9IFtdO1xuXG4gIGxldCBhbm5vdW5jZW1lbnQgPSBcIlwiO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgY29uc3QgZ3JpZCA9IHsgc2hvdDogbnVsbCB9O1xuICAgICAgcm93LnB1c2goZ3JpZCk7XG4gICAgfVxuICAgIGdhbWVCb2FyZC5wdXNoKHJvdyk7XG4gIH1cblxuICBjb25zdCBzaG93R2FtZUJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXllZEdhbWVib2FyZCA9IFtdO1xuICAgIGdhbWVCb2FyZC5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgIGNvbnN0IGRpc3BsYXllZFJvdyA9IFtdO1xuICAgICAgcm93LmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgICAgY29uc3QgZGlwbGF5ZWRHcmlkID0geyAuLi5ncmlkIH07XG4gICAgICAgIGRpc3BsYXllZFJvdy5wdXNoKGRpcGxheWVkR3JpZCk7XG4gICAgICB9KTtcbiAgICAgIGRpc3BsYXllZEdhbWVib2FyZC5wdXNoKGRpc3BsYXllZFJvdyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRpc3BsYXllZEdhbWVib2FyZDtcbiAgfTtcblxuICBjb25zdCBzcGF3bkNvb3JkcyA9IChbeCwgeV0sIGF4aXMsIHNoaXBMZW5ndGgpID0+IHtcbiAgICBsZXQgeEF4aXMgPSB4O1xuICAgIGxldCB5QXhpcyA9IHk7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbW3hBeGlzLCB5QXhpc11dO1xuICAgIGlmIChheGlzID09PSBcInhcIikge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwTGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgeUF4aXMgKz0gMTtcbiAgICAgICAgY29uc3QgbmV4dENvb3JkcyA9IFt4QXhpcywgeUF4aXNdO1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKG5leHRDb29yZHMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcExlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHhBeGlzICs9IDE7XG4gICAgICAgIGNvbnN0IG5leHRDb29yZHMgPSBbeEF4aXMsIHlBeGlzXTtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChuZXh0Q29vcmRzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBJbk9yZGVyID0gKCkgPT4ge1xuICAgIGxldCBzaGlwO1xuICAgIHN3aXRjaCAocGxhY2VkU2hpcC5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgc2hpcCA9IGJhdHRsZXNoaXA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzaGlwID0gZGVzdHJveWVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgc2hpcCA9IHN1Ym1hcmluZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHNoaXAgPSBwYXRyb2xCb2F0O1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHNoaXAgPSBjb21tYW5kZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoaXA7XG4gIH07XG5cbiAgY29uc3QgY2hlY2tDb29yZHMgPSAoY29vcmRzKSA9PiB7XG4gICAgbGV0IGdyaWRPaztcbiAgICBjb29yZHMuZm9yRWFjaCgoY29vcmQsIGksIGFycikgPT4ge1xuICAgICAgY29uc3QgW3gsIHldID0gWy4uLmNvb3JkXTtcbiAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIHggPCAwOlxuICAgICAgICAgIGdyaWRPayA9IGZhbHNlO1xuICAgICAgICAgIGFyci5zcGxpY2UoaSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYXNlIHkgPCAwOlxuICAgICAgICAgIGdyaWRPayA9IGZhbHNlO1xuICAgICAgICAgIGFyci5zcGxpY2UoaSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYXNlIHggPiA5OlxuICAgICAgICAgIGdyaWRPayA9IGZhbHNlO1xuICAgICAgICAgIGFyci5zcGxpY2UoaSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYXNlIHkgPiA5OlxuICAgICAgICAgIGdyaWRPayA9IGZhbHNlO1xuICAgICAgICAgIGFyci5zcGxpY2UoaSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGdyaWRPayA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoZ2FtZUJvYXJkW3hdW3ldLnNoaXApIHtcbiAgICAgICAgZ3JpZE9rID0gZmFsc2U7XG4gICAgICAgIGFyci5zcGxpY2UoaSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGdyaWRPaztcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoY29vcmQsIGF4aXMpID0+IHtcbiAgICBpZiAocGxhY2VkU2hpcC5sZW5ndGggPT09IDUpIHJldHVybjtcbiAgICBjb25zdCBhcHByb3ByaWF0ZVNoaXAgPSBnZXRTaGlwSW5PcmRlcigpO1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gc3Bhd25Db29yZHMoY29vcmQsIGF4aXMsIGFwcHJvcHJpYXRlU2hpcC5nZXRMZW5ndGgoKSk7XG4gICAgY29uc3QgY29vcmRzT0sgPSBjaGVja0Nvb3Jkcyhjb29yZGluYXRlcyk7XG4gICAgaWYgKCFjb29yZHNPSykge1xuICAgICAgYW5ub3VuY2VtZW50ID0gXCJDaGVjayBjb29yZGluYXRlcyBhZ2Fpbi5cIjtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgY29uc3QgW3gsIHldID0gWy4uLmdyaWRdO1xuICAgICAgZ2FtZUJvYXJkW3hdW3ldLnNoaXAgPSBhcHByb3ByaWF0ZVNoaXAuZ2V0TmFtZSgpO1xuICAgIH0pO1xuXG4gICAgcGxhY2VkU2hpcC5wdXNoKGFwcHJvcHJpYXRlU2hpcCk7XG4gICAgaWYgKHBsYWNlZFNoaXAubGVuZ3RoID09PSA1KSB7XG4gICAgICBhbm5vdW5jZW1lbnQgPSBcIkFsbCBzaGlwcyBoYXMgYmVlbiBwbGFjZWQuXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFubm91bmNlbWVudCA9IGBQbGFjZWQgJHthcHByb3ByaWF0ZVNoaXAuZ2V0TmFtZSgpfWA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGF0dGFja1NoaXAgPSAoc2hpcE5hbWUpID0+IHtcbiAgICBwbGFjZWRTaGlwLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmdldE5hbWUoKSA9PT0gc2hpcE5hbWUpIHNoaXAuaGl0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVwb3J0QXR0YWNrQ29uZGl0aW9uID0gKGdyaWQpID0+IHtcbiAgICBhbm5vdW5jZW1lbnQgPSBncmlkLnNob3Q7XG4gICAgaWYgKCFncmlkLnNoaXApIHJldHVybjtcbiAgICBjb25zdCB2ZXNzZWwgPSBwbGFjZWRTaGlwLmZpbmQoKHNoaXApID0+IHNoaXAuZ2V0TmFtZSgpID09PSBncmlkLnNoaXApO1xuICAgIGlmICghdmVzc2VsLmlzU3VuaygpKSByZXR1cm47XG4gICAgYW5ub3VuY2VtZW50ID0gYCR7dmVzc2VsLmdldE5hbWUoKX0gaGFzIGJlZW4gc2FuayFgO1xuICAgIGNvbnN0IGluZGV4ID0gcGxhY2VkU2hpcC5maW5kSW5kZXgoKHNoaXApID0+IHNoaXAgPT09IHZlc3NlbCk7XG4gICAgcGxhY2VkU2hpcC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGlmIChwbGFjZWRTaGlwLmxlbmd0aCA9PT0gMCkgYW5ub3VuY2VtZW50ID0gYEFsbCBzaGlwcyBoYXMgYmVlbiBzYW5rIWA7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZCkgPT4ge1xuICAgIGNvbnN0IFt4LCB5XSA9IFsuLi5jb29yZF07XG4gICAgbGV0IGF0dGFja1JlY2VpdmVkID0gdHJ1ZTtcbiAgICBjb25zdCBncmlkID0gZ2FtZUJvYXJkW3hdW3ldO1xuICAgIGlmIChncmlkLnNob3QgIT09IG51bGwpIHtcbiAgICAgIGF0dGFja1JlY2VpdmVkID0gZmFsc2U7XG4gICAgICBhbm5vdW5jZW1lbnQgPSBcIklsbGVnYWwgc2hvdCFcIjtcbiAgICAgIHJldHVybiBhdHRhY2tSZWNlaXZlZDtcbiAgICB9XG4gICAgaWYgKGdyaWQuc2hpcCkge1xuICAgICAgZ3JpZC5zaG90ID0gXCJoaXRcIjtcbiAgICAgIGF0dGFja1NoaXAoZ3JpZC5zaGlwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JpZC5zaG90ID0gXCJtaXNzXCI7XG4gICAgfVxuICAgIHJlcG9ydEF0dGFja0NvbmRpdGlvbihncmlkKTtcbiAgICByZXR1cm4gYXR0YWNrUmVjZWl2ZWQ7XG4gIH07XG5cbiAgY29uc3QgYW5ub3VuY2UgPSAoKSA9PiBhbm5vdW5jZW1lbnQ7XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwUmFuZG9tbHkoKSB7XG4gICAgaWYgKGFubm91bmNlbWVudCA9PT0gXCJBbGwgc2hpcHMgaGFzIGJlZW4gcGxhY2VkLlwiKSByZXR1cm47XG4gICAgY29uc3QgcmVmZXJlbmNlTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgY29uc3QgcmFuZG9tQXhpcyA9IHJlZmVyZW5jZU51bSA9PT0gMCA/IFwieFwiIDogXCJ5XCI7XG4gICAgcGxhY2VTaGlwKGdlbmVyYXRlQ29vcmRzKCksIHJhbmRvbUF4aXMpO1xuICAgIHBsYWNlU2hpcFJhbmRvbWx5KCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNob3dHYW1lQm9hcmQsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYW5ub3VuY2UsXG4gICAgcGxhY2VTaGlwUmFuZG9tbHksXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lQm9hcmQ7XG4iLCJjb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcblxuICBsZXQgdHVybiA9IHRydWU7XG5cbiAgY29uc3Qgc2hvd05hbWUgPSAoKSA9PiBwbGF5ZXJOYW1lO1xuXG4gIGNvbnN0IHNob3dUdXJuID0gKCkgPT4gdHVybjtcblxuICBjb25zdCBhdHRhY2tCb2FyZCA9IChjb29yZHMsIGJvYXJkLCBlbmVteVR1cm4pID0+IHtcbiAgICBjb25zdCBub3RPSyA9IGZhbHNlO1xuICAgIGlmICh0dXJuID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIGlmIChib2FyZChjb29yZHMpID09PSBub3RPSykgcmV0dXJuO1xuICAgIHR1cm4gPSBmYWxzZTtcbiAgICBlbmVteVR1cm4oKTtcbiAgfTtcblxuICBjb25zdCBzdGFydFR1cm4gPSAoKSA9PiB7XG4gICAgdHVybiA9IHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIHsgc2hvd05hbWUsIHNob3dUdXJuLCBhdHRhY2tCb2FyZCwgc3RhcnRUdXJuIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBTaGlwID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwTmFtZSA9IG5hbWU7XG4gIGNvbnN0IHNoaXBMZW5ndGggPSBsZW5ndGg7XG4gIGxldCBoaXRSZWNlaXZlZCA9IDA7XG4gIGNvbnN0IGhpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoaGl0UmVjZWl2ZWQgPT09IHNoaXBMZW5ndGgpIHJldHVybjtcbiAgICBoaXRSZWNlaXZlZCArPSAxO1xuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGhpdFJlY2VpdmVkID09PSBzaGlwTGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IHNoaXBMZW5ndGg7XG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBzaGlwTmFtZTtcblxuICByZXR1cm4geyBoaXQsIGlzU3VuaywgZ2V0TGVuZ3RoLCBnZXROYW1lIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZUJvYXJkXCI7XG5pbXBvcnQgY29tbWFuZGVyQUkgZnJvbSBcIi4vZmFjdG9yaWVzL2FpXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2ZhY3Rvcmllcy9wbGF5ZXJcIjtcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgbGV0IHBsYXllcjtcbiAgY29uc3QgY29tcCA9IGNvbW1hbmRlckFJKCk7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXBCb2FyZCA9IEdhbWVCb2FyZCgpO1xuICBsZXQgbWVzc2FnZTtcbiAgbGV0IHdpbm5lcjtcbiAgbGV0IGNhbGxXaW5uZXIgPSBmYWxzZTtcblxuICBjb25zdCBzZXRQbGF5ZXIgPSAobmFtZSkgPT4ge1xuICAgIGlmIChwbGF5ZXIgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgIHBsYXllciA9IFBsYXllcihuYW1lKTtcbiAgfTtcblxuICBjb25zdCBnZXRHYW1lQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgZ2FtZUJvYXJkcyA9IHtcbiAgICAgIHBsYXllcjogcGxheWVyQm9hcmQuc2hvd0dhbWVCb2FyZCgpLFxuICAgICAgY29tcDogY29tcEJvYXJkLnNob3dHYW1lQm9hcmQoKSxcbiAgICB9O1xuICAgIHJldHVybiBnYW1lQm9hcmRzO1xuICB9O1xuXG4gIGNvbnN0IHBsYXllckF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICBpZiAocGxheWVyLnNob3dUdXJuKCkgPT09IGZhbHNlKSByZXR1cm47XG4gICAgcGxheWVyLmF0dGFja0JvYXJkKGNvb3JkcywgY29tcEJvYXJkLnJlY2VpdmVBdHRhY2ssIGNvbXAuc3RhcnRUdXJuKTtcbiAgICBtZXNzYWdlID0gY29tcEJvYXJkLmFubm91bmNlKCk7XG4gICAgaWYgKG1lc3NhZ2UgPT09IFwiQWxsIHNoaXBzIGhhcyBiZWVuIHNhbmshXCIpIHdpbm5lciA9IHBsYXllci5zaG93TmFtZSgpO1xuICB9O1xuXG4gIGNvbnN0IGNvbXBBdHRhY2sgPSAoKSA9PiB7XG4gICAgaWYgKGNvbXAuc2hvd1R1cm4oKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICBjb21wLmVudGVyQ29vcmRzKHBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2ssIHBsYXllci5zdGFydFR1cm4pO1xuICAgIG1lc3NhZ2UgPSBwbGF5ZXJCb2FyZC5hbm5vdW5jZSgpO1xuICAgIGNvbXAuZ2V0RmVlZGJhY2sobWVzc2FnZSk7XG4gICAgaWYgKG1lc3NhZ2UgPT09IFwiQWxsIHNoaXBzIGhhcyBiZWVuIHNhbmshXCIpIHdpbm5lciA9IFwiQ29tbWFuZGVyIEEuSS5cIjtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoY29vcmRzKSA9PiB7XG4gICAgaWYgKHdpbm5lcikgcmV0dXJuO1xuICAgIHBsYXllckF0dGFjayhjb29yZHMpO1xuICAgIGlmICh3aW5uZXIpIHJldHVybjtcbiAgICBjb21wQXR0YWNrKCk7XG4gIH07XG5cbiAgY29uc3Qgc2hvd01lc3NhZ2UgPSAoKSA9PiB7XG4gICAgaWYgKCFtZXNzYWdlKSByZXR1cm4gbnVsbDtcbiAgICBpZiAod2lubmVyKSB7XG4gICAgICBpZiAoIWNhbGxXaW5uZXIpIHtcbiAgICAgICAgY2FsbFdpbm5lciA9IHRydWU7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgfVxuICAgICAgbWVzc2FnZSA9IGAke3dpbm5lcn0gaXMgdGhlIHdpbm5lciFgO1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2U7XG4gIH07XG5cbiAgZnVuY3Rpb24gc2V0UGxheWVyU2hpcChjb29yZHMsIGF4aXMpIHtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoY29vcmRzLCBheGlzKTtcbiAgICBtZXNzYWdlID0gcGxheWVyQm9hcmQuYW5ub3VuY2UoKTtcbiAgfVxuXG4gIGNvbXBCb2FyZC5wbGFjZVNoaXBSYW5kb21seSgpO1xuXG4gIHJldHVybiB7IHNldFBsYXllciwgZ2V0R2FtZUJvYXJkLCBhdHRhY2ssIHNob3dNZXNzYWdlLCBzZXRQbGF5ZXJTaGlwIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY29uc3QgcGFyc2VHcmlkQ29vcmRzID0gKGluZGV4KSA9PiB7XG4gIGxldCB4ID0gMDtcbiAgbGV0IHkgPSBpbmRleDtcblxuICBpZiAoaW5kZXggPj0gMTApIHtcbiAgICB4ID0gTWF0aC5mbG9vcihpbmRleCAvIDEwKTtcbiAgICB5ID0gaW5kZXggLSB4ICogMTA7XG4gIH1cbiAgcmV0dXJuIFt4LCB5XTtcbn07XG5cblxuY29uc3QgZ2VuZXJhdGVDb29yZHMgPSAoKSA9PiB7XG4gIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIHJldHVybiBbeCwgeV07XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlR3JpZENvb3JkcztcbmV4cG9ydCB7IGdlbmVyYXRlQ29vcmRzIH1cbiIsIlxuXG5jb25zdCBjcmVhdGVHcmlkID0gKGNvb3JkLCBwbGF5ZXIpID0+IHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBncmlkLmNsYXNzTGlzdC5hZGQoJ2dyaWQnKVxuICBpZiAoY29vcmQuc2hvdCA9PT0gJ21pc3MnKSBncmlkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgaWYgKGNvb3JkLnNob3QgPT09ICdoaXQnKSBncmlkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICBpZiAocGxheWVyKSB7XG4gICAgaWYgKGNvb3JkLnNoaXApIGdyaWQuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICB9XG5cbiAgcmV0dXJuIGdyaWRcbn1cblxuY29uc3QgYXR0YWNoRGl2R3JpZCA9IChodG1sQm9hcmQsIGdhbWVCb2FyZCwgcGxheWVyKSA9PiB7XG4gIGdhbWVCb2FyZC5mb3JFYWNoKHJvdyA9PiB7XG4gICAgcm93LmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgY29uc3QgZ3JpZCA9IGNyZWF0ZUdyaWQoY29vcmQsIHBsYXllcik7XG4gICAgICBodG1sQm9hcmQuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgfSlcbiAgfSlcblxufVxuXG5jb25zdCByZW1vdmVHcmlkID0gKGh0bWxCb2FyZCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGh0bWxCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcbiAgZ3JpZHMuZm9yRWFjaChncmlkID0+IHtcbiAgICBodG1sQm9hcmQucmVtb3ZlQ2hpbGQoZ3JpZCk7XG4gIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGF0dGFjaERpdkdyaWQ7XG5leHBvcnQgeyByZW1vdmVHcmlkICB9IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuXFxuLyogRG9jdW1lbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG59XFxuXFxuLyogU2VjdGlvbnNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLyoqXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxuICovXFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcbiAqL1xcblxcbmhyIHtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnByZSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5jb2RlLFxcbmtiZCxcXG5zYW1wIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07XFxufVxcblxcbnN1cCB7XFxuICB0b3A6IC0wLjVlbTtcXG59XFxuXFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbn1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCxcXG5vcHRncm91cCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCB7XFxuICAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3Qge1xcbiAgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyogY29sb3IgcGFsZXR0ZVxcbiAgICAjOTBhM2I0XFx0KDE0NCwxNjMsMTgwKVxcbiAgICAjNTY3ZDljXFx0KDg2LDEyNSwxNTYpXFxuICAgICMwZjQxNjJcXHQoMTUsNjUsOTgpXFxuICAgICMwOTI3M2FcXHQoOSwzOSw1OClcXG4gICAgIzFjMjY0MVxcdCgyOCwzOCw2NSlcXG4gICAgaHR0cHM6Ly93d3cuY29sb3ItaGV4LmNvbS9jb2xvci1wYWxldHRlLzcwNzcyXFxuXFxuXFxuICAgICM5OWI1YzNcXHQoMTUzLDE4MSwxOTUpXFxuICAgICM0YzdlOTdcXHQoNzYsMTI2LDE1MSlcXG4gICAgIzAwNDg2YlxcdCgwLDcyLDEwNylcXG4gICAgI2ZmZmZmZlxcdCgyNTUsMjU1LDI1NSlcXG4gICAgaHR0cHM6Ly93d3cuY29sb3ItaGV4LmNvbS9jb2xvci1wYWxldHRlLzY5NjEwXFxuKi9cXG5cXG5ib2R5IHtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBtaW4taGVpZ2h0OiA5NDFweDtcXG4gIG1pbi13aWR0aDogNjU3cHg7XFxuICB3aWR0aDogYXV0bztcXG4gIGhlaWdodDogYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogNzBweCAxZnIgNjhweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5OWI1YzM7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbm1haW4ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWluLWhlaWdodDogODAzcHg7XFxuICBtaW4td2lkdGg6IDkwOHB4O1xcbn1cXG5cXG5oZWFkZXIsXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGM3ZTk3O1xcbn1cXG5cXG5oZWFkZXIgaDEge1xcbiAgZm9udC1zaXplOiAyLjZyZW07XFxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xcbiAgY29sb3I6ICM5OWI1YzM7XFxuICB0ZXh0LXNoYWRvdzogNHB4IDFweCBibGFjaztcXG4gIHBhZGRpbmc6IDRweCA4cHg7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuZm9ybSNwbGF5ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtYXJnaW4tdG9wOiA3NnB4O1xcbiAgcm93LWdhcDogMjhweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmZvcm0jcGxheWVyID4gbGFiZWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjZyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cXG5sYWJlbCBpbnB1dCB7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBwYWRkaW5nOiAycHggNnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgaGVpZ2h0OiBtYXgtY29udGVudDtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIHBhZGRpbmc6IDRweCA4cHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbn1cXG5cXG5zZWN0aW9uI3BsYWNlIHtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG59XFxuXFxuc2VjdGlvbiNwbGFjZSBkaXYjcGxCb2FyZCB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgZ2FwOiA0cHg7XFxufVxcblxcbnNlY3Rpb24gZGl2I3BsQm9hcmQsXFxuc2VjdGlvbiBkaXYuYm9hcmQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNHB4O1xcbiAgb3V0bGluZTogMnB4IHNvbGlkIGJsYWNrO1xcbiAgcGFkZGluZzogMnB4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uIHtcXG4gIGhlaWdodDogMzAwcHg7XFxuICB3aWR0aDogMzAwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGFkZGluZy10b3A6IDgwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgMzBweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDMwcHg7XFxuICBnYXA6IDRweDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIgPiBkaXYucmVmZXJlbmNlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiNWI3Yjg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlci5heGlzWSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoYXV0by1maXQsIDMwcHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjY29tbWFuZGVyIHtcXG4gIHdpZHRoOiAxNjhweDtcXG4gIGhlaWdodDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2NvbW1hbmRlci5heGlzWSB7XFxuICBoZWlnaHQ6IDE2OHB4O1xcbiAgd2lkdGg6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNiYXR0bGVzaGlwIHtcXG4gIHdpZHRoOiAxMzRweDtcXG4gIGhlaWdodDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2JhdHRsZXNoaXAuYXhpc1kge1xcbiAgaGVpZ2h0OiAxMzNweDtcXG4gIHdpZHRoOiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjZGVzdHJveWVyLFxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNzdWJtYXJpbmUge1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjZGVzdHJveWVyLmF4aXNZLFxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNzdWJtYXJpbmUuYXhpc1kge1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIHdpZHRoOiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjcGF0cm9sQm9hdCB7XFxuICB3aWR0aDogNjZweDtcXG4gIGhlaWdodDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI3BhdHJvbEJvYXQuYXhpc1kge1xcbiAgaGVpZ2h0OiA2NnB4O1xcbiAgd2lkdGg6IDMzcHg7XFxufVxcblxcbnNlY3Rpb24gZGl2IGRpdi5ncmlkIHtcXG4gIGJvcmRlcjogMDtcXG4gIG91dGxpbmU6IDFweCBzb2xpZCBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxufVxcblxcbnNlY3Rpb24gZGl2IGRpdi5ncmlkLnNoaXAsXFxuZGl2I3NlbGVjdGlvbiBkaXYgZGl2IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkMWQ1ZDY7XFxufVxcblxcbnNlY3Rpb24jZ2FtZSBkaXYgZGl2LmdyaWQuaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjcpO1xcbn1cXG5cXG5zZWN0aW9uI2dhbWUgZGl2IGRpdi5ncmlkLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAyNTUsIDAuNyk7XFxufVxcblxcbnNlY3Rpb24jZ2FtZSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA0NjBweDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLyogc2VjdGlvbiNnYW1lIFxcbmgyI25vdGljZSB7XFxuICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDE3MywgMjU1LCAxNzMpO1xcbiAgd2lkdGg6IDUwMHB4O1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMiwgNTgsIDIyKTtcXG4gIGNvbG9yOiByZ2IoMjQxLCAyMjUsIDEzNCk7XFxuICBmb250LWZhbWlseTogJ0NvdXJpZXIgTmV3JywgQ291cmllciwgbW9ub3NwYWNlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XFxufSAqL1xcblxcbnNlY3Rpb24jZ2FtZSBkaXYuYm9hcmQge1xcbiAgbWFyZ2luLXRvcDogMTQwcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjhweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMjhweCk7XFxufVxcblxcbnNlY3Rpb24jbm90aWNlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTQsIDI1NCwgMC4zKTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMzBweDtcXG59XFxuXFxuc2VjdGlvbi5oaWRkZW4ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbmZvb3RlciBhOmhvdmVyIHtcXG4gIGZpbHRlcjogZHJvcC1zaGFkb3coMCAwIDJweCB3aGl0ZSk7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsMkVBQTJFOztBQUUzRTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjtFQUNFLGlCQUFpQixFQUFFLE1BQU07RUFDekIsOEJBQThCLEVBQUUsTUFBTTtBQUN4Qzs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsU0FBUztBQUNYOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsdUJBQXVCLEVBQUUsTUFBTTtFQUMvQixTQUFT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QWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTs7RUFFRSxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBOztFQUVFLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFNBQVM7RUFDVCx3QkFBd0I7RUFDeEIsc0JBQXNCO0FBQ3hCOztBQUVBOztFQUVFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIseUJBQXlCO0VBQ3pCLHFCQUFxQjtBQUN2Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7O0FBRUg7RUFDRSxpQkFBaUI7RUFDakIsdUNBQXVDO0VBQ3ZDLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLDBDQUEwQztFQUMxQyx1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtDQUFrQztBQUNwQ1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuXFxuLyogRG9jdW1lbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG59XFxuXFxuLyogU2VjdGlvbnNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLyoqXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxuICovXFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcbiAqL1xcblxcbmhyIHtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnByZSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5jb2RlLFxcbmtiZCxcXG5zYW1wIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07XFxufVxcblxcbnN1cCB7XFxuICB0b3A6IC0wLjVlbTtcXG59XFxuXFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbn1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCxcXG5vcHRncm91cCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCB7XFxuICAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3Qge1xcbiAgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyogY29sb3IgcGFsZXR0ZVxcbiAgICAjOTBhM2I0XFx0KDE0NCwxNjMsMTgwKVxcbiAgICAjNTY3ZDljXFx0KDg2LDEyNSwxNTYpXFxuICAgICMwZjQxNjJcXHQoMTUsNjUsOTgpXFxuICAgICMwOTI3M2FcXHQoOSwzOSw1OClcXG4gICAgIzFjMjY0MVxcdCgyOCwzOCw2NSlcXG4gICAgaHR0cHM6Ly93d3cuY29sb3ItaGV4LmNvbS9jb2xvci1wYWxldHRlLzcwNzcyXFxuXFxuXFxuICAgICM5OWI1YzNcXHQoMTUzLDE4MSwxOTUpXFxuICAgICM0YzdlOTdcXHQoNzYsMTI2LDE1MSlcXG4gICAgIzAwNDg2YlxcdCgwLDcyLDEwNylcXG4gICAgI2ZmZmZmZlxcdCgyNTUsMjU1LDI1NSlcXG4gICAgaHR0cHM6Ly93d3cuY29sb3ItaGV4LmNvbS9jb2xvci1wYWxldHRlLzY5NjEwXFxuKi9cXG5cXG5ib2R5IHtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBtaW4taGVpZ2h0OiA5NDFweDtcXG4gIG1pbi13aWR0aDogNjU3cHg7XFxuICB3aWR0aDogYXV0bztcXG4gIGhlaWdodDogYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogNzBweCAxZnIgNjhweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5OWI1YzM7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbm1haW4ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWluLWhlaWdodDogODAzcHg7XFxuICBtaW4td2lkdGg6IDkwOHB4O1xcbn1cXG5cXG5oZWFkZXIsXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGM3ZTk3O1xcbn1cXG5cXG5oZWFkZXIgaDEge1xcbiAgZm9udC1zaXplOiAyLjZyZW07XFxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xcbiAgY29sb3I6ICM5OWI1YzM7XFxuICB0ZXh0LXNoYWRvdzogNHB4IDFweCBibGFjaztcXG4gIHBhZGRpbmc6IDRweCA4cHg7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuZm9ybSNwbGF5ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtYXJnaW4tdG9wOiA3NnB4O1xcbiAgcm93LWdhcDogMjhweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmZvcm0jcGxheWVyID4gbGFiZWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjZyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cXG5sYWJlbCBpbnB1dCB7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBwYWRkaW5nOiAycHggNnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgaGVpZ2h0OiBtYXgtY29udGVudDtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIHBhZGRpbmc6IDRweCA4cHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbn1cXG5cXG5zZWN0aW9uI3BsYWNlIHtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG59XFxuXFxuc2VjdGlvbiNwbGFjZSBkaXYjcGxCb2FyZCB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgZ2FwOiA0cHg7XFxufVxcblxcbnNlY3Rpb24gZGl2I3BsQm9hcmQsXFxuc2VjdGlvbiBkaXYuYm9hcmQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNHB4O1xcbiAgb3V0bGluZTogMnB4IHNvbGlkIGJsYWNrO1xcbiAgcGFkZGluZzogMnB4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uIHtcXG4gIGhlaWdodDogMzAwcHg7XFxuICB3aWR0aDogMzAwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGFkZGluZy10b3A6IDgwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgMzBweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDMwcHg7XFxuICBnYXA6IDRweDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIgPiBkaXYucmVmZXJlbmNlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiNWI3Yjg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlci5heGlzWSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoYXV0by1maXQsIDMwcHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjY29tbWFuZGVyIHtcXG4gIHdpZHRoOiAxNjhweDtcXG4gIGhlaWdodDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2NvbW1hbmRlci5heGlzWSB7XFxuICBoZWlnaHQ6IDE2OHB4O1xcbiAgd2lkdGg6IDMzcHg7XFxufVxcblxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNiYXR0bGVzaGlwIHtcXG4gIHdpZHRoOiAxMzRweDtcXG4gIGhlaWdodDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI2JhdHRsZXNoaXAuYXhpc1kge1xcbiAgaGVpZ2h0OiAxMzNweDtcXG4gIHdpZHRoOiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjZGVzdHJveWVyLFxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNzdWJtYXJpbmUge1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjZGVzdHJveWVyLmF4aXNZLFxcbmRpdiNzZWxlY3Rpb24gPiBkaXYuc2hpcEhvbGRlciNzdWJtYXJpbmUuYXhpc1kge1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIHdpZHRoOiAzM3B4O1xcbn1cXG5cXG5kaXYjc2VsZWN0aW9uID4gZGl2LnNoaXBIb2xkZXIjcGF0cm9sQm9hdCB7XFxuICB3aWR0aDogNjZweDtcXG4gIGhlaWdodDogMzNweDtcXG59XFxuXFxuZGl2I3NlbGVjdGlvbiA+IGRpdi5zaGlwSG9sZGVyI3BhdHJvbEJvYXQuYXhpc1kge1xcbiAgaGVpZ2h0OiA2NnB4O1xcbiAgd2lkdGg6IDMzcHg7XFxufVxcblxcbnNlY3Rpb24gZGl2IGRpdi5ncmlkIHtcXG4gIGJvcmRlcjogMDtcXG4gIG91dGxpbmU6IDFweCBzb2xpZCBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxufVxcblxcbnNlY3Rpb24gZGl2IGRpdi5ncmlkLnNoaXAsXFxuZGl2I3NlbGVjdGlvbiBkaXYgZGl2IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkMWQ1ZDY7XFxufVxcblxcbnNlY3Rpb24jZ2FtZSBkaXYgZGl2LmdyaWQuaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjcpO1xcbn1cXG5cXG5zZWN0aW9uI2dhbWUgZGl2IGRpdi5ncmlkLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAyNTUsIDAuNyk7XFxufVxcblxcbnNlY3Rpb24jZ2FtZSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA0NjBweDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLyogc2VjdGlvbiNnYW1lIFxcbmgyI25vdGljZSB7XFxuICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDE3MywgMjU1LCAxNzMpO1xcbiAgd2lkdGg6IDUwMHB4O1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMiwgNTgsIDIyKTtcXG4gIGNvbG9yOiByZ2IoMjQxLCAyMjUsIDEzNCk7XFxuICBmb250LWZhbWlseTogJ0NvdXJpZXIgTmV3JywgQ291cmllciwgbW9ub3NwYWNlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XFxufSAqL1xcblxcbnNlY3Rpb24jZ2FtZSBkaXYuYm9hcmQge1xcbiAgbWFyZ2luLXRvcDogMTQwcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjhweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMjhweCk7XFxufVxcblxcbnNlY3Rpb24jbm90aWNlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTQsIDI1NCwgMC4zKTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMzBweDtcXG59XFxuXFxuc2VjdGlvbi5oaWRkZW4ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbmZvb3RlciBhOmhvdmVyIHtcXG4gIGZpbHRlcjogZHJvcC1zaGFkb3coMCAwIDJweCB3aGl0ZSk7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvR2l0SHViLU1hcmstTGlnaHQtMzJweC5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbi8vIE1vZHVsZVxudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzBfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8wX19fKTtcbnZhciBjb2RlID0gXCI8IURPQ1RZUEUgaHRtbD5cXG48aHRtbCBsYW5nPVxcXCJlblxcXCI+XFxuICA8aGVhZD5cXG4gICAgPG1ldGEgY2hhcnNldD1cXFwiVVRGLThcXFwiIC8+XFxuICAgIDxtZXRhIGh0dHAtZXF1aXY9XFxcIlgtVUEtQ29tcGF0aWJsZVxcXCIgY29udGVudD1cXFwiSUU9ZWRnZVxcXCIgLz5cXG4gICAgPG1ldGEgbmFtZT1cXFwidmlld3BvcnRcXFwiIGNvbnRlbnQ9XFxcIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcXFwiIC8+XFxuICAgIDx0aXRsZT5CYXR0bGVzaGlwPC90aXRsZT5cXG4gIDwvaGVhZD5cXG4gIDxib2R5PlxcbiAgICA8aGVhZGVyPlxcbiAgICAgIDxoMT5CYXR0bGVzaGlwPC9oMT5cXG4gICAgPC9oZWFkZXI+XFxuICAgIDxtYWluPlxcbiAgICAgIDxzZWN0aW9uIGlkPVxcXCJzdGFydFxcXCI+XFxuICAgICAgICA8Zm9ybSBhY3Rpb249XFxcIlxcXCIgbWV0aG9kPVxcXCJnZXRcXFwiIGlkPVxcXCJwbGF5ZXJcXFwiPlxcbiAgICAgICAgICA8bGFiZWwgZm9yPVxcXCJwTmFtZVxcXCI+XFxuICAgICAgICAgICAgPHA+RW50ZXIgUGxheWVyIE5hbWU6PC9wPlxcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCJuYW1lXFxcIiBpZD1cXFwicE5hbWVcXFwiIHJlcXVpcmVkIC8+XFxuICAgICAgICAgIDwvbGFiZWw+XFxuICAgICAgICAgIDxidXR0b24+U3RhcnQgR2FtZSE8L2J1dHRvbj5cXG4gICAgICAgIDwvZm9ybT5cXG4gICAgICA8L3NlY3Rpb24+XFxuICAgICAgPHNlY3Rpb24gaWQ9XFxcInBsYWNlXFxcIiBjbGFzcz1cXFwiaGlkZGVuXFxcIj5cXG4gICAgICAgIDxoMiBjbGFzcz1cXFwibm90aWNlXFxcIj5TZXQgeW91ciBTaGlwczwvaDI+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCJheGlzXFxcIj5Ib3Jpem9udGFsPC9idXR0b24+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJwbEJvYXJkXFxcIj48L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcInNlbGVjdGlvblxcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXBIb2xkZXJcXFwiIGlkPVxcXCJjb21tYW5kZXJcXFwiIGRyYWdnYWJsZT1cXFwidHJ1ZVxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwIHJlZmVyZW5jZVxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXBcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXBIb2xkZXJcXFwiIGlkPVxcXCJiYXR0bGVzaGlwXFxcIiBkcmFnZ2FibGU9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcCByZWZlcmVuY2VcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXBcXFwiPjwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2hpcEhvbGRlclxcXCIgaWQ9XFxcImRlc3Ryb3llclxcXCIgZHJhZ2dhYmxlPVxcXCJ0cnVlXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXAgcmVmZXJlbmNlXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJncmlkIHNoaXBcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzaGlwSG9sZGVyXFxcIiBpZD1cXFwic3VibWFyaW5lXFxcIiBkcmFnZ2FibGU9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcCByZWZlcmVuY2VcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ3JpZCBzaGlwXFxcIj48L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXBIb2xkZXJcXFwiIGlkPVxcXCJwYXRyb2xCb2F0XFxcIiBkcmFnZ2FibGU9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcCByZWZlcmVuY2VcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdyaWQgc2hpcFxcXCI+PC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJiYXR0bGVcXFwiPlN0YXJ0IGJhdHRsZSE8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvc2VjdGlvbj5cXG4gICAgICA8c2VjdGlvbiBpZD1cXFwiZ2FtZVxcXCIgY2xhc3M9XFxcImhpZGRlblxcXCI+XFxuICAgICAgICA8IS0tIDxoMiBpZD1cXFwibm90aWNlXFxcIj5UZXN0IHRyYW5zbWlzc2lvbi4uLjwvaDI+IC0tPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiZ2FtZVBsQm9hcmRcXFwiIGNsYXNzPVxcXCJib2FyZFxcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJnYW1lQ29tcEJvYXJkXFxcIiBjbGFzcz1cXFwiYm9hcmRcXFwiPjwvZGl2PlxcbiAgICAgIDwvc2VjdGlvbj5cXG4gICAgPC9tYWluPlxcbiAgICA8c2VjdGlvbiBpZD1cXFwibm90aWNlXFxcIiBjbGFzcz1cXFwiaGlkZGVuXFxcIj5cXG4gICAgICA8aDIgaWQ9XFxcImFubm91bmNlXFxcIj5UaGUgd2lubmVyIGlzIFBsYXllcjwvaDI+XFxuICAgICAgPGJ1dHRvbiBpZD1cXFwicmVzdGFydFxcXCI+UmVzdGFydDwvYnV0dG9uPlxcbiAgICA8L3NlY3Rpb24+XFxuICAgIDxmb290ZXI+XFxuICAgICAgPGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL1JoYXp6WElYXFxcIj5cXG4gICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzBfX18gKyBcIlxcXCIgYWx0PVxcXCJHaXRIdWJcXFwiIC8+XFxuICAgICAgPC9hPlxcbiAgICA8L2Zvb3Rlcj5cXG4gIDwvYm9keT5cXG48L2h0bWw+XFxuXCI7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZSwgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLm1heWJlTmVlZFF1b3RlcyAmJiAvW1xcdFxcblxcZlxcciBcIic9PD5gXS8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwsIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIi4vaW5kZXguaHRtbFwiO1xuaW1wb3J0IGNvbnRyb2xET00gZnJvbSBcIi4vbW9kdWxlcy9ET01jb250cm9sXCI7Il0sIm5hbWVzIjpbImRlZmF1bHQiLCJhdHRhY2hEaXZHcmlkIiwicmVtb3ZlR3JpZCIsIkdhbWUiLCJwYXJzZUdyaWRDb29yZHMiLCJjb250cm9sRE9NIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm1haW4iLCJzdGFydFNlY3Rpb24iLCJwbGF5ZXJGb3JtIiwicGxheWVySW5wdXQiLCJzdGFydEJ0biIsInBsYWNlU2hpcFNlY3Rpb24iLCJheGlzQnRuIiwicGxhY2VTaGlwQm9hcmQiLCJzaGlwU2VsZWN0aW9uIiwiZG9tQ29tbWFuZGVyIiwiZG9tQmF0dGxlc2hpcCIsImRvbURlc3Ryb3llciIsImRvbVN1Ym1hcmluZSIsImRvbVBhdHJvbEJvYXQiLCJiYXR0bGVCdG4iLCJnYW1lU2VjdGlvbiIsImdhbWVQbEJvYXJkIiwiZ2FtZUNvbXBCb2FyZCIsIm5vdGljZVNlY3Rpb24iLCJ3aW5uZXJOb3RpY2UiLCJyZXN0YXJ0QnRuIiwicmVtb3ZlQ2hpbGQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJnYW1lIiwiZ2V0Qm9hcmRzIiwiYXhpcyIsImdhbWVGaW5pc2hlZCIsInVwZGF0ZUFwcEJvYXJkIiwiZ2V0R2FtZUJvYXJkIiwiY2hhbmdlQXhpcyIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ0ZXh0Q29udGVudCIsInRvZ2dsZSIsInVwZGF0ZURPTUJvYXJkIiwicGxheWVyQm9hcmQiLCJjb21wQm9hcmQiLCJwbGF5ZXIiLCJjb21wIiwiYW5ub3VuY2VXaW5uZXIiLCJhcHBlbmRDaGlsZCIsInNob3dNZXNzYWdlIiwiZ3JpZENsaWNrRXZlbnQiLCJpbmRleCIsImNvb3JkIiwiYXR0YWNrIiwic2V0VGltZW91dCIsImFkZEdyaWRDbGlja0V2ZW50IiwiY29tcEdyaWRzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJncmlkIiwiaiIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b2dnbGVTaGlwU2VsZWN0aW9uIiwiY29udGFpbnMiLCJzZXRTaGlwRXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNvb3JkcyIsInNldFBsYXllclNoaXAiLCJzZXREcmFnTkRyb3BFdmVudHMiLCJwbEJvYXJkIiwicGxHcmlkcyIsImV2ZW50IiwiYmluZCIsImxvYWRHYW1lIiwic2V0UGxheWVyIiwidmFsdWUiLCJzdGFydEJhdHRsZSIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2VuZXJhdGVDb29yZHMiLCJjb21tYW5kZXJBSSIsImF0dGFja0Nvb3Jkc0VudGVyZWQiLCJjb29yZHNUb0ZvY3VzIiwiYWRqYWNlbnRDb29yZHMiLCJpbmxpbmVDb29yZHMiLCJ0dXJuIiwiY2hlY2tDb29yZGluYXRlcyIsImVudGVyZWQiLCJ4IiwieSIsImNvb3Jkc0NvcHkiLCJlbnRyeSIsInB1c2giLCJpIiwiYXJyIiwiYSIsImIiLCJzcGxpY2UiLCJnZXRBZGphY2VudENvb3JkcyIsImxlbmd0aCIsInBvcCIsImdldElubGluZUNvb3JkcyIsImVudGVyQ29vcmRzIiwiZW5lbXlCb2FyZCIsInBsYXllclR1cm4iLCJzaG93VHVybiIsInN0YXJ0VHVybiIsImdlbmVyYXRlQWRqYWNlbnRDb29yZHMiLCJnZW5lcmF0ZUlubGluZUNvb3JkcyIsImdldEZlZWRiYWNrIiwiZmVlZGJhY2siLCJTaGlwIiwiR2FtZUJvYXJkIiwiZ2FtZUJvYXJkIiwiY29tbWFuZGVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJwbGFjZWRTaGlwIiwiYW5ub3VuY2VtZW50Iiwicm93Iiwic2hvdCIsInNob3dHYW1lQm9hcmQiLCJkaXNwbGF5ZWRHYW1lYm9hcmQiLCJkaXNwbGF5ZWRSb3ciLCJkaXBsYXllZEdyaWQiLCJzcGF3bkNvb3JkcyIsIl9yZWYiLCJzaGlwTGVuZ3RoIiwieEF4aXMiLCJ5QXhpcyIsImNvb3JkaW5hdGVzIiwibmV4dENvb3JkcyIsImdldFNoaXBJbk9yZGVyIiwic2hpcCIsImNoZWNrQ29vcmRzIiwiZ3JpZE9rIiwicGxhY2VTaGlwIiwiYXBwcm9wcmlhdGVTaGlwIiwiZ2V0TGVuZ3RoIiwiY29vcmRzT0siLCJnZXROYW1lIiwiYXR0YWNrU2hpcCIsInNoaXBOYW1lIiwiaGl0IiwicmVwb3J0QXR0YWNrQ29uZGl0aW9uIiwidmVzc2VsIiwiZmluZCIsImlzU3VuayIsImZpbmRJbmRleCIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tSZWNlaXZlZCIsImFubm91bmNlIiwicGxhY2VTaGlwUmFuZG9tbHkiLCJyZWZlcmVuY2VOdW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21BeGlzIiwiUGxheWVyIiwibmFtZSIsInBsYXllck5hbWUiLCJzaG93TmFtZSIsImF0dGFja0JvYXJkIiwiYm9hcmQiLCJlbmVteVR1cm4iLCJub3RPSyIsImhpdFJlY2VpdmVkIiwibWVzc2FnZSIsIndpbm5lciIsImNhbGxXaW5uZXIiLCJ1bmRlZmluZWQiLCJnYW1lQm9hcmRzIiwicGxheWVyQXR0YWNrIiwiY29tcEF0dGFjayIsImNyZWF0ZUdyaWQiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwiaHRtbEJvYXJkIiwiZ3JpZHMiXSwic291cmNlUm9vdCI6IiJ9