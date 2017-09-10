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
import FlatButton from 'material-ui/FlatButton';


const chessLight = getMuiTheme({
  palette: {
    primary1Color: 'white',
    textColor: '#333'
  },
  appBar: {
    textColor: '#333',
  },
});

function resized(w, h) {
  if (w < 768) {
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
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

  }
  requestCloseNewGame = () => {
    this.setState({ open: false });
  };
  requestOpenNewGame = () => {
    this.setState({ open: true })
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} style={{ color: '#333' }} onClick={this.requestCloseNewGame} />,
      <FlatButton label="OK" primary={true} style={{ color: '#333' }} onClick={this.requestCloseNewGame} />,
    ];

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(chessLight)}>
        <div className="App">
          <Header requestOpenNewGame={this.requestOpenNewGame} />
          <WindowResizeListener onResize={windowSize => { resized(windowSize.windowWidth, windowSize.windowHeight) }} />
          <ChessBoard />
          <Dialog title="New Game" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} >
            Start a new game?
          </Dialog>
          <Footer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
