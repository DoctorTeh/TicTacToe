const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (question) => {
    let readlinePromise = new Promise((resolve) => {
        readline.question(`${question}\n`, answer => {
            resolve(answer)
            readline.pause();
        });
    })
    return readlinePromise;
}

let turn = 1
let board = [0,0,0,0,0,0,0,0,0]
let victory = 0
let correctInput = 0

function printBoard(boardstate) {
    let symbols = boardstate.map(x => {
        if (x == 0) {
            return " "
        } 
        else if (x == 1) {
            return "X"
        } 
        else if (x == 2) {
            return "O"
        }
    })
    let spacer = '___|___|___'
    console.log(' ' + symbols[0] + ' | ' + symbols[1] + ' | ' + symbols[2])
    console.log(spacer)
    console.log(' ' + symbols[3] + ' | ' + symbols[4] + ' | ' + symbols[5])
    console.log(spacer)
    console.log(' ' + symbols[6] + ' | ' + symbols[7] + ' | ' + symbols[8])
}

let input = async () => {
    while (correctInput == 0) {
        printBoard(board)
        console.log(`Player ${turn}, Pick a move`)
        let row = await prompt('Enter row 1-3')
        let column = await prompt('Enter column 1-3') 
        if (row <= 3 && row >= 1 && column <= 3 && column >= 1) {
         if (board[((Math.floor(row) - 1) * 3) + ((Math.floor(column)) - 1)] !== 0) {
            console.log(`That is already taken, try again`)
            continue
        } 
        else {
            board[((Math.floor(row) - 1) * 3) + ((Math.floor(column)) - 1)] = turn
            correctInput = 1
            continue
        }
    }
        else {
            console.log('Invalid input, try again')
            continue
     }
    }
}
function victoryConditions() {
    correctInput = 0 //Just to reset the value to make input work properly next cycle through the whole program
    for (let i = 0; i < 9; i+= 3) {
        if ((board[0 + i] === turn) && (board[1 + i] === turn) && (board[2 + i] === turn)) {
            victory = 1
            return
        }
    }
    for (let i = 0; i < 3; i++) {
        if ((board[0 + i] === turn) && (board[3 + i] === turn) && (board[6 + i] === turn)) {
            victory = 1
            return
        }
    }
    if (board[0] === turn && board[4] === turn && board[8] === turn) {
        victory = 1
        return
    }
    if (board[2] === turn && board[4] === turn && board[6] === turn) {
        victory = 1
        return
    }
    } 

function checkVictory() {
    if (victory === 1) {
        console.log(`Player ${turn} is the winner!`)
        printBoard(board)  
    }
    else {
        console.log(`No winner yet`)
        if (turn === 1) {
            turn = 2
        }
        else if (turn === 2) {
            turn = 1
        }
    }
   }

function checkFull() {
    if (board.every(x => x !== 0)) {
        console.log(`Tie Game!`)
        printBoard(board)
        victory = 1 // in order to make sure game ends using the while loop. Can remove otherwise
    }
}
let TicTacToe = async () => {
    while (victory !== 1) {
        await input()
        victoryConditions()
        checkVictory()
        checkFull()
    }

}
TicTacToe()