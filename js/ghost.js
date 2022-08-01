'use strict'
const GHOST = '&#9781'
var gGhosts = []
var gRemoveGhosts = []
var gIntervalGhosts

function createGhost(board, idx) {
    // DONE
    var ghost = {
        location: {
            i: 2 + idx,
            // i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST

}

function createGhosts(board) {
    gGhosts = []
    // DONE: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board, i)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')
}




function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log(nextLocation);

    // DONE: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === GHOST) return


    // DONE: hitting a pacman?  call gameOver
    if (nextCell === PACMAN && !gIsSuperMode) {
        gameOver()
        return
    } else if (nextCell === PACMAN && gIsSuperMode) {
        return
    }


    // DONE: moving from current position:
    // DONE: update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // DONE: Move the ghost to new location
    // DONE: update the model
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}


function removeGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (
            ghost.location.i === nextLocation.i &&
            ghost.location.j === nextLocation.j
        ) {
            var deletedGhost = gGhosts.splice(i, 1)[0]
            if (deletedGhost.currCellContent === FOOD) {
                // foodCollected--
                deletedGhost.currCellContent = EMPTY
            }
            gRemoveGhosts.push(deletedGhost)
        }
    }
}

function reviveAll() {
    for (var i = 0; i < gRemoveGhosts.length; i++) {
      var ghost = gRemoveGhosts[i]
      gGhosts.push(ghost)
    }
    gRemoveGhosts = []
  }


function getMoveDiff() {
    // const randNum = getRandomIntInclusive(1, 100)
    // if (randNum <= 25) {
    //     return { i: 0, j: 1 }
    // } else if (randNum <= 50) {
    //     return { i: -1, j: 0 }
    // } else if (randNum <= 75) {
    //     return { i: 0, j: -1 }
    // } else {
    //     return { i: 1, j: 0 }
    // }

    const randNum = getRandomIntInclusive(1, 4)
    if (randNum === 1) {
        return { i: 0, j: 1 }
    } else if (randNum === 2) {
        return { i: -1, j: 0 }
    } else if (randNum === 3) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


// function getGhostHTML(ghost) {
//     return `<span style="color:${ghost.color}">${GHOST}</span>`
// }

function getGhostHTML(ghost) {
    var color = 'cyan'
    if (gIsSuperMode) {
        return `<span style="color:${color}">${GHOST}</span>`
    } else {
        return `<span style="color:${ghost.color}">${GHOST}</span>`
    }
}