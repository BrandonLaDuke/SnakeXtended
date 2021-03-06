import {update as updateSnake, draw as drawSnake, getSnakeHead, snakeInterSection, pointNumber} from "./snake.js"
import {update as updateFood, draw as drawFood} from './water.js'
import {outsideGrid} from './mathymath.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
  
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

// Import the functions you need from the SDKs you need
      
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgjoNZkeGVEmdjpWGSD0sFRlfer4iXZl4",
  authDomain: "snake-xtended.firebaseapp.com",
  projectId: "snake-xtended",
  storageBucket: "snake-xtended.appspot.com",
  messagingSenderId: "942929903309",
  appId: "1:942929903309:web:3b6741e40e1203d7147384",
  measurementId: "G-N33F6W10M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

let SNAKE_SPEED = 8
let gameMode = "";
let lastRenderTime = 0
let death = false
const gameArea = document.getElementById('gameArea');
const gameBoard = document.getElementById('game-board');
var run = false;
const startBtn = document.getElementById('start');
const startBtnEasy = document.getElementById('startEasy');
startBtnEasy.focus();
const startBtnHard = document.getElementById('startHard');
const startBtnChallenge = document.getElementById('startChallenge');
const startBtnInsane = document.getElementById('startInsane');
const pauseBtn = document.getElementById('pause');
const resumeBtn = document.getElementById('resume');
const overlay = document.getElementById('overlay');
const controls = document.getElementById('control-container');
const title = document.getElementById('title');
const footer = document.getElementById('footer');
//const restartBtn = document.getElementById('restart');
const snakeSpeedEEgg = document.getElementById('eEgg1');
const snakeSpeedSelectMenu = document.getElementById('snakeSpeedSelectMenu');
const speedClass = document.querySelectorAll('.speed-class');
const confirmNickname = document.getElementById('confirmNickname');



function main(currentTime) {

  if (death) {
    if (gameMode === "easy") {
      console.log("display easy table");
    } else if (gameMode === "normal") {
      console.log("This is where we will check DB for normal mode")
    }
    

    document.getElementById('hellspawn').setAttribute("open", "null");
    return;
  }
  if (run) {
    window.requestAnimationFrame(main);
  }
  const sLR = (currentTime - lastRenderTime) / 1000;
  if (sLR < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}


function createKey() {
  let key = "gcktvk";
}

function addScore(key, nickname, pointNumber) {
  const db = getDatabase(app);
  set(ref(db, 'easyScores/' + key), {
    user: nickname,
    score: pointNumber
  });
  console.log("I ran")
}

function update() {
  updateSnake();
  updateFood();
  fuckingDie();
}
function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood (gameBoard);
}
function fuckingDie() {
 death = outsideGrid(getSnakeHead()) || snakeInterSection();
}
snakeSpeedEEgg.addEventListener('click', function (event) {

});
startBtnEasy.addEventListener('click', function (event) {
  SNAKE_SPEED = 6;
  gameMode = "easy";
  createKey();
  run = true;
  startBtn.classList.add('hidden');
  overlay.classList.add('hidden');
  title.classList.add('hidden');
  footer.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
  gameArea.classList.remove('hidden');
  controls.classList.remove('hidden');
  main();
});
startBtn.addEventListener('click', function (event) {
  run = true;
  gameMode = "normal";
  startBtn.classList.add('hidden');
  overlay.classList.add('hidden');
  title.classList.add('hidden');
  footer.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
  gameArea.classList.remove('hidden');
  controls.classList.remove('hidden');
  main();
});
startBtnHard.addEventListener('click', function (event) {
  SNAKE_SPEED = 10;
  gameMode = "hard";
  run = true;
  startBtn.classList.add('hidden');
  overlay.classList.add('hidden');
  title.classList.add('hidden');
  footer.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
  gameArea.classList.remove('hidden');
  controls.classList.remove('hidden');
  main();
});
startBtnChallenge.addEventListener('click', function (event) {
  SNAKE_SPEED = 14;
  gameMode = "challenge";
  run = true;
  startBtn.classList.add('hidden');
  overlay.classList.add('hidden');
  title.classList.add('hidden');
  footer.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
  gameArea.classList.remove('hidden');
  controls.classList.remove('hidden');
  main();
});
startBtnInsane.addEventListener('click', function (event) {
  SNAKE_SPEED = 18;
  gameMode = "insane";
  run = true;
  startBtn.classList.add('hidden');
  overlay.classList.add('hidden');
  title.classList.add('hidden');
  footer.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
  gameArea.classList.remove('hidden');
  controls.classList.remove('hidden');
  main();
});
startBtnCustom.addEventListener('click', function (event) {
  const customSnakeSpeed = document.getElementById('customSnakeSpeed').value;
  if (customSnakeSpeed <= 50 && customSnakeSpeed >= 1) {
    SNAKE_SPEED = customSnakeSpeed;
    run = true;
    startBtn.classList.add('hidden');
    overlay.classList.add('hidden');
    title.classList.add('hidden');
    footer.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    gameArea.classList.remove('hidden');
    controls.classList.remove('hidden');
    main();
  }
});

pauseBtn.addEventListener('click', function (event) {
    run = false;
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.remove('hidden');
    
});

resumeBtn.addEventListener('click', function (event) {
    run = true;
    pauseBtn.classList.remove('hidden');
    resumeBtn.classList.add('hidden');
    
    main();
});

confirmNickname.addEventListener('click', function (event) {
  let nickname = document.getElementById('usrNickname').value;
  // getScoresEasy(db);
  let score = pointNumber;
  let key = "hs" + Date.now();
  addScore(key, nickname, score);
});

// Easter Egg Access
snakeSpeedEEgg.addEventListener('click', function (event) {
  snakeSpeedSelectMenu.classList.remove('hidden');
  speedClass.forEach(el => {
    el.classList.remove('hidden');
  });
});