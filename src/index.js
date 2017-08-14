import React from 'react'
import { render } from 'react-dom'
// eslint-disable-next-line
import { BrowserRouter, HashRouter } from 'react-router-dom'

import App from './App';
import './index.css';

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