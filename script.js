// Gameboard object
'use strict'
const GameBoard = (function(){
    let board = [
                 [null, null, null],
                 [null, null, null],
                 [null, null, null]
                ];

    const showBoard = () => console.log(board);
    
    const modify = (XO, col, row) => board[col][row]= XO;

    // clears the board and resets the game
    const clear = () => {
        
        board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
           ];
        const tiles = document.querySelectorAll('.tile');

        for(let i = 0; i<tiles.length; i++){
            tiles[i].remove()
        };
        
        Game.renderBoard();
        loadTiles();
        Game.isRunning = true;
    };
    
    const CheckWin = () => {
        
        //scenario no 1, rows
        for(let i=0; i<board.length; i++) {
            let row = board[i];
            if (row[0] === row[1] && row[0] === row[2] && row[0] !== null){
                return row[0]; 
            } 
        };

        // Scenario no 2, columns
        for(let i=0; i<board.length; i++){
            if (board[0][i]===board[1][i] && board[0][i]===board[2][i] && board[0][i]!==null){
                return board[0][i];
            }
        }

        // Scenario no 3, diagonals
        if (board[1][1] === board[0][0] &&  board[0][0]=== board[2][2] || board[1][1]=== board[0][2] && board[0][2] === board[2][0]){
            return board[1][1];
        };

        // Scenario no 4, draw
        let draw = []
        board.forEach(r => {
            if (!r.includes(null)){
                draw.push(true);
            }
        });
        if (draw.length===3){
            return 'draw';
        };
    }
    return {showBoard, board, modify, CheckWin, clear}
})();


// Player object
const Player = (XO) => {
    const side = XO;
    const whichSide = () => console.log(XO);
    return {whichSide, side}
}


// Initalizing players
const player1 = Player("X")
const player2 = Player("O")
let activePlayer = player1;


// Game controller object
const Game = (function(){

    let isRunning = true;

    function renderBoard(){
        const display =  document.querySelector('.board');
        
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                const div = document.createElement('div');
                div.classList.add('tile');
                div.setAttribute('id', `${i} ${j}`);
                display.appendChild(div);
            }
        }
    };

    function renderNew(col, row){
        const id =  document.getElementById(String(col)+' '+String(row));
        const p = document.createElement('p');
        p.textContent =  activePlayer.side;
        id.appendChild(p);
    };

    //check the current status of board and then give feedback if the game is over
    function checkStatus(){
        let status = GameBoard.CheckWin()
        
        if (status === 'draw'){
            console.log('Game over, its a draw!');
            Game.isRunning = false;

        } else if(status === player1.side) {
            console.log('Game over, player1 won!');
            Game.isRunning = false;

        } else if(status === player2.side) {
            console.log('Game over, player2 won!');
            Game.isRunning = false;
        };
    }

    return {renderNew, renderBoard, checkStatus, isRunning}
})()

Game.renderBoard()

function playRound(e){
    
    let col = parseInt(Array(e.target.id.split(" "))[0][0])
    let row = parseInt(Array(e.target.id.split(" "))[0][1])

    if(!isNaN(row) && Game.isRunning){

        GameBoard.modify(activePlayer.side, col, row)
        Game.checkStatus()
        Game.renderNew(col, row)

        if (activePlayer === player1){
            activePlayer = player2
        } else {
            activePlayer = player1
        }
    }
};

// we get the divs what are clicked
function loadTiles(){
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile=> {
        tile.addEventListener('click', e => playRound(e));
    })
};

loadTiles()


// reset button
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => GameBoard.clear());