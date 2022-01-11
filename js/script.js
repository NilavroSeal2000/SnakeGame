
// Game Constant
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio('assest/food.mp3');
let gameOverSound = new Audio('assest/gameover.mp3');
let musicSound = new Audio('assest/music.mp3');
let moveSound = new Audio('assest/move.mp3');
let speed = 4;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 10, y: 7 }
let score = 0
let sound = false

//Level of difficulty
   const btn = document.querySelector('#btn');
        // handle button click
        btn.onclick = function () {
            const rbs = document.querySelectorAll('input[name="choice"]');
            let selectedValue;
            for (const rb of rbs) {
                if (rb.checked) {
                    selectedValue = rb.value;
                    break;
                }
            }
            if(selectedValue === 'hard')
            {
              console.log("Hard Level Activated")
              speed = 10
            }
            else if(selectedValue === 'medium')
            {
              console.log("Medium Level Activated")
              speed = 7
            }
            else if(selectedValue === 'easy')
            {
              console.log("Easy Level Activated")
              speed = 4
            }
        };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  // musicSound.play()
  //console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed)
    return;
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // if snake hit itself

  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      {
        return true;
      }
    }

  }

  if (snake[0].x > 18 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y < 0) {
    return true;
  }
  return false;
}

function gameEngine() {
  // Part 1: Updating the snake variable
  if (isCollide(snakeArr)) {
    if (sound) {
      console.log("Game Over Sound Playing")
      gameOverSound.play()
    }
    else {
      console.log("Game Over Sound Paused")
      gameOverSound.pause()
    }

    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play the game");
    snakeArr = [{ x: 13, y: 15 }];
    if (sound) {
      musicSound.play()
    }
    else {
      console.log("PAUSED")
      musicSound.pause()
    }
    gameOverSound.pause()
    score = 0;
  }

  // If food is eaten 
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    let a = 2;
    let b = 16;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    if (sound) {
      foodSound.play()
    }
    else {
      console.log("PAUSED")
      foodSound.pause()
    }
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
    score++;
    document.getElementById("scoreid").innerHTML = "Score : " + score
    if (score > hiscoreval) {
      hiscoreval = score
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreid.innerHTML = "Hi-Score: " + hiscoreval;
    }
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {

    snakeArr[i + 1] = { ...snakeArr[i] }  //snake destructuring creating new object
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Render the snake and food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add('head');
    }
    else {
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


  })
}



// Main logic

let hiscore = localStorage.getItem("hiscore");

if (hiscore === null) {
  hiscoreval = 0
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
  hiscoreval = JSON.parse(localStorage.getItem("hiscore"))
  hiscoreid.innerHTML = "Hi-Score: " + hiscore;
}


window.requestAnimationFrame(main);

let lastmove = ""
window.addEventListener('keydown', e => {
  if (sound) {
    musicSound.play()
    moveSound.play()
  }
  else {
    console.log("PAUSED")
    musicSound.pause()
    //inputDir = { x: 0, y: 1 }
    moveSound.pause()
  }

  switch (e.key) {
    case "ArrowUp":
      if (lastmove == "ArrowDown")
        break
      console.log("ArrowUp")
      inputDir.x = 0;
      inputDir.y = -1;
      break
    case "ArrowDown":
      if (lastmove == "ArrowUp")
        break
      console.log("ArrowDown")
      inputDir.x = 0;
      inputDir.y = 1;
      break
    case "ArrowRight":
      if (lastmove == "ArrowLeft")
        break
      console.log("ArrowRight")
      inputDir.x = 1;
      inputDir.y = 0;
      break
    case "ArrowLeft":
      if (lastmove == "ArrowRight")
        break
      console.log("ArrowLeft")
      inputDir.x = -1;
      inputDir.y = 0;
      break
    default:
      break
  }
  lastmove = e.key
})

// Music on and off

function myFunction() {
  // Get the checkbox
  var checkBox = document.getElementById("myCheck");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    sound = true;
    musicSound.play()
    //console.log(sound)
  } else {
    sound = false;
    musicSound.pause()
    gameOverSound.pause()
    //console.log(sound)
  }
}