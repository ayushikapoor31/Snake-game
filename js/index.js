let board = document.querySelector('.board');
let scoreBox=document.querySelector('.score');
let moveSound = new Audio('movingSound.wav');
let gameOverSound=new Audio('gameOverSound.wav');
let inputDirection = { x: 0, y: 0 };
let speed = 6;
let score=0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 },
];
food = { x: 9, y: 12 };

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snake)
{ 
    //if snake get into itself then
    for(let i=1;i<snakeArr.length;i++)
    { 
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }
    //if it hit the boundary then

    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
    {
        return true;
    }
    
}

function gameEngine() {
    //part 1:update the snake
    if(isCollide(snakeArr))
    {
        gameOverSound.play();
        inputDirection = { x: 0, y: 0 };
        alert("game over play Any button to restart");
        score=0;
        scoreBox.innerHTML="Score :" + score;
        snakeArr=[{ x: 13, y: 15 },]
    }
    //if food is eaten
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y)
    { 
        moveSound.play();
        score+=1;
        scoreBox.innerHTML="Score :" + score;
        snakeArr.unshift({x:snakeArr[0].x+inputDirection.x,y:snakeArr[0].y+inputDirection.y});
        let a=1;
        let b=17
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
     //const element=array[i]
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x+=inputDirection.x;
    snakeArr[0].y+=inputDirection.y;


    //part 2:display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 };  //start the game
    // moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("Arrowup");
            inputDirection.x=0;
            inputDirection.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x=0;
            inputDirection.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x=-1;
            inputDirection.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x=1;
            inputDirection.y=0;
            break;
        default:
            break;

    }
})