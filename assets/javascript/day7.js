var rows = 3;
var columns = 3;

var currentTile; // clicked tile
var targetTile; // white tile

var imageOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

window.onload = function() {
    for (let r=0; r<rows; r++) {
        for (let c=0; c<columns; c++) {

            let tile = document.createElement("img"); // create an image tag
            tile.id = r.toString() + "-" + c.toString(); // create id for tile with row and column
            tile.src = "/assets/puzzle-images/" + imageOrder.shift() + ".jpg" // run through the image files

            // Moving tiles
            tile.addEventListener("dragstart", dragStart); // click on tile to drag
            tile.addEventListener("dragover", dragOver); // drag clicked tiled
            tile.addEventListener("dragenter", dragEnter); // dragging clicked tile into another tile
            tile.addEventListener("dragleave", dragLeave); // dragged tile leaving another tile
            tile.addEventListener("drop", dragDrop); // dragged tile dropped on another tile
            tile.addEventListener("dragend", dragEnd); // swap two tiles after drag drop

            document.getElementById("board").append(tile);

        }
    }
}

function dragStart() {
    currentTile = this; // This is the tile being moved
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {

}

function dragDrop() {
    targetTile = this; // This is the tile being dropped on
}

function dragEnd() {
    if (!targetTile.src.includes("7.jpg")) {
        return;
    } // check if the tiles can only be moved into the white tile.

    let currentCoords = currentTile.id.split("-");
    let r = parseInt(currentCoords[0]); // row of current tile
    let c = parseInt(currentCoords[1]); // column of current tile

    let targetCoords = targetTile.id.split("-");
    let r1 = parseInt(targetCoords[0]); // row of target tile
    let c1 = parseInt(targetCoords[1]); // column of target tile

    let moveRight = r == r1 && c1 == c+1; // adjacent to right 
    let moveLeft = r == r1 && c1 == c-1; // adjacent to left

    let moveUp = c == c1 && r1 == r-1; // adjacent to above
    let moveDown = c == c1 && r1 == r+1; // adjacent to below

    let isAdjacent = moveRight || moveLeft || moveUp || moveDown; // check if adjacent

    if (isAdjacent){
        let currentImage = currentTile.src;
        let targetImage = targetTile.src;

        currentTile.src = targetImage;
        targetTile.src = currentImage;
    }
}