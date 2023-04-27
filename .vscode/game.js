const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

//VARIABLES
let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};
//EVENTS
//set size of canvas
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

//FUNCTIONS

// canvas rendering
function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 1;
  } else {
    canvasSize = window.innerHeight * 1;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementsSize = canvasSize / 10 - 1;
  startGame();
}

function startGame() {
  // console.log({ canvasSize, elementsSize });

  game.font = elementsSize - 7 + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[0];
  const mapRows = map.trim().split('\n'); //maps[0]= clean spaces with .trim and create new one with start and end of each element when there is a line break
  const mapRowCols = mapRows.map((row) => row.trim().split('')); //columnas de cada fila de nuestro mapa
  // console.log(map, mapRows, mapRowCols);

  game.clearRect(0, 0, canvasSize, canvasSize);

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);
      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          //si ninguno de estos elementos tiene algo dentro
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ playerPosition });
        }
      }
      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
}

function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
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
  if (playerPosition.y - elementsSize < elementsSize) {
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
}
function moveLeft() {
  console.log('izquierda');
  if (playerPosition.x - elementsSize < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveRight() {
  console.log('derecha');
  if (playerPosition.x + elementsSize > canvasSize) {
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveDown() {
  console.log('abajo');
  if (playerPosition.y + elementsSize > canvasSize) {
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}
