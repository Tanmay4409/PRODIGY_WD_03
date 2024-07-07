let boxes = document.querySelectorAll(".box");
let buttons = document.querySelectorAll(".reset");
let hide = document.querySelector("#hide");
let msg = document.querySelector("#msg");
let modeSelection = document.querySelector("#modeSelection");
let userVsUserButton = document.querySelector("#userVsUser");
let userVsBotButton = document.querySelector("#userVsBot");

let winning_possibility = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];

let turnO = true;
let vsBot = false;

const showWinnner = (winner) => {
    hide.setAttribute("id", "visible");
    msg.innerText = `Congratulations player "${winner}" won the game!!`;
}

function checkWin() {
    winning_possibility.forEach((win) => {
        let pos1 = boxes[win[0]].innerText;
        let pos2 = boxes[win[1]].innerText;
        let pos3 = boxes[win[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (boxes[win[0]].innerText == boxes[win[1]].innerText && boxes[win[1]].innerText == boxes[win[2]].innerText) {
                console.log("Winner is ", pos1);
                showWinnner(pos1);
            }
        }
    });
}

function botMove() {
    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") emptyBoxes.push(index);
    });

    if (emptyBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        boxes[emptyBoxes[randomIndex]].innerText = "X";
        boxes[emptyBoxes[randomIndex]].disabled = true;
        turnO = true;
        checkWin();
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            box.disabled = true;
            checkWin();
            if (vsBot && !turnO) {
                setTimeout(botMove, 500); // Bot moves after a short delay
            }
        } else if (!vsBot) {
            box.innerText = "X";
            turnO = true;
            box.disabled = true;
            checkWin();
        }
    });
});

buttons.forEach((reset) => {
    reset.addEventListener("click", () => {
        boxes.forEach((box) => {
            box.innerText = "";
            box.disabled = false;
        });
        hide.setAttribute("id", "hide");
    });
});

userVsUserButton.addEventListener("click", () => {
    vsBot = false;
    modeSelection.style.display = "none";
});

userVsBotButton.addEventListener("click", () => {
    vsBot = true;
    modeSelection.style.display = "none";
});
