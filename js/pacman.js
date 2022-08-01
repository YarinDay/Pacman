'use strict'
const PACMAN = '😷'
var foodCollected = 0
var gPacman
var gIsSuperMode = false
var newGhost = []
var emptyCellCount = 0

function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        }
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost?  call gameOver
    if (nextCell === power_food) {
        emptyCellCount++
        if (gIsSuperMode) return
        endSuperMode()
    }
    if (nextCell === GHOST && !gIsSuperMode) {
        gameOver()
        return
    } else if (nextCell === GHOST && gIsSuperMode) {
        removeGhost(nextLocation)
    }

    if (nextCell === FOOD) {
        updateScore(1)
        foodCollected++
        if (foodCollected === 53) {
            victory()
        }
    } else if (nextCell === CHERRY) {
        updateScore(10)
        getEmptyCell()
    }

    // DONE: moving from current position:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location
    // DONE: update the model
    gPacman.location = nextLocation // {i:2 ,j:3}
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // DONE: update the DOM
    renderCell(gPacman.location, PACMAN)
}


// function endSuperMode() {
//     gIsSuperMode = false
// }

function endSuperMode() {
    gIsSuperMode = true
    setTimeout(() => {
        gIsSuperMode = false
        reviveAll()
    }, 5000)
}

function addCherry() {
    var randCell = getEmptyCell()
    if (!randCell) return
    //Model
    gBoard[randCell.i][randCell.j] = CHERRY
    //DOM
    renderCell(randCell, CHERRY)
}

function getEmptyCell() {
    const emptyCells = []
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[i].length - 1; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    if (!emptyCells.length) return
    var randCellIdx = getRandomIntInclusive(0, emptyCells.length - 1)
    return emptyCells[randCellIdx]
}


function getNextLocation(eventKeyboard) {
    // TODO: figure out nextLocation

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'w':
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'd':
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 's':
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'a':
        case 'ArrowLeft':
            nextLocation.j--
            break;

        default:
            break;
    }
    return nextLocation
}