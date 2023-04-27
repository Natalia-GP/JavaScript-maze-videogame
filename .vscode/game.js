const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

//VARIABLES
let canvasSize;
let elementsSize;

//EVENTS
//set size of canvas
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

//FUNCTIONS

// canvas rendering
function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.83;
  } else {
    canvasSize = window.innerHeight * 0.83;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementsSize = canvasSize / 10 - 3;
  startGame();
}

function startGame() {
  // console.log({ canvasSize, elementsSize });

  game.font = elementsSize - 10 + 'px Verdana';
  game.textAlign = 'end';
  game.alignItems = 'flex-end';

  const map = maps[0];

  const mapRows = map.trim().split('\n'); //maps[0]= clean spaces with .trim and create new one with start and end of each element when there is a line break
  const mapRowCols = mapRows.map((row) => row.trim().split('')); //columnas de cada fila de nuestro mapa

  console.log(map, mapRows, mapRowCols);

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);
      game.fillText(emoji, posX, posY);
    });
  });

  // for (let row = 1; row <= 10; row++) {
  //   //eje X
  //   for (let col = 1; col <= 10; col++) {
  //     //eje Y
  //     game.fillText(
  //       emojis[mapRowCols[row - 1][col - 1]],
  //       elementsSize * col,
  //       elementsSize * row
  //     );
  //   }
  // }
}
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnRight.addEventListener('click', moveRight);
btnLeft.addEventListener('click', moveLeft);

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}
function moveUp() {
  console.log('arriba');
}
function moveDown() {
  console.log('abajo');
}
function moveRight() {
  console.log('derecha');
}
function moveLeft() {
  console.log('izquierda');
}
