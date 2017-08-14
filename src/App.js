import React, { Component } from 'react';

import Header from './Header/Header';
import Main from './main';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="align-center">
      <Header />
      <Main />
      </div>
    );
  }
}

export default App;
