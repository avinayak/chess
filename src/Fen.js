let fenToBoard = (fen) => {
    let tempRow = '';
    let map = { 'b': 'N', 'n': 'J', 'q': 'W', 'p': 'O', 'k': 'L', 'r': 'T', 'B': 'B', 'N': 'H', 'Q': 'Q', 'P': 'P', 'K': 'K', 'R': 'R', '.': ' ' };

    let fenBoard = fen.split(' ')[0].split("/").join("");
    for (let cell = 0; cell < fenBoard.length; cell++) {
        if (!parseInt(fenBoard[cell]))
            tempRow += fenBoard[cell];
        else {
            for (let i = 0; i < parseInt(fenBoard[cell]); i++) {
                tempRow += "."
            }
        }
    }
    let finalRow = '';
    let rowToggle = false;
    for (let i = 0; i < tempRow.length; i++) {

        if (i % 8 == 0)
            rowToggle = !rowToggle;

        if (tempRow[i] === ".") {
            if (i % 2 == rowToggle ? 1 : 0)
                finalRow += "+";
            else
                finalRow += "Z";
        } else {
            let _cell = map[tempRow[i]];
            if (i % 2 == rowToggle ? 0 : 1)
                _cell = _cell.toLowerCase();
            finalRow += _cell;
        }
    }
    return finalRow;
}

export {fenToBoard}