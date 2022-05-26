import { getInputDirection } from "./input.js"

export let SNAKE_SPEED = 6
const snakeBody = [{x: 11, y: 11}]
let newSegments = 0
export let pointNumber = 0;

export function update() {
  addSegments();
  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }
  snakeBody[0].x += inputDirection.y
  snakeBody[0].y += inputDirection.x
}

export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.x
    snakeElement.style.gridColumnStart = segment.y
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}

export function expandSnake(amount) {
  newSegments += amount;
  pointNumber += 1;
  console.log(pointNumber);
}

export function onSnake(position, {ignoreHead = false} = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}
export function getSnakeHead() {
  return snakeBody[0]
}
export function snakeInterSection(){
  return onSnake(snakeBody[0], {ignoreHead: true})
}
function equalPositions(pos1, pos2) {
  return (
    pos1.x === pos2.x && pos1.y === pos2.y
  )
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({...snakeBody[snakeBody.length - 1]})
  }

  newSegments = 0
}
