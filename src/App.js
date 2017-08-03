import React, { Component } from 'react';

import CountDownTimer from './timer/CountDownTimer';
import './App.css';

class App extends Component {
  render() {
    return (
    <div>
       <header className="header">
        <div className="logo">
        Timer
        </div>
        <div className="menu">
          Settings
        </div>
      </header>

      <div className="App">
        <CountDownTimer />
      </div>
    </div>
    );
  }
}

export default App;
