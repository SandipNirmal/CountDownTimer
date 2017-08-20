import React, { Component } from 'react';

import Header from './Header/Header';
import Main from './main';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="app card">
      <Header />
      <Main />
      </div>
    );
  }
}

export default App;
