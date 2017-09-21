import './App.css';
import ChessBoard from './ChessBoard.js';
import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from './Header.js';
import Footer from './Footer.js';
import { WindowResizeListener } from 'react-window-resize-listener'
import Dialog from 'material-ui/Dialog';
import {fenToBoard} from './Fen.js';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
let startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var Chess = require('./chess.js').Chess;
let sf = null;

const chessLight = getMuiTheme({
  palette: {
    primary1Color: 'white',
    textColor: '#333',
  },
  appBar: {
    textColor: '#333',
  },
  slider: {
    trackColor: '#aaa',
    selectionColor: '#333'
  },
});

function resized(w, h) {
  if (w < 700) {
    var elements = document.getElementsByClassName('seperator');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.style.marginTop = ((-31.0 / 200.0) * w + (1443.0 / 200.0)) + "px";
    }
    elements = document.getElementsByClassName('chess-board');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.style.fontSize = ((1.0 / 8.0) * w - (5.0 / 8.0)) + "px";
    }
    element = document.getElementById('graves');
    element.style.marginTop = ((-137.0/300.0) * w + 337.0)+"px";
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boardIndex: 0,
      newGameDiaOpen: false,
      intelligenceDiaOpen: false,
      historicalStates: [startFen],
      intelligenceLevel: localStorage.getItem("intelligenceLevel") ? localStorage.getItem("intelligenceLevel") : "10"
    };

  }
  requestCloseNewGame = () => {
    this.setState({ newGameDiaOpen: false });
  };
  requestOpenNewGame = () => {
    this.setState({ newGameDiaOpen: true })
  }

  getFallenOnes = () => {
    var orig = "tJnWlNjTOoOoOoOoZ+Z+Z+Z++Z+Z+Z+ZZ+Z+Z+Z++Z+Z+Z+ZpPpPpPpPRhBqKbHr".toLowerCase();
    var curr = fenToBoard(this.state.historicalStates[this.state.boardIndex]).toLowerCase();
    orig = orig.replace(/z/g,"");
    orig = orig.replace(/\+/g,"");
    curr = curr.replace(/z/g,"");
    curr = curr.replace(/\+/g,"");
    orig = orig.split("");
    curr = curr.split("");
    for(let i = 0;i<curr.length;i++){
      if(orig.includes(curr[i]))
        orig.splice(orig.indexOf(curr[i]),1)
    }
    return orig.join("");
  }

  handleChessMove = (fen) => {
    this.state.historicalStates = this.state.historicalStates.slice(0, this.state.boardIndex + 1);
    this.state.historicalStates.push(fen);
    this.setState({ boardIndex: this.state.historicalStates.length - 1, historicalStates: this.state.historicalStates });
    this.getFallenOnes();
  }

  requestCloseIntelligenceDia = () => {
    this.setState({ intelligenceDiaOpen: false });
  };
  requestOpenIntelligenceDia = () => {
    this.setState({ intelligenceDiaOpen: true })
  }
  onChangeIntelligenceLevel = (event, value) => {
    localStorage.setItem("intelligenceLevel", `${value}`)
    this.setState({ intelligenceLevel: `${value}` });
  }
  handleGotoPreviousState = () => {
    if (this.state.boardIndex > 0) {
      this.setState({ boardIndex: this.state.boardIndex - 2 })
    }
  }
  handlePlayForHuman = () => {
    if (sf == null) {
      sf = eval('stockfish');
    }
    sf.postMessage(`position fen ${this.state.historicalStates[this.state.boardIndex]}`)
    sf.postMessage(`go depth ${this.props.intelligenceLevel}`)
    this.state.historicalStates = this.state.historicalStates.slice(0, this.state.boardIndex + 1);
  }
  handleGotoNextState = () => {
    if (this.state.boardIndex < this.state.historicalStates.length - 2) {
      this.setState({ boardIndex: this.state.boardIndex + 2 })
    }
  }
  requestCreateNewGame = () => {
    var chess = new Chess();
    this.setState({ newGameDiaOpen: false, boardIndex: 0, historicalStates: [startFen] })
  }

  render() {
    const newGameActions = [
      <FlatButton label="Cancel" primary={true} style={{ color: '#333' }} onClick={this.requestCloseNewGame} />,
      <FlatButton label="OK" primary={true} style={{ color: '#333' }} onClick={this.requestCreateNewGame} />,
    ];

    const intelligenceActions = [
      <FlatButton label="Cancel" primary={true} style={{ color: '#333' }} onClick={this.requestCloseIntelligenceDia} />,
      <FlatButton label="OK" primary={true} style={{ color: '#333' }} onClick={this.requestCloseIntelligenceDia} />,
    ];

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(chessLight)}>
        <div className="App">
          <Header requestOpenNewGame={this.requestOpenNewGame} requestOpenIntelligenceDia={this.requestOpenIntelligenceDia} />
          <WindowResizeListener onResize={windowSize => { resized(windowSize.windowWidth, windowSize.windowHeight) }} />
          <ChessBoard onMove={this.handleChessMove} intelligenceLevel={this.state.intelligenceLevel} board={this.state.historicalStates[this.state.boardIndex]} />
          <Dialog title="New Game" actions={newGameActions} modal={false} open={this.state.newGameDiaOpen} onRequestClose={this.handleClose} >
            Start a new game?
          </Dialog>
          <Dialog title="Artificial Intelligence Settings" actions={intelligenceActions} modal={false} open={this.state.intelligenceDiaOpen} onRequestClose={this.requestCloseIntelligenceDia} >
            <div className="label">Depth {this.state.intelligenceLevel}</div>
            <Slider step={1} value={this.state.intelligenceLevel} min={1} max={20} defaultValue={this.state.intelligenceLevel} onChange={this.onChangeIntelligenceLevel} />
          </Dialog>
          <Footer fallenOnes={this.getFallenOnes()} playForHuman={this.handlePlayForHuman} gotoPreviousState={this.handleGotoPreviousState} gotoNextState={this.handleGotoNextState} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
