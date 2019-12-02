/**
 * 入口路由
 */

import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Layout from '@/layout/index.tsx';

class StartRouter extends React.Component {
  public render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render = { () => {
                    return (<Redirect to='/main/home' />);
                  }
              } />
          <Route path='/main' component={Layout} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default StartRouter;
