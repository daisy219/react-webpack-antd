import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { Token } from '../utils/utils'
import Login from '../pages/login/index';
import Layout from '../layout/index';

class StartRouter extends React.Component{
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' 
              render={
                  ()=> {
                      if (Token()) {
                          return (<Redirect to='/teacher/home' />)
                      } else {
                          return (<Redirect to='/login' />)
                      }
                  }
              } />
          <Route path='/login' component={Login}/>
          <Route path='/teacher' component={Layout} />
        </Switch>
      </BrowserRouter>
    )
  }
}
export default StartRouter