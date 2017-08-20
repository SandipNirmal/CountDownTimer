import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Settings from './settings/Settings';
import CountDownTimer from './timer/CountDownTimer';

const Main = () => (
  <main className="align-center">
    <Switch>
      <Route exact path='/' component={CountDownTimer}/>
      <Route path='/settings' component={Settings}/>
    </Switch>
  </main>
)

export default Main;
