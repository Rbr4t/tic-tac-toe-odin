'use strict'
// Gameboard object

const GameBoard = (function(){
    let board = [
                 [null, null, null],
                 [null, null, null],
                 [null, null, null]
                ];
    let switchPlayer = false;
    const showBoard = () => console.log(board);
    
    const modify = (XO, col, row) => GameBoard.board[col][row]= XO;

    // clears the board and resets the game
    const clear = () => {

        const window = document.querySelector('.congrats');
        const tiles = document.querySelectorAll('.tile');
        window.style.display = 'none';
        for(let i = 0; i<tiles.length; i++){
            tiles[i].remove()
        };
        GameBoard.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        GameBoard.switchPlayer = GameBoard.switchPlayer===true?GameBoard.switchPlayer= false: GameBoard.switchPlayer = true
        Game.renderBoard();
        loadTiles();
        Game.isRunning = true;
        
    };
    
    const CheckWin = () => {
        
        //scenario no 1, rows
        for(let i=0; i<GameBoard.board.length; i++) {
            let row = GameBoard.board[i];
            if (row[0] === row[1] && row[0] === row[2] && row[0] !== null){
                return [row[0], i, 'row']; 
            } 
        };

        // Scenario no 2, columns
        for(let i=0; i<GameBoard.board.length; i++){
            if (GameBoard.board[0][i]===GameBoard.board[1][i] && GameBoard.board[0][i]===GameBoard.board[2][i] && GameBoard.board[0][i]!==null){
                return [GameBoard.board[0][i], i, 'col'];
            }
        }

        // Scenario no 3, diagonals
        if (GameBoard.board[1][1] === GameBoard.board[0][0] &&  GameBoard.board[0][0]=== GameBoard.board[2][2] && GameBoard.board[1][1]!==null ){
            return [GameBoard.board[0][0], 1, 'dia'];
        } else if (GameBoard.board[1][1]=== GameBoard.board[0][2] && GameBoard.board[0][2] === GameBoard.board[2][0] && GameBoard.board[1][1]!==null){
            return [GameBoard.board[0][2], -1, 'dia'];
        }

        // Scenario no 4, draw
        let draw = []
        GameBoard.board.forEach(r => {
            if (!r.includes(null)){
                draw.push(true);
            }
        });
        if (draw.length===3){
            return ['draw', null];
        };

        return undefined;
        
        
    }
    return {showBoard, board, modify, CheckWin, clear, switchPlayer}
})();


// Player object
const Player = (XO, type1) => {
    const type = type1;
    const side = XO;
    const whichSide = () => console.log(XO);
    return {whichSide, side, type}
}

function normalizeArrayForMiniMax(){
    let newArr = [];
    let index = 0;
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(GameBoard.board[i][j] !== null){
                newArr.push(GameBoard.board[i][j])
            } else {
                newArr.push(index)
            }
            index += 1;
        }
    }
    return newArr;
}
    

function mixmax(){
    // code from FFC website which shows how to implement minimax algorithm on tic-tac-toe, 
    // did some modifications in order to use this piece of code(normalizeArrayForMiniMax && index output), https://github.com/ahmadabdolsaheb/minimaxarticle/blob/master/index.js

    // human
    var huPlayer;
    var aiPlayer;
    
    huPlayer = "X";
    aiPlayer = "O";
    
    
    // ai
    
    // this is the board flattened and filled with some values to easier asses the Artificial Intelligence.
    let origBoard = normalizeArrayForMiniMax();

    // finding the ultimate play on the game that favors the computer
    var bestSpot = minimax(origBoard, aiPlayer);

    //logging the results
    // console.log(origBoard)
    // console.log("index: " + bestSpot.index);
    // console.log("function calls: " + fc);

    // the main minimax function
    function minimax(newBoard, player){
        
        //available spots
        var availSpots = emptyIndexies(newBoard);

        // checks for the terminal states such as win, lose, and tie and returning a value accordingly
        if (winning(newBoard, huPlayer)){
            return {score:-10};
        }
            else if (winning(newBoard, aiPlayer)){
            return {score:10};
            }
        else if (availSpots.length === 0){
            return {score:0};
        }

        // an array to collect all the objects
        var moves = [];

        // loop through available spots
        for (var i = 0; i < availSpots.length; i++){
            
            //create an object for each and store the index of that spot that was stored as a number in the object's index key
            var move = {};
            move.index = newBoard[availSpots[i]];

            // set the empty spot to the current player
            newBoard[availSpots[i]] = player;

            //if collect the score resulted from calling minimax on the opponent of the current player
            if (player == aiPlayer){
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
            }
            else{
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
            }

            //reset the spot to empty
            newBoard[availSpots[i]] = move.index;

            // push the object to the array
            moves.push(move);
        }

        // if it is the computer's turn loop over the moves and choose the move with the highest score
        var bestMove;
        if(player === aiPlayer){
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
            }
        }else{

        // else loop over the moves and choose the move with the lowest score
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
            }
        }

        // return the chosen move (object) from the array to the higher depth
        
        return moves[bestMove]
        
        
    }

    // returns the available spots on the board
    function emptyIndexies(board){
        return  board.filter(s => s != "O" && s != "X");
    }

    // winning combinations using the board indexies for instace the first win could be 3 xes in a row
    function winning(board, player){
    if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
            ) {
            return true;
        } else {
            return false;
        }
    }

    if(bestSpot.index>=6){
            
        return [2, bestSpot.index-6];
    } else if(bestSpot.index>=3){
        
        return [1, bestSpot.index-3];

    } else {
        
        return [0, bestSpot.index];
    }
    
};



// Initializing players
const option = document.querySelector('.against');
const pl2 = document.querySelector('.info2')
let player1 = Player("X", 'human')
let player2 = Player("O", 'bot')

option.addEventListener('click', (e)=> {
    if(option.innerHTML === 'bot'){
        player1 = Player("X", 'human')
        player2 = Player("O", 'human')
        option.textContent = 'human'
        pl2.textContent = 'Player2 - O'

    } else {

        player1 = Player("X", 'human')
        player2 = Player("O", 'bot')
        option.textContent = 'bot'
        pl2.textContent = 'Computer - O'
    }
});

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

    // coloring the diagonals, rows and columns if a winner in found out
    function colorWin(){
        let status = GameBoard.CheckWin();
        const tiles = document.querySelectorAll('.tile');

        // rows
        let i = null
        if (status[2]==='row'){
            i = status[1]===0?i=status[1]: status[1]===1?i=3: i=6;
            let j = i+3
            for(i ; i<j; i++){
                tiles[i].classList.add('win')
            }
        
        // columns
        } else if(status[2]==='col') {
            i = status[1]===0?i = [0, 3, 6]: status[1]===1?i = [1, 4, 7]: i = [2, 5, 8]
            i.forEach(j => {
                tiles[j].classList.add('win');
            })
        
        // diagonals
        } else if(status[2]==='dia'){
            i = status[1]===1? i=[0, 4, 8]: i=[2, 4, 6];
            i.forEach(j => {
                tiles[j].classList.add('win');
            })
        }
    };


    //check the current status of board and then give feedback if the game is over
    function checkStatus(){

        let status = GameBoard.CheckWin()
        const window = document.querySelector('.congrats');
        const message = document.querySelector('.message');
        
        if (status === undefined){
            
        } else {
            
            if (status[0] === 'draw'){
                window.style.display = "block";
                message.textContent = 'Game over, its a draw!'
                Game.isRunning = false;
                Game.colorWin();
    
            } else if(status[0] === player1.side) {
                window.style.display = "block";
                message.textContent = 'Game over, player1 won!'
                Game.isRunning = false;
                Game.colorWin();
    
            } else if(status[0] === player2.side) {
                window.style.display = "block";
                message.textContent = `Game over, ${player2.type} won!`
                Game.isRunning = false;
                Game.colorWin();
            };
            
        }
    };

    return {renderNew, renderBoard, checkStatus, isRunning, colorWin}
})()

Game.renderBoard()

function playRoundBot(e){
    
    let col = parseInt(Array(e.target.id.split(" "))[0][0])
    let row = parseInt(Array(e.target.id.split(" "))[0][1])
    
    if(!isNaN(row) && Game.isRunning){
        activePlayer = player1
        GameBoard.modify(activePlayer.side, col, row)
        Game.renderNew(col, row)
        Game.checkStatus()
        activePlayer = player2

    if(Game.isRunning){
        col = mixmax()[0];
        row = mixmax()[1];
        GameBoard.modify(activePlayer.side, col, row)
        Game.renderNew(col, row)
        Game.checkStatus()
        activePlayer = player1;
        } 
    }
    
};

function playRoundHuman(e){
    let col = parseInt(Array(e.target.id.split(" "))[0][0])
    let row = parseInt(Array(e.target.id.split(" "))[0][1])

    GameBoard.modify(activePlayer.side, col, row)
    Game.renderNew(col, row)
    Game.checkStatus()
    activePlayer = activePlayer.side==='X'? activePlayer=player2: activePlayer=player1;
}

// we get the divs what are clicked
function loadTiles(){
    
    const tiles = document.querySelectorAll('.tile');
    
    tiles.forEach(tile=> {
        tile.addEventListener('click', e => {
            if(option.textContent==='bot'){
                playRoundBot(e);
            } else {
                playRoundHuman(e);
            }
            
        });
    })
};

loadTiles()


// reset button
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => GameBoard.clear());