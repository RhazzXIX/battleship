
const controlDOM = (() => {
  const main = document.querySelector('main');
  const startSection = main.querySelector('section#start');
  const playerForm = startSection.querySelector('form#player');
  const startBtn = startSection.querySelector('button');
  const placeSection = main.querySelector('section#place');
  const btn = placeSection.querySelector('button');

  const removeForm = () => {
    main.removeChild(startSection);
  }

  btn.addEventListener('click', () => {
    main.appendChild(startSection);
  })

  startBtn.addEventListener('click', removeForm)
  main.removeChild(startSection);
}) () 

export default controlDOM