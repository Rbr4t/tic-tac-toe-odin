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

    
    

    
    return {showBoard, board, modify}
}

)()

// Player object
const Player = (XO) => {
    const side = XO;
    const whichSide = () => console.log(XO);
    return {whichSide, side}
}

GameBoard.showBoard()

const player1 = Player("X")
const player2 = Player("O")
let activePlayer = player1;



// Game controller object
const Game = (function(){
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

    return {renderNew, renderBoard}
})()

Game.renderBoard()

function playRound(e){
    let col = parseInt(Array(e.target.id.split(" "))[0][0])
    let row = parseInt(Array(e.target.id.split(" "))[0][1])
    console.log(activePlayer.side)

    if(!isNaN(row) && !isNaN(col)){
        GameBoard.modify(activePlayer.side, col, row)
        Game.renderNew(col, row)

        if (activePlayer === player1){
            activePlayer = player2
        } else {
            activePlayer = player1
        }
        
        console.log(GameBoard.board)
    }
};

// we get the divs what are clicked
const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile=> {
    tile.addEventListener('click', e => playRound(e));
})