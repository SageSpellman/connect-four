/*----- constants -----*/
const COLOR_LOOKUP = {
    "1": "purple",
    "-1": "orange",
    "null": "white"
};

/*----- state variables -----*/
let board;
let winner;
let turn;

/*----- cached elements  -----*/
const messageEl = document.querySelector("h1");
const playAgainBtn = document.querySelector("button");
const markerEls = Array.from(document.querySelectorAll("#markers > div"));

/*----- event listeners -----*/
playAgainBtn.addEventListener("click", init);
document.getElementById("markers").addEventListener("click", handleDrop);

/*----- functions -----*/
init();

function init() {
    board = [
        [null, null, null, null, null, null], // col 0
        [null, null, null, null, null, null], // col 1
        [null, null, null, null, null, null], // col 2
        [null, null, null, null, null, null], // col 3
        [null, null, null, null, null, null], // col 4
        [null, null, null, null, null, null], // col 5
        [null, null, null, null, null, null], // col 6
    ];

    winner = null; // null represents no winner no tie; game in progress.
    turn = 1; // Purple or "Player 1" will be the first player to go

    render(); // transfer the intial state to the DOM
}

function handleDrop(evt){
    const colIdx = markerEls.indexOf(evt.target);
 if(colIdx === -1) return;
 const colArr = board[colIdx];
 const rowIdx = colArr.indexOf(null);
 colArr[rowIdx] = turn;
 winner = checkWinner(colIdx, rowIdx)
 turn *= -1;
 render();
}

function checkWinner(colIdx, rowIdx) {

}

function render() {
    renderBoard(); // transfer state "data" from the board 2d array to the brower's dom
    renderMessage(); // display who's turn or who won based on turn or winner state
    renderControls(); // show/hide game controls based on win state
}

function renderControls() {
    playAgainBtn.style.visibility = winner ? "visible" : "hidden";
    markerEls.forEach(function(markerEl, idx) {
        const hideMarker = !board[idx].includes(null) 
        markerEl.style.visibility = hideMarker ? "hidden" :"visible"
    });
}

function renderMessage() {
    if(winner === "T") {
        // Display tie game!
        messageEl.innerText = "Tie Game!";
    } else if(winner) {
        // Display who won
        messageEl.innerHTML = `<span style="color: ${COLOR_LOOKUP[winner]}">${COLOR_LOOKUP[winner]}</span> Wins!`;
    } else {
        // Display the turn
        messageEl.innerHTML = `<span style="color: ${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn]}'s</span> Turn`;
    }
}

function renderBoard() {
    // loop over the board array
    board.forEach(function(colArray, colIdx) {
        // for each column array inside the board array
        colArray.forEach(function(cellValue, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            // we'll evalute each cell value and use that value to set the background color
            // of the each corresponding cell div in the dom
            cellEl.style.backgroundColor = COLOR_LOOKUP[cellValue];
        });
    });
}