import React, { Component } from 'react';
import {fenToBoard} from './Fen.js';
var Chess = require('./chess.js').Chess;
let sf = null;

function showThinkingBar(value){
    document.getElementById('thinking-bar').style.height="2px"
    document.getElementById('thinking-bar').style.opacity=value?"1":"0";
}

class ChessBoard extends Component {

    constructor(props) {
        super(props);
        var chess = new Chess();
        this.state = { selectMode: false, userColor: 'w' };
        if (this.state.userColor === 'b') {
            // make AI do the first move
            var moves = chess.moves();
            var move = moves[Math.floor(Math.random() * moves.length)];
            chess.move(move);
            this.props.onMove(chess.fen())
        }
        
    }

    refreshBoard(board) {
        for (var row = 0; row < board.length; row++) {
            for (var col = 0; col < board[row].length; col++) {
                if (board[row][col] != null)
                    if (board[row][col].color === this.state.userColor) {
                        var cellId = "cell-" + (String.fromCharCode(97 + col)) + (-1 * (row - 8));
                        document.getElementById(cellId).classList.add("selectable");
                    }
            }
        }
        
    }

    componentDidMount() {
        var chess = new Chess(this.props.board);
        var cells = document.getElementsByClassName("cell");
        var board = chess.board();
        this.refreshBoard(board)
        this.forceUpdate();
    }

    nextState(cellCode) {
        var chess = new Chess(this.props.board);
        if(sf==null){
            sf = eval('stockfish');
            sf.onmessage = (event) => { 
                let message = event.data ? event.data : event;
                console.log(message);
                if(message.startsWith("bestmove")){
                    
                    showThinkingBar(false);
                    chess = new Chess(this.props.board);
                    var move = message.split(" ")[1];
                    var moveResult = chess.move(move, {sloppy: true});
                    
                    if(moveResult.flags.indexOf('c')!=-1){
                        document.getElementById(`cell-${move.substr(0,2)}`).classList.add('ai-bloody-footprint-in-sand');
                        document.getElementById(`cell-${move.substr(2,4)}`).classList.add('ai-bloody-footprint-in-sand');
                    }else{
                        document.getElementById(`cell-${move.substr(0,2)}`).classList.add('ai-footprint-in-sand');
                        document.getElementById(`cell-${move.substr(2,4)}`).classList.add('ai-footprint-in-sand');
                    }
                    this.props.onMove(chess.fen())
                    if(!(chess.turn()===this.state.userColor)){
                        sf.postMessage("position fen "+chess.fen())
                        sf.postMessage(`go depth ${this.props.intelligenceLevel}`)
                    }
                    if (chess.game_over())
                        alert("Game Over!");
                }
                
            }
        }
        
        
        if (this.state.selectMode) {
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
                
                    showThinkingBar(true);
                //-----------------PUT AI HERE-------------------------------
                // var moves = chess.moves();
                // var move = moves[Math.floor(Math.random() * moves.length)];
                // chess.move(move);
                // showThinkingBar(false);
                sf.postMessage(`position fen ${chess.fen()}`)
                sf.postMessage(`go depth ${this.props.intelligenceLevel}`)
                //-----------------PUT AI HERE-------------------------------
                this.props.onMove(chess.fen())
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
    }

    


    render() {
        let renderableBoard = fenToBoard(this.props.board);
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