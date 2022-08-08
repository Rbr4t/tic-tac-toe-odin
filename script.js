const GameBoard = (function(){
    let board = [
                 [null, null, null],
                 [null, null, null],
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