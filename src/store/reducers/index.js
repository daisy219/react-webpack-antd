import { combineReducers } from 'redux'
import todos from './todo'
import visibilityFilter from './visibilityFilter'
import change_num from './change_num'
import selete_name from './selete_name'

export default combineReducers({
  todos,
  visibilityFilter,
  change_num,
  selete_name
}) // 合并多个reducer