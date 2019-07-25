import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/home/index.tsx';
import Coach from '../pages/coach/index.tsx';
import Worry from '../pages/wrong/index.tsx';
import Work from '../pages/work/index.tsx';
// import MainMenu from '../components/menu';

const MainRouter = () => (
  <main>
    <Switch>
      <Route exact path='/teacher/home' component={Home}/>
      <Route path='/teacher/coach/:number' component={Coach}/>
      <Route path='/teacher/wrong' component={Worry}/>
      <Route path='/teacher/work' component={Work}/>
    </Switch>
  </main>
);

export default MainRouter;
