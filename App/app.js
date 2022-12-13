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

let grid = generateGrid();
let score = 0;

let canvas = document.querySelector("#tetris");
let ctx = canvas.getContext("2d");
ctx.scale(30, 30);

let pieceObj = null;

setInterval(newGameState, 500);

console.log(pieceObj);

function newGameState() {
    if (pieceObj == null) {
        pieceObj = generateRandomPiece();
        renderPiece();
    }
    moveDown();
}

function generateRandomPiece() {
    let ran = Math.floor(Math.random() * 7);
    // console.log(SHAPES[ran]);
    let piece = SHAPES[ran];
    let colorIndex = ran + 1;
    let x = 4;
    let y = 0;
    return { piece, colorIndex, x, y };
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
    if (!collision(pieceObj.x, pieceObj.y + 1))
        pieceObj.y += 1;
    else {
        for (let i = 0; i < pieceObj.piece.length; ++i) {
            for (let j = 0; j < pieceObj.piece[i].length; ++j) {
                if (pieceObj.piece[i][j] == 1) {
                    let p = pieceObj.x + j;
                    let q = pieceObj.y + i;
                    grid[q][p] = pieceObj.colorIndex;
                }
            }
        }
        if (pieceObj.y == 0) {
            alert("Game Over");
            grid = generateGrid();
        }
        pieceObj = null;
    }
    renderGrid();
}

function moveLeft() {
    if (!collision(pieceObj.x - 1, pieceObj.y))
        pieceObj.x -= 1;
    renderGrid();
}

function moveRight() {
    if (!collision(pieceObj.x + 1, pieceObj.y))
        pieceObj.x += 1;
    renderGrid();
}

function rotate() {
    let rotatedPiece = [];
    let piece = pieceObj.piece;
    for (let i = 0; i < piece.length; ++i) {
        rotatedPiece.push([]);
        for (let j = 0; j < piece[i].length; ++j) {
            rotatedPiece[i].push(0);
        }
    }

    // take transpose

    for (let i = 0; i < piece.length; ++i) {
        for (let j = 0; j < piece.length; ++j) {
            rotatedPiece[i][j] = piece[j][i];
        }
    }

    // revers every row;

    for (let i = 0; i < rotatedPiece.length; ++i)
        rotatedPiece[i] = rotatedPiece[i].reverse();

    if (!collision(pieceObj.x, pieceObj.y, rotatedPiece))
        pieceObj = rotatedPiece;
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
                    if (grid[q][p] > 0)
                        return true;
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