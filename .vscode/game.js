const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const result = document.querySelector('#result');

//VARIABLES
let canvasSize;
let elementsSize;

let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

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
    canvasSize = window.innerWidth * 0.6;
  } else {
    canvasSize = window.innerHeight * 0.6;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementsSize = canvasSize / 10 - 1;
  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize - 5 + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 300);
    showRecord();
  }

  const mapRows = map.trim().split('\n'); //maps[0]= clean spaces with .trim and create new one with start and end of each element when there is a line break
  const mapRowCols = mapRows.map((row) => row.trim().split('')); //columnas de cada fila de nuestro mapa

  showLives();

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

  const wallCollision = wallPositions.find((wall) => {
    const wallCollosionX = wall.x / elementsSize === playerPosition.x;
    const wallCollionsY = wall.y / elementsSize === playerPosition.y;
    return wallCollosionX && wallCollionsY;
  });

  // if (wallCollision) {
  //   levelFail();
  // }

  // game.fillText(
  //   emojis['PLAYER'],
  //   playerPosition.x * elementsSize,
  //   playerPosition.y * elementsSize
  // );
  if (brainCollision) {
    levelWin();
  } else if (wallCollision) {
    game.fillText(
      emojis['BOMB_COLLISION'],
      playerPosition.x * elementsSize,
      playerPosition.y * elementsSize
    );
    setTimeout(() => {
      levelFail();
    }, 100);
  } else {
    game.fillText(
      emojis['PLAYER'],
      playerPosition.x * elementsSize,
      playerPosition.y * elementsSize
    );
  }
}

function levelWin() {
  console.log('Subiste de nivel');
  level++;
  startGame();
}

function levelFail() {
  console.log('fallaste');
  lives--;

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  console.log('Terminaste');
  clearInterval(timeInterval);
  //RECORD
  const recordTime = localStorage.getItem('record_time');
  const playerTime = (Date.now() - timeStart) / 1000;
  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      result.innerHTML = '¡SUPERASTE EL RECORD!';
    } else {
      result.innerHTML = 'No superaste el record ☠️';
    }
  } else {
    localStorage.setItem('record_time', playerTime);
    result.innerHTML = '¡TERMINASTE!¿ERES CAPAZ DE SUPERAR TU TIEMPO?';
  }
  console.log({ recordTime, playerTime });
}
function showLives() {
  const heartsArray = Array(lives).fill(emojis['HEART']);
  spanLives.innerHTML = '';
  heartsArray.forEach((heart) => spanLives.append(heart));
}
function showTime() {
  spanTime.innerHTML = ((Date.now() - timeStart) / 1000).toFixed(1);
}
function showRecord() {
  spanRecord.innerHTML = localStorage.getItem('record_time');
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
