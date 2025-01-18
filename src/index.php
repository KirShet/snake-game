<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Лабиринт</title>
</head>
<body>
	<!-- подготавливаем пустой холст, чтобы работать с ним из скрипта -->
	<canvas></canvas>
	<!-- скрипт, который создаёт лабиринт -->
	<script src="../scripts/generateMaze.js">	</script>
	<!-- этот скрипт отвечает за отрисовку лабиринта -->
	<!-- <script src="drawMaze_player.js"></script> -->

    <script src="../scripts/drawMaze_player.js"></script>
	<div class="pyro">
		<div class="before"></div>
		<div class="after"></div>
	</div>
    <script>
		generateMaze(15,15);
	</script>
</body>
</html>