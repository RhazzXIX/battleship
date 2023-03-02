const controlDOM = (() => {
  const main = document.querySelector("main");
  const startSection = main.querySelector("section#start");
  const playerForm = startSection.querySelector("form#player");
  const startBtn = startSection.querySelector("button");
  const placeShipSection = main.querySelector("section#place");
  const btn = placeShipSection.querySelector("button");

  const removeForm = () => {
    main.removeChild(startSection);
  };

  btn.addEventListener("click", () => {
    main.appendChild(startSection);
  });

  startBtn.addEventListener("click", removeForm);
  main.removeChild(startSection);
  main.removeChild(placeShipSection);
})();

export default controlDOM;
