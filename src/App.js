import './App.css';

import './css/bootstrap.min.css';
import ChessBoard from './ChessBoard.js';
import React, { Component } from 'react';
let stockfish = require('./stockfish.js');

class App extends Component {
  render() {
    return (
      <div className="App container">
        <h1>Chess</h1>
        <ChessBoard/>
      </div>
    );
  }
}

export default App;
