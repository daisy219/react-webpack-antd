import { createStore } from 'redux';
import combineReducers from './reducers/index';
const store: any = createStore(combineReducers);
// console.log(store.getState())

export default store;
