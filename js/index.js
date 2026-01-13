//game contstants and variables
let inputDir={x:0,y:0};
let speed=9;
let lastPaintTime=0;
let snakeArr=[{x:10,y:15}]
food={x:6,y:7};
let score=0;
let scoreBox=document.getElementById('scoreBox');
const board = document.getElementById('board');

//game functions

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snarr){
    //if you bump into yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x===snarr[0].x && snakeArr[i].y===snarr[0].y){
            return true;
        }
    }
    //if you bump into wall
    if(snarr[0].x>=18 || snarr[0].x<=0 || snarr[0].y>=18 || snarr[0].y<=0){
        return true;
    }
    return false;

}
function gameEngine(){
    // ..update the snake
    if(isCollide(snakeArr)){
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr=[{x:10,y:15}];
        score=0;
    }
    // if eaten the food increment score and regenerate food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){

        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        score+=1;
        if(score>highscore){    
            highscore=score;
            localStorage.setItem("highscore",JSON.stringify(highscore));
            document.getElementById('HIGHSCORE').innerHTML="HIGH SCORE: "+highscore;
        }
        
        scoreBox.innerHTML="Score: "+score;
        
        let a=2;
        let b=16;
        food = {
        x: Math.round(a+(b-a)*Math.random()),
        y: Math.round(a+(b-a)*Math.random())
    };
    }

    //move the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        const element=snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]}

        
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;
 

    board.innerHTML = "";
// display the snake
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('snakehead'); // Snake head
        } else {
            snakeElement.classList.add('snake'); // Snake body
        }

        board.appendChild(snakeElement);
    });

    // display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food'); // ✅ Corrected line
    board.appendChild(foodElement);

    
}



// main logic
highscore=localStorage.getItem("highscore");
if(highscore===null){
    highscore=0;
    localStorage.setItem("highscore",JSON.stringify(highscore));
}
else{
    highscore=JSON.parse(highscore);
    document.getElementById('HIGHSCORE').innerHTML="HIGH SCORE: "+highscore;
}   
window.requestAnimationFrame(main);window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1}; // Start the game on any key press
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");

            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});