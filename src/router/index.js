import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from '../pages/home/index'
import Coach from '../pages/coach/index'
import Worry from '../pages/worry/index'
import Work from '../pages/work/index'
// import MainMenu from '../components/menu';

const MainRouter = () => (
  <main>
    <Switch>
      <Route exact path='/home' component={Home}/>
      <Route path='/coach/:number' component={Coach}/>
      <Route path='/worry' component={Worry}/>
      <Route path='/work' component={Work}/>
    </Switch>
  </main>
)

export default MainRouter