const Player = (name) => {
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

  return { showName, showTurn, attackBoard, startTurn };
};

export default Player;
