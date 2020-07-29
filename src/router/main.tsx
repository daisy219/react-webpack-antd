import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@/pages/home/index';
import Questions from '@/pages/questions/index';
import Tips from '@/pages/tips/index';

const MainRouter = () => (
  <main>
    <Switch>
      <Route exact path='/main/home' component={Home}/>
      <Route path='/main/questions' component={Questions}/>
      <Route path='/main/tips' component={Tips}/>
    </Switch>
  </main>
);

export default MainRouter;
