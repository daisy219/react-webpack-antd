import { createStore } from 'redux'
import combineReducers from './reducers/index'
let store = createStore(combineReducers)
// console.log(store.getState())

export default store