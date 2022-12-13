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

let canvas = document.querySelector("#tetris");
let ctx = canvas.getContext("2d");
ctx.scale(30, 30);

let pieceObj = generateRandomPiece();
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

renderPiece();

function renderPiece() {
    let piece = pieceObj.piece;
    for (let i = 0; i < piece.length; ++i) {
        for (let j = 0; j < piece[i].length; ++j) {
            if (piece[i][j] == 1) {
                ctx.fillStyele = COLORS[pieceObj.colorIndex]
                ctx.fillRect(pieceObj.x + j, i, 1, 1);
            }
        }
    }
}

function moveDown() {

}