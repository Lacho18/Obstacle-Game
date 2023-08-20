const sleep = (time) => { 
    return new Promise(resolve => setTimeout(resolve, time)) 
}

function jumping(verticalPosition) {


    if (goingDown == false) {
        verticalPosition -= 30;
    }
    
    if(verticalPosition < 300) {
        goingDown = true;
    }

    if(goingDown == true) {
        index = 2;
        verticalPosition += 50;
    }

    if(verticalPosition >= (CANVAS_HEIGHT - floor.y * size + 20)) {
        goingDown = false;
        isJumping = false;
        index = 0;
        verticalPosition = CANVAS_HEIGHT - floor.y * size + 10;
    }
    return verticalPosition;
}

function checkForCollision() {
    let hitBoxLowerX = 10;
    let hitBoxLowerY = 45;
    if(positionX - hitBoxLowerX < obstaclesArray[obstacleIndex].x + obstaclesArray[obstacleIndex].width &&
        positionX - hitBoxLowerX + SPRITE_WIDTH * size > obstaclesArray[obstacleIndex].x &&
        positionY - hitBoxLowerY < obstaclesArray[obstacleIndex].y + obstaclesArray[obstacleIndex].height &&
        positionY - hitBoxLowerY + SPRITE_HEIGHT * size > obstaclesArray[obstacleIndex].y) 
    { 
        GameOver();
    }
}

function GameOver() {
    $("#over").show();
    $("section").css("background-color", "black");
    $("#game").css("background-color" ,"rgba(0,0,0,0.5)");
    obstaclesArray[obstacleIndex].pause();
    FrameX = 0;
    isIncreasing = false;
    gameIsOver = true;
    PlayAgain();
}

function Scores() {
    if(isIncreasing == true) {
        Score++;
    }
}

async function PlayAgain() {
    await sleep(2000);
    let topPosition = 50;
    let fontSize = 4;
    let color = 0;
    while(topPosition >= 40) {
        topPosition--;
        fontSize -= 0.2;
        color += 7;
        $("#over").css({"top" : topPosition+"%",
                        "font-size" : fontSize+"vmax",
                        "color" : "rgb("+color+" ," +color+" ," +color+" )"});
        await sleep(80);
    }

    $("#Result").html("You scored:<b> "+Score+"<b>");
    $("#Result > b").css("color" ,"#A60909");
    $("#Result, #PlayAgain").show();
        
}

function obstacleSpalner() {
    obstaclesArray.forEach(obstacle => {
        obstacle.draw();
    });

    obstaclesArray[obstacleIndex].x -=  obstaclesArray[obstacleIndex].speed;

    if(obstaclesArray[obstacleIndex].x < -obstaclesArray[obstacleIndex].width) {
        obstacleIndex++;
    }
}

let startPause = true;

function pause() {

    if(startPause) {
        $("#Pause").show();
        $("#game").css("background-color" ,"rgba(99, 97, 97)");
        gameIsPaused = true;
        isIncreasing = false;
        obstaclesArray[obstacleIndex].pause();
        startPause = false;
    }

    else {
        $("#Pause").hide();
        $("#game").css("background-color" ,"rgba(0, 0, 0, 0.2)");
        gameIsPaused = false;
        isIncreasing = true;
        obstaclesArray[obstacleIndex].stoppause();
        startPause = true;
        animate();
    }   
}