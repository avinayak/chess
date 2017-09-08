import React, { Component } from 'react';
var Chess = require('./chess.js').Chess;
var stockfish = new Worker('./stockfish.js');

class ChessBoard extends Component {

    constructor(props) {
        super(props);
        
        var chess = new Chess();
        this.state = { board: chess.fen(), selectMode: false };
        
        //let board = fenToBoard(chess.fen());
        //console.log(board);
    }

    nextState(cellCode) {
        var chess = new Chess(this.state.board);
        if (this.state.selectMode) {
            //this.setState({ to:cellCode });
            this.state.to = cellCode;
            
            var legatTos = chess.moves({ square: this.state.from, verbose: true }).map((move) => { return move.to });
            if (legatTos.includes(cellCode)) {
                
                chess.move({ from: this.state.from, to: cellCode });
                //-----------------PUT AI HERE-------------------------------
                var moves = chess.moves();
                var move = moves[Math.floor(Math.random() * moves.length)];
                //-----------------PUT AI HERE-------------------------------
                chess.move(move);

                if(chess.game_over())
                    alert("Game Over!");

                this.setState({ board: chess.fen() });
            }
            this.state.to = '';
            this.state.from = '';
            this.setState({ selectMode: false });

            var cells = document.getElementsByClassName("cell");
            for(var i=0;i<cells.length;i++){
                cells[i].classList=['cell'];
            }

        } else {
            this.setState({ from: cellCode })
            this.setState({ selectMode: true })
            var selectedCell = document.getElementById("cell-"+cellCode);
            selectedCell.classList.add("selected");
            var legatTos = chess.moves({ square: cellCode, verbose: true }).map((move) => { return move.to });
            for(var i=0;i<legatTos.length;i++){
                document.getElementById("cell-"+legatTos[i]).classList.add("legalnext");
            }
        }


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