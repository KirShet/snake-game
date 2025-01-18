const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');

// Функции для движения игрока
function movePlayerLeft() {
  if ((player.X - 1) >= 0 && getField(player.X - 1, player.Y) !== '▉') {
    player.X -= 1;
  }
}

function movePlayerRight() {
  if ((player.X + 1) <= columnsSize - 1 && getField(player.X + 1, player.Y) !== '▉') {
    player.X += 1;
  }
}

function movePlayerUp() {
  if ((player.Y - 1) >= 0 && getField(player.X, player.Y - 1) !== '▉') {
    player.Y -= 1;
  }
}

function movePlayerDown() {
  if ((player.Y + 1) <= rowsSize - 1 && getField(player.X, player.Y + 1) !== '▉') {
    player.Y += 1;
  }
}

// Привязываем события на кнопки
upButton.addEventListener('click', movePlayerUp);
downButton.addEventListener('click', movePlayerDown);
leftButton.addEventListener('click', movePlayerLeft);
rightButton.addEventListener('click', movePlayerRight);

// Перерисовываем карту
function loop() {
  lp = requestAnimationFrame(loop);

  // рисуем рамку и готовимся к отрисовке лабиринта
  init();
  // рисуем лабиринт
  drawMap();
  // делаем вход и выход из лабиринта
  drawExit();
  // рисуем игрока
  drawPlayer();
  // проверяем, дошёл ли игрок до выхода
  if ((player.X == columnsSize - 1 - ((columnsSize + 1) % 2)) && (player.Y == rowsSize - 1 -((rowsSize + 1) % 2)) ) {
        // останавливаем анимацию
        cancelAnimationFrame(lp);
        // вставляем стили в HTML-файл для запуска фейерверка
    	var js1 = document.createElement('link'); 
    	js1.href = "https://mihailmaximov.ru/projects/maze/style.css"; 
    	js1.rel = "stylesheet";
    	document.head.appendChild(js1);
	}
}

// запускаем игру
lp = requestAnimationFrame(loop);