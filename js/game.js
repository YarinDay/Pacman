'use strict'
const WALL = '⬛'
const FOOD = '.'
const EMPTY = ' '
const power_food = '🍬'
const CHERRY = '🍒'
var gCherryInterval

const restart = document.querySelector('.game-over')

var gBoard
const gGame = {
    score: 0,
    isOn: false
}

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    gCherryInterval = setInterval(function () {addCherry()}, 3000)
    printMat(gBoard, '.board-container')
    gGame.isOn = true

}


function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = board[1][8] = board[8][1] = board[8][8] = power_food
    return board
}

function playAgain() {
    gGame.score = 0
    foodCollected = 0
    document.querySelector('h2 span').innerText = gGame.score
    init()
    restart.style.visibility = 'hidden'
}


function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff

    //DOM
    document.querySelector('h2 span').innerText = gGame.score
}

function victory() {
    // TODO

    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    restart.style.visibility = 'visible'
    document.querySelector('.game-over').innerHTML = `You Won! <button onclick="playAgain(this)">Play Again!</button>`
}
function gameOver() {
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, '🏳')
    document.querySelector('.game-over').innerHTML = `Game Over! <button onclick="playAgain(this)">Play Again!</button>`

    gGame.isOn = false
    restart.style.visibility = 'visible'
}

