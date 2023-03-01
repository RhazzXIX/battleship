
const Player = (name) => {
  const playerName = name;

  const showName = () => playerName;

  return { showName }
}

export default Player