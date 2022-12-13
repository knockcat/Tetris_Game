const SHAPES = [
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]

    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]

    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],

    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],

    ],

    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],

    ],

    [
        [1, 1],
        [1, 1]
    ]
]

const COLORS = [
    "#fff",
    "#9b5fe0",
    "#16a4d8",
    "#60dbe8",
    "#8bd346",
    "#efdf48",
    "#f9a52c",
    "#d64e12"
]

const ROWS = 20;
const COLS = 10;
let score = 0;

let canvas = document.querySelector("#tetris");
let ctx = canvas.getContext("2d");
ctx.scale(30, 30);

let pieceObj = null;

console.log(pieceObj);

function generateRandomPiece() {
    let ran = Math.floor(Math.random() * 7);
    // console.log(SHAPES[ran]);
    let piece = SHAPES[ran];
    let colorIndex = ran + 1;
    let x = 4;
    let y = 0;
    return { piece, x, y, colorIndex };
}

setInterval(newGameState, 500);

function newGameState() {
    if (pieceObj == null) {
        pieceObj = generateRandomPiece();
        renderPiece();
    }
    moveDown();
}

function renderPiece() {
    let piece = pieceObj.piece;
    for (let i = 0; i < piece.length; ++i) {
        for (let j = 0; j < piece[i].length; ++j) {
            if (piece[i][j] == 1) {
                ctx.fillStyele = COLORS[pieceObj.colorIndex]
                ctx.fillRect(pieceObj.x + j, pieceObj.y + i, 1, 1);
            }
        }
    }
}

function moveDown() {
    pieceObj.y += 1;
    renderGrid();
}

function moveLeft() {
    pieceObj.x -= 1;
    renderGrid();
}

function moveRight() {
    pieceObj.x += 1;
    renderGrid();
}

function collision(x, y) {
    let piece = pieceObj.piece;
    for (let i = 0; i < piece.length; ++i) {
        for (let j = 0; j < piece[i].length; ++j) {
            if (piece[i][j] == 1) {
                let p = x + j;
                let q = y + i;
                if (p >= 0 && p < COLS && q >= 0 && q < ROWS) {

                } else {
                    return true;
                }
            }
            return false;
        }
    }
}

function generateGrid() {
    let grid = [];
    for (let i = 0; i < ROWS; ++i) {
        grid.push([]);
        for (let j = 0; j < COLS; ++j) {
            grid[i].push(0);
        }
    }
    return grid;
}

function renderGrid() {
    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid[i].length; ++j) {
            ctx.fillStyle = COLORS[gird[i][j]];
            // filling cell with color white 
            ctx.fillRect(j, i, 1, 1);
        }
    }
    renderPiece();
}

document.addEventListener("keydown", function(e)) {
    let key = e.code();
    if (key == "ArrowDown")
        moveDown();
    else if (key == "ArrowLeft")
        moveLeft();
    else if (key == "ArrowRight")
        moveRight();
    else if (key == "ArrowUp")
        rotate();
}