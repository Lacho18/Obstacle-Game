const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
const SPRITE_WIDTH = 575;
const SPRITE_HEIGHT = 523;

const heroImage = new Image();
heroImage.src = "Images/shadow_dog3.png"; 

let FrameX = 0;
let FrameY = 0;
let count = 0;
let jumpingCount = 0;
let size = 0.2;
let index = 0;
let positionX = 0;
let positionY = 0;
let speed = 10;
let gamespeed = 2;
let gameDificulty = 1;

let isJumping = false;
let goingDown = false;
let isIncreasing = true;
let gameIsOver = false;
let gameIsPaused = false;

let numberOfObstacles = 100;
let obstaclesArray = [];
let obstacleIndex = 0;

let Score = 0;

const floor = new Floor(0.5);

const obstacle = new Obstacle();

for(let i = 0; i < numberOfObstacles; i++) {
	obstaclesArray.push(new Obstacle());
}

positionY = CANVAS_HEIGHT - floor.y * size + 10;

function animate() {
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	FrameY = index;
    context.drawImage(heroImage, 
    	              FrameX * SPRITE_WIDTH,
    	              FrameY * SPRITE_HEIGHT,
    	              SPRITE_WIDTH,
    	              SPRITE_HEIGHT,
    	              positionX,
    	              positionY,
    	              SPRITE_WIDTH * size,
    	              SPRITE_HEIGHT * size);
    floor.update();
    floor.draw();

    obstacleSpalner();

    count++;
    jumpingCount++;
    if(!isJumping) { 
    	 if(count > 18) {
    	FrameX++;
    	count = 0;	
    	}
    }
   

    if (FrameX >= heroStates[index].frames) {
    	FrameX = 0;
    }

    if(jumpingCount > 10) {
    	if(isJumping == true) {
    	positionY = jumping(positionY);
    	}
    	jumpingCount = 0;
    }

    $("#Score").html("Score: " +Score);
    Scores();
    checkForCollision();
    
	context.strokeRect(positionX , positionY , SPRITE_WIDTH * size, SPRITE_HEIGHT * size);

    if(!gameIsOver && !gameIsPaused) {
    	requestAnimationFrame(animate); 
    }
}




$(document).ready(function() {
	$(document).keydown(function(e) {
		if(!gameIsOver) {
			switch(e.which) {
				case 68: index = 3;
				positionX += speed;
				break;
				case 65: index = 3;
				positionX -= speed;
				break;
				case 83: index = 4;
				obstaclesArray[obstacleIndex].pause();
				isIncreasing = false;
				break;
				case 87: index = 1;
				isJumping = true;
				break;
				case 80: pause();
				break;
			}
		}
		
	});
	$(document).keyup(function(e) {
		if(!gameIsOver) {
			switch(e.which) {
				case 68: index = 0;
				break;
				case 65: index = 0;
				break;
				case 83: index = 0;
				obstaclesArray[obstacleIndex].stoppause();
				isIncreasing = true;
				break;

		 	}
		}
	});
	animate();
	$("#PlayAgain").click(function() {
		gameIsOver = false;
		isIncreasing = true;
		positionX = 0;
		positionY = CANVAS_HEIGHT - floor.y * size + 10;
		obstaclesArray[obstacleIndex].x = CANVAS_WIDTH + obstaclesArray[obstacleIndex].width;
		FrameX = 0;
		frameY = 0;
		index = 0;
		Score = 0;
		obstaclesArray[obstacleIndex].stoppause();
		$("#game").css("background-color" ,"rgba(0, 0, 0, 0.2)");
		$("#over, #Result, #PlayAgain").hide();
		$("#over").css({"top" : "50%",
						"font-size" : "4vmax"});
		animate();
	});
});
