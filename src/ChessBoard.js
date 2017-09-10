import React, { Component } from 'react';
var Chess = require('./chess.js').Chess;
//let stockfish = require('./stockfish.js');

class ChessBoard extends Component {

    constructor(props) {
        super(props);
        var chess = new Chess();
        this.state = { board: chess.fen(), selectMode: false, userColor: 'b' };
        if (this.state.userColor === 'b') {
            // make AI do the first move
            var moves = chess.moves();
            var move = moves[Math.floor(Math.random() * moves.length)];
            chess.move(move);
            this.state.board = chess.fen(); 
            
        }
        
        
    }

    refreshBoard(board) {
        for (var row = 0; row < board.length; row++) {
            for (var col = 0; col < board[row].length; col++) {
                if (board[row][col] != null)
                    if (board[row][col].color === this.state.userColor) {
                        var cellId = "cell-" + (String.fromCharCode(97 + col)) + (-1 * (row - 8));
                        if (document.getElementById(cellId) == null)
                            debugger;
                        document.getElementById(cellId).classList.add("selectable");
                    }
            }
        }
        
    }

    componentDidMount() {
        var chess = new Chess(this.state.board);
        var cells = document.getElementsByClassName("cell");
        var board = chess.board();
        this.refreshBoard(board)
        this.forceUpdate();
    }

    nextState(cellCode) {
        var chess = new Chess(this.state.board);

        if (this.state.selectMode) {
            //this.setState({ to:cellCode });
            this.state.to = cellCode;

            var legatTos = chess.moves({ square: this.state.from, verbose: true }).map((move) => { return move.to });
            var pieceToBeMoved = chess.get(this.state.from);
            if (legatTos.includes(cellCode)) {
                // Check and perform a pawn promotion
                if ((cellCode[1] === '8' && this.state.userColor === 'w' && pieceToBeMoved.type === 'p' && pieceToBeMoved.color === this.state.userColor)
                    || (cellCode[1] === '1' && this.state.userColor === 'b' && pieceToBeMoved.type === 'p' && pieceToBeMoved.color === this.state.userColor))
                    chess.move({ from: this.state.from, to: cellCode, promotion: 'q' });
                else
                    chess.move({ from: this.state.from, to: cellCode }); // if not a promotion, be normal
                //-----------------PUT AI HERE-------------------------------
                var moves = chess.moves();
                var move = moves[Math.floor(Math.random() * moves.length)];
                //-----------------PUT AI HERE-------------------------------
                var k = chess.move(move);
                if (chess.game_over())
                    alert("Game Over!");

                this.setState({ board: chess.fen() });
            }
            this.state.to = '';
            this.state.from = '';
            this.setState({ selectMode: false });

            var cells = document.getElementsByClassName("cell");
            for (var i = 0; i < cells.length; i++) {
                cells[i].classList = ['cell'];
            }

        } else {

            var selectableCells = Array.from(document.getElementsByClassName("selectable")).map((cellNode) => { return cellNode.id.split("-")[1] })
            if (selectableCells.includes(cellCode)) {
                this.setState({ from: cellCode })
                this.setState({ selectMode: true })
                var selectedCell = document.getElementById("cell-" + cellCode);
                selectedCell.classList.add("selected");
                var legatTos = chess.moves({ square: cellCode, verbose: true }).map((move) => { return move.to });
                for (var i = 0; i < legatTos.length; i++) {
                    document.getElementById("cell-" + legatTos[i]).classList.add("legalnext");
                }
            }
        }
        this.refreshBoard(chess.board());

        //alert(cellCode)
    }

    fenToBoard(fen) {
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
                    finalRow += "Z";
                else
                    finalRow += "+";
            } else {
                let _cell = map[tempRow[i]];
                if (i % 2 == rowToggle ? 1 : 0)
                    _cell = _cell.toLowerCase();
                finalRow += _cell;
            }
        }
        return finalRow;
    }


    render() {
        let renderableBoard = this.fenToBoard(this.state.board);
        var row = [];

        for (var i = 0; i < renderableBoard.length; i++) {
            if (i % 8 == 0 && i != 0) {
                row.push(<p className="seperator" />);
            }
            let _cellCode = String.fromCharCode(97 + i % 8) + String.fromCharCode(57 - (i + 1) / 8);
            row.push(<Cell cellCode={_cellCode} onClick={(cellCode) => { this.nextState(cellCode) }} piece={renderableBoard[i]} />)

        }

        return (
            <div className="chess-board">
                {row}
            </div>
        );
    }
}


class Cell extends Component {
    constructor(props) {
        super(props);
    }

    onCellClick() {
        alert("hello");
    }
    render() {
        return (<span id={"cell-" + this.props.cellCode} onClick={() => { this.props.onClick(this.props.cellCode) }} className="cell">{this.props.piece}</span>)
    }
}

export default ChessBoard