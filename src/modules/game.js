import GameBoard from "./factories/gameBoard";
import commanderAI from "./factories/ai";
import Player from "./factories/player";

const Game = () => {
  let player;
  const comp = commanderAI();
  const playerBoard = GameBoard();
  const compBoard = GameBoard();
  let message;

  const gameboards = {
    player: playerBoard.showGameBoard(),
    comp: compBoard.showGameBoard(),
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

  const setPlayer = (name) => {
    if (player !== undefined) return;
    player = Player(name);
  };

  const getGameBoard = () => {
    const gameBoards = {
      player: playerBoard.showGameBoard(),
      comp: compBoard.showGameBoard(),
    };
    return gameBoards;
  };

  const playerAttack = (coords) => {
    if (player.showTurn() === false) return;
    player.attackBoard(coords, compBoard.receiveAttack, comp.startTurn);
    message = compBoard.announce();
  };

  const compAttack = () => {
    if (comp.showTurn() === false) return;
    comp.enterCoords(playerBoard.receiveAttack, player.startTurn);
    message = playerBoard.announce();
  };

  const attack = (coords) => {
    playerAttack(coords);
    compAttack();
  };

  // const showMessage = () => {
  //   if (!message) return null
  //   return message;
  // }

  return { setPlayer, getGameBoard, attack };
};

export default Game;
