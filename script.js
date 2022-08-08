const GameBoard = (function(){
    let board = [
                 ["X", null, "X"],
                 [null, "O", null],
                 [null, null, null]
                ];
    const showBoard = () => console.log(board);

    return {showBoard, board}
}

)()

const GameController = (function(){
    const display =  document.querySelector('.board');
    function render(board){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){

                const div = document.createElement('div');
                

                if (board[i][j] == "X"){
                    const X = document.createElement('p')
                    X.textContent = "X"
                    div.appendChild(X)
                } else if (board[i][j]=="O"){
                    const O = document.createElement('p')
                    O.textContent = "O"
                    div.appendChild(O)
                }
                display.appendChild(div);
            }
        }
    };
    return {render}
})()

const Player = (XO) => {
    const whichSide = () => console.log(XO);

    return {whichSide}

}


GameController.render(GameBoard.board)

GameBoard.showBoard()

let player1 = Player("X")
let player2 = Player("O")

player1.whichSide()
player2.whichSide()