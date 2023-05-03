const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

//VARIABLES
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const brainPosition = {
  x: undefined,
  y: undefined,
};
let wallPositions = [];

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
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize - 7 + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }
  const mapRows = map.trim().split('\n'); //maps[0]= clean spaces with .trim and create new one with start and end of each element when there is a line break
  const mapRowCols = mapRows.map((row) => row.trim().split('')); //columnas de cada fila de nuestro mapa
  console.log(map, mapRows, mapRowCols);

  wallPositions = []; //CLEAN
  game.clearRect(0, 0, canvasSize, canvasSize); //clean

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == 'O' && !playerPosition.x && !playerPosition.y) {
        //player position
        playerPosition.x = posX / elementsSize;
        playerPosition.y = posY / elementsSize;
        console.log({ playerPosition });
      } else if (col == 'I') {
        //brain position
        brainPosition.x = posX;
        brainPosition.y = posY;
      } else if (col == 'X') {
        wallPositions.push({
          x: posX,
          y: posY,
        });
      }
      game.fillText(emoji, posX, posY);
    });
    console.log(wallPositions);
  });
  movePlayer();
}

function movePlayer() {
  const brainCollisionX = playerPosition.x === brainPosition.x / elementsSize;
  const brainCollisionY = playerPosition.y === brainPosition.y / elementsSize;
  const brainCollision = brainCollisionX && brainCollisionY;

  if (brainCollision) {
    console.log('subiste');
  }

  const wallCollision = wallPositions.find((wall) => {
    const wallCollosionX = wall.x / elementsSize === playerPosition.x;
    const wallCollionsY = wall.y / elementsSize === playerPosition.y;
    return wallCollosionX && wallCollionsY;
  });

  if (wallCollision) {
    levelFail();
  }

  game.fillText(
    emojis['PLAYER'],
    playerPosition.x * elementsSize,
    playerPosition.y * elementsSize
  );
  if (brainCollision) {
    levelWin();
  }
}

function levelWin() {
  console.log('Subiste de nivel');
  level++;
  startGame();
}

function levelFail() {
  console.log('fallaste');
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  console.log('Terminaste');
}
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnRight.addEventListener('click', moveRight);
btnLeft.addEventListener('click', moveLeft);

//MOVE PLAYER

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
  console.log('Arriba');
  if (playerPosition.y > 1) {
    playerPosition.y -= 1;
  }
  startGame();
}
function moveLeft() {
  console.log('Izquierda');
  if (playerPosition.x > 1) {
    playerPosition.x -= 1;
  }
  startGame();
}
function moveRight() {
  console.log('Derecha');
  if (playerPosition.x < 10) {
    playerPosition.x += 1;
  }
  startGame();
}
function moveDown() {
  console.log('Abajo');
  if (playerPosition.y < 10) {
    playerPosition.y += 1;
  }
  startGame();
}
