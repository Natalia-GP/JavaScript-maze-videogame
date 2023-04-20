const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

//VARIABLES
let canvasSize;
let elementsSize;

//EVENTS
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

//FUNCTIONS

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  elementsSize = canvasSize / 10;
  startGame();
}
function startGame() {
  console.log({ elementsSize, canvasSize });

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  for (let i = 1; i <= 10; i++) {
    game.fillText(emojis['X'], elementsSize, elementsSize * i);
  }
}
