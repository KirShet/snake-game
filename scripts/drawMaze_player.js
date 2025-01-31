// количество колонок в лабиринте
const columnsSize = 35;
// количество строк в лабиринте
const rowsSize = 35;
// размер клетки в лабиринте
const fieldSize = 7;
 // рамка (внешняя граница лабиринта)
const padding = 20;

// стартовые координаты игрока
var player = {};
player.X = 0;
player.Y = 0;


// находим холст на странице по имени элемента
const canvas = document.querySelector('canvas');
// создаём переменную, через которую будем работать с холстом
const context = canvas.getContext('2d');

// количество тракторов
const tractorsNumber = 50;
// создаём новую карту лабиринта, которую будем отрисовывать
const map = generateMaze(columnsSize, rowsSize, tractorsNumber);

// переменные сдвига
var shiftX = 0;
var shiftY = 0;

// рисуем рамку и готовимся к отрисовке лабиринта
function init () {
	// устанавливаем размеры холста
	canvas.width = padding * 2 + columnsSize * fieldSize;
	canvas.height = padding * 2 + rowsSize * fieldSize;

	// цвет заливки
	context.fillStyle = 'black';
	// рисуем прямоугольник на весь холст с координатами левого верхнего и правого нижнего углов
	context.rect(0, 0, canvas.width, canvas.height);
	// закрашиваем его выбранным цветом
	context.fill();

	// делаем белое поле внутри рамки, чтобы потом нарисовать на нём стены
	context.fillStyle = 'white';
	// сообщаем скрипту, что сейчас будем рисовать новую фигуру
	context.beginPath();
	// рисуем прямоугольник, отступив от границ холста на толщину рамки
	context.rect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);
	// закрашиваем его белым 
	context.fill();
}


// получаем значение ячейки из лабиринта
function getField (x, y) {
	// если хотя бы одна из координат не находится в границах карты
	if (x < 0 || x >= columnsSize || y < 0 || y >= rowsSize) {
		// выходим из функции и говорим, что такой ячейки нет
		return null;
	}
	// если дошли до сюда, значит координата верная и мы возвращаем её значение из карты лабиринта
	return map[y][x];
}

// отрисовываем карту
function drawMap () {
	// обрабатываем по очереди все ячейки в каждом столбце и строке
	for (let x = 0; x < columnsSize; x++) {
		for (let y = 0; y < rowsSize; y++) {
			// если на карте лабиринта эта ячейка помечена как стена
			if (getField(x, y) === '▉') {
				// берём чёрный цвет
				context.fillStyle = 'black';
				// начинаем рисовать новую фигуру
				context.beginPath();
				// делаем прямоугольник на месте этой ячейки
				context.rect(padding + x * fieldSize, padding + y * fieldSize, fieldSize, fieldSize);
				// закрашиваем его чёрным
				context.fill();
			}
		}
	}
}

// рисуем вход и выход из лабиринта
function drawExit() {
	// берём белый цвет
	context.fillStyle = 'white';
	// начинаем рисовать новую фигуру
	context.beginPath();
	// рисуем белый прямоугольник над первой ячейкой лабиринта
	context.rect(padding, 0, fieldSize, padding);
	// закрашиваем его белым
	context.fill();

	// берём белый цвет
	context.fillStyle = 'white';
	// начинаем рисовать новую фигуру
	context.beginPath();

	// считаем размеры сдвига
	if (columnsSize % 2 == 0) {shiftX = fieldSize};
	if (rowsSize % 2 == 0) {shiftY = fieldSize};

	// рисуем белый прямоугольник под последней ячейкой лабиринта
	context.rect((columnsSize - 1) * fieldSize + padding - shiftX, rowsSize * fieldSize + padding - shiftY, fieldSize, padding + shiftY);
	// закрашиваем его белым
	context.fill();

}

// рисуем фигурку игрока
function drawPlayer() {
	// берём красный цвет
	context.fillStyle = 'red';
	// начинаем рисовать новую фигуру
	context.beginPath();
	// рисуем белый прямоугольник над первой ячейкой лабиринта
	context.rect(padding + player.X * fieldSize, padding + player.Y * fieldSize, fieldSize, fieldSize);
	// закрашиваем его белым
	context.fill();
}

function movePlayer(player, direction, columnsSize, rowsSize) {
    // Определение новых координат в зависимости от направления
    let newX = player.X;
    let newY = player.Y;

    switch (direction) {
        case 'right':
            newX += 1;
            break;
        case 'left':
            newX -= 1;
            break;
        case 'down':
            newY += 1;
            break;
        case 'up':
            newY -= 1;
            break;
        default:
            console.error('Unknown direction');
            return;
    }

    // Проверка, что новое положение не выходит за границы и клетка не занята
    if (
        newX >= 0 && newX < columnsSize && 
        newY >= 0 && newY < rowsSize && 
        getField(newX, newY) !== '▉'
    ) {
        // Обновляем позицию игрока
        player.X = newX;
        player.Y = newY;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Кнопка "вверх"
    const upButton = document.getElementById('up');
    if (upButton) {
        upButton.addEventListener('click', function() {
            movePlayer(player, 'up', columnsSize, rowsSize);    // Двигаем игрока вверх
        });
    } else {
        console.error('Кнопка с ID "up" не найдена');
    }

    // Кнопка "вниз"
    const downButton = document.getElementById('down');
    if (downButton) {
        downButton.addEventListener('click', function() {
            movePlayer(player, 'down', columnsSize, rowsSize);  // Двигаем игрока вниз
        });
    } else {
        console.error('Кнопка с ID "down" не найдена');
    }

    // Кнопка "влево"
    const leftButton = document.getElementById('left');
    if (leftButton) {
        leftButton.addEventListener('click', function() {
            movePlayer(player, 'left', columnsSize, rowsSize);  // Двигаем игрока влево
        });
    } else {
        console.error('Кнопка с ID "left" не найдена');
    }

    // Кнопка "вправо"
    const rightButton = document.getElementById('right');
    if (rightButton) {
        rightButton.addEventListener('click', function() {
            // проверяем, не упираемся ли в стену или в границу лабиринта
            movePlayer(player, 'right', columnsSize, rowsSize); // Двигаем игрока вправо
        });
    } else {
        console.error('Кнопка с ID "right" не найдена');
    }
});

// Отслеживаем нажатия клавиш
document.addEventListener('keydown', function(e) {

	// стрелка вверх,
	if (e.which === 38) {
        movePlayer(player, 'up', columnsSize, rowsSize);    // Двигаем игрока вверх
	};

	// стрелка вниз
	if (e.which === 40) {
        movePlayer(player, 'down', columnsSize, rowsSize);  // Двигаем игрока вниз
	};

	// стрелка влево
	if (e.which === 37) {
        movePlayer(player, 'left', columnsSize, rowsSize);  // Двигаем игрока влево
	};
	// стрелка вправо
	if (e.which === 39) {
        movePlayer(player, 'right', columnsSize, rowsSize); // Двигаем игрока вправо
	};
});

// анимация
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