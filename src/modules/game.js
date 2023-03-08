import GameBoard from "./factories/gameBoard";
import commanderAI from "./factories/ai";
import Player from "./factories/player";

const Game = () => {
  let player;
  const comp = commanderAI();
  const playerBoard = GameBoard();
  const compBoard = GameBoard();
  let message;
  let winner;
  let callWinner = false;

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
    if (compBoard.announce() === "All ships has been sank!")
      winner = player.showName();
  };

  const compAttack = () => {
    if (comp.showTurn() === false) return;
    comp.enterCoords(playerBoard.receiveAttack, player.startTurn);
    message = playerBoard.announce();
    if (playerBoard.announce() === "All ships has been sank!")
      winner = "Commander A.I.";
  };

  const attack = (coords) => {
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

  return { setPlayer, getGameBoard, attack, showMessage, setPlayerShip };
};

export default Game;
