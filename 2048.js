let gameboard;
let score = 0;
let rows = 4;
let columns = 4;

window.onload = function() {
    gameStart();
}

function gameStart() {
  
    gameboard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div"); //creates new tiles
            tile.id = r.toString() + "-" + c.toString(); //sets coordinate locator for tile in array
            let coord = gameboard[r][c];// get tile coordinate #
            updateTile(tile, coord);
            document.getElementById("gameboard").append(tile);
        }
    }
    tileTwo();
    tileTwo();
}

function tileTwo() {
if (!emptyTiles()) {
    alert ("Game Over!");
    return;
}

    let found = false;
    while (!found){
        let r = Math.floor(Math.random()*rows);
        let c = Math.floor(Math.random()*columns);

        if (gameboard[r][c] == 0){
            gameboard[r][c] = 2;
            let tile = document.getElementById(r.toString()+ "-" + c.toString());
            tile.innerText ="2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function emptyTiles() {
    let count = 0
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (gameboard [r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function updateTile(tile, coord) {
    tile.innerText = "";
    tile.classList.value = ""; //clear tile holding value to updated value
    tile.classList.add("tile");
    if (coord >0) {
        tile.innerText = coord.toString();
        if (coord <= 1024) {
            tile.classList.add("x"+coord.toString());
        } else {
            tile.classList.add("x2048");
        }
    }
}

document.addEventListener('keyup', (key) => {
    if (key.code == "ArrowLeft") {
        slideLeft();
        tileTwo();
    } 
    else if (key.code == "ArrowRight") {
        slideRight();
        tileTwo();
    }
    else if (key.code == "ArrowUp") {
        slideUp();
        tileTwo();
    }
    else if (key.code == "ArrowDown") {
        slideDown(); 
        tileTwo();
    }   
    document.getElementById("score").innerText = score;
})

function filterZero(row) {
    return row.filter(coord => coord != 0);
}

function slide(row) {
    row = filterZero(row);

    for (let i =0; i <row.length-1; i++) {
        if (row [i] == row [i+1]) {
            row [i] *=2;
            row [i+1] = 0;
            score += row[i];

        }
    }
    row = filterZero(row);
    while (row.length < columns ) {
        row.push(0);
    }
    return row;
}

function slideLeft () {
    for (let r = 0; r < rows; r++) {
        let row = gameboard[r];
        row = slide(row);
        gameboard[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString()+ "-" + c.toString());
            let coord = gameboard[r][c];
            updateTile(tile, coord);
        }
    }
}

function slideRight () {
    for (let r = 0; r < rows; r++) {
        let row = gameboard[r];
        row.reverse();
        row = slide(row);
        gameboard[r] = row.reverse();

        for (let c = 0; c <columns; c++) {
            let tile = document.getElementById(r.toString()+ "-" + c.toString());
            let coord = gameboard[r][c];
            updateTile(tile,coord);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [gameboard[0][c],gameboard[1][c], gameboard[2][c], gameboard [3][c]];
        row = slide(row);

        for (let r = 0; r <rows; r++) {
            gameboard[r][c] = row [r];
            let tile = document.getElementById(r.toString()+ "-" + c.toString());
            let coord = gameboard[r][c];
            updateTile(tile,coord);
        }
    }
}


function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [gameboard[0][c],gameboard[1][c], gameboard[2][c], gameboard [3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r <rows; r++) {
            gameboard[r][c] = row [r];
            let tile = document.getElementById(r.toString()+ "-" + c.toString());
            let coord = gameboard[r][c];
            updateTile(tile,coord);
        }
    }
}

