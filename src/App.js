import React, { Component } from 'react';

import CountDownTimer from './timer/CountDownTimer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CountDownTimer />
      </div>
    );
  }
}

export default App;
