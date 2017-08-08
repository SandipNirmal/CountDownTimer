import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App';
import './index.css';
import './App.css';

render((

  // Use BrowserRouter for dyanamic servers

  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>

  // Use HashRouter for static servers
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('root'));