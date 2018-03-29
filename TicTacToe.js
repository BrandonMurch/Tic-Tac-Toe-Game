/*
@description - A game of Tic Tac Toe with a computer.
@input - based solely on clicking the GUI to pick your square.
@author - Brandon - Brandon.Murch@protonmail.com
*/
let arraySq = [], // array to hold the markings for each square
    corners = [0,2,8,6],
    edges = [7,3,1,5],
    player = {
      icon : "X",
      computer : "O",
      turnCounter : 0,
      turn : false, // true means it's the players turn
      turnDefault : false,
      gameOver : false // end of the game, stopping any more commands
  },
  combos = [ // winning combinations
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
  ];

const clickSquare = (num, icon) =>{
   arraySq[num] = icon;
   document.getElementsByClassName("gameboard__icon--" + num)[0]
      .innerHTML = icon;
   $(".gameboard__icon--" + num).css('opacity', 1);
   player.turnCounter++;
 };

              // Resets the board
const startGame = () => {
  arraySq = [null, null, null, null, null, null, null, null, null];
  player.turnCounter = 0;
  player.turn = player.turnDefault;
  for (i=0;i<9;i++){
    $(".gameboard__icon--" + i).css('opacity', 0);
  }
  player.gameOver = false;
              // If the computer is X, then it goes first.
  if (player.turnCounter == 0 && player.icon == "O") computerMove(6);
};

const endingMessage = (message) => {
  alert("You " + message);
  player.gameOver = true;
  startGame();
};
                /*
                Checks the plays that have been made against the winning combos.
                First loop is for the different combinations.
                Second loop is to go through each number in those combinations
                  to see if those squares have been played.
                The counter in this second loop decreases if the square has
                  the marking we're looking for e.g X in a box while we're searching
                  for X.
                The counter increases if the other marking is found e.g O in a
                  box while we're searching for X.
                If the counter is 0, that means there is three in a row and
                  someone has won.
                If the counter is 1, that means there is a chance for someone
                  to win. If the third square is empty, the computer will play
                  there.
                */
const checkCombos = (marking, opposition) => {
  let counter;
  for (i = 0; i<combos.length-1; i++){
    counter = 3;
    for(j=0; j<combos[i].length; j++){
      if (arraySq[combos[i][j]] == marking) counter--;
      else if (arraySq[combos[i][j]] == opposition) counter++;
      else if ((counter >= 3 && j==1) || counter > 3) break;
      if (counter == 0 && player.icon == marking) {
        endingMessage("Win!");
        break;
      }else if (counter == 0 && player.icon != marking) {
        endingMessage("Lose!");
        break;
      }else if (counter == 1){
        for (k = 0; k <combos[i].length; k++){
          if (arraySq[combos[i][k]] == null){
            computerMove(combos[i][k]);
            break;
          }
        }
      }
    }
  }
};


const checkWin = (num) => {
  checkCombos(player.computer,player.icon);
  checkCombos(player.icon,player.computer);
  if (player.turnCounter == 9) endingMessage("Tie!");
};

const computerMove = (num) => {
  if (arraySq[num] == null && player.turn == false) {
    clickSquare(num, player.computer);
    player.turn = true;
    checkWin();
  }
};

const firstMoveO = () => {
  computerMove(arraySq[4] == "X" ? 6 : 4);
};
                // checks whether the tile diagonally across is taken, then plays there.
const secondMoveO = () => {
  corners.forEach((num, idx) => {
    if (arraySq[num] == "X"){
      if (arraySq[edges[idx]] == "X"){
        computerMove(idx == 0 ? edges[3] : edges[idx-1])
      } else computerMove(edges[idx]);
    }
  });
  randomMove();
};

const secondMoveX = () => {
  computerMove(arraySq[2] != null ? 0 : 2)
}

const thirdMoveX = () => {
  computerMove(arraySq[8] != null ? 3 : 8)
}

const randomMove = () => { // This play doesn't matter, play first unoccupied.
  for(i = 0; i <arraySq.length; i++){
    if (arraySq[i] == null){
      computerMove(i);
      break;
    }
  }
};

const playerMove = (num) => {
  if (arraySq[num] == null) {
    player.turn = false;
    clickSquare(num, player.icon);
    checkWin();
    if (!player.gameOver){
      switch (player.turnCounter){ // decides which computer play to make
        case 1:
          firstMoveO();
          break;
        case 2:
          secondMoveX();
          break;
        case 3:
          secondMoveO();
          break;
        case 4:
          thirdMoveX();
          break;
        default:
          randomMove();
      }
    }
  }
};
                // all the boxes you can click, and the selection screen.
$(document).ready(function() {
  $(document).on("click",".playerSelect__icon--o",function(){
    player.icon = "O";
    player.computer = "X";
    player.turnDefault = false;
    $(".container__playerSelect").css('z-index', '-50');
    $(".gameboard").css('z-index', '50');
    startGame();
  });
  $(document).on("click",".playerSelect__icon--x",function(){
    player.icon = "X";
    player.computer = "O";
    player.turnDefault = true;
    $(".container__playerSelect").css('z-index', '-50');
    $(".gameboard").css('z-index', '50');
    startGame();
  });
  $(document).on("click",".gameboard__box--0",function(){
    playerMove(0);
  });
  $(document).on("click",".gameboard__box--1",function(){
    playerMove(1);
  });
  $(document).on("click",".gameboard__box--2",function(){
    playerMove(2);
  });
  $(document).on("click",".gameboard__box--3",function(){
    playerMove(3);
  });
  $(document).on("click",".gameboard__box--4",function(){
    playerMove(4);
  });
  $(document).on("click",".gameboard__box--5",function(){
    playerMove(5);
  });
  $(document).on("click",".gameboard__box--6",function(){
    playerMove(6);
  });
  $(document).on("click",".gameboard__box--7",function(){
    playerMove(7);
  });
  $(document).on("click",".gameboard__box--8",function(){
    playerMove(8);
  });
});
