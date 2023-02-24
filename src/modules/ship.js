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

  return { hit, isSunk, getLength, getName };
};

export default Ship;
