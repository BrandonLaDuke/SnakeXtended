let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0}

const btnUp = document.getElementById("up")
const btnDown = document.getElementById("down")
const btnLeft = document.getElementById("left")
const btnRight = document.getElementById("right")

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
    if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break;
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break;
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break;
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break;
  }
})

btnUp.addEventListener('click', function (event) {
    if (lastInputDirection.y == 0) {
      inputDirection = { x: 0, y: -1 }
    }
});
btnDown.addEventListener('click', function (event) {
      if (lastInputDirection.y == 0) {
      inputDirection = { x: 0, y: 1 }
    }
});
btnLeft.addEventListener('click', function (event) {
      if (lastInputDirection.x == 0) {
      inputDirection = { x: -1, y: 0 }
    }
});
btnRight.addEventListener('click', function (event) {
      if (lastInputDirection.x == 0) {
      inputDirection = { x: 1, y: 0 }
    }
});

export function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}
