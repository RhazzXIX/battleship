const Ship = (length) => {
  const shipLength = length
  let hitReceived = 0
  const hit = function () {
    if (hitReceived === this.length) return
    hitReceived +=1
  }
  const isSunk = () => {
    if (hitReceived === shipLength) return true
    return false
  }
  const getLength = () => shipLength

  return {hit, isSunk, getLength}
}



export default Ship;