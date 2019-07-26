import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import StartRoute from './src/router/index';
import store from './src/store/store';
import './src/assets/index.less';

class App extends React.Component {
    public render() {
        return (
            <div>
                <StartRoute />
            </div>
        );
    }
}
ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));
