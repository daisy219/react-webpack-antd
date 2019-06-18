import { combineReducers } from 'redux'
import todos from './todo'
import visibilityFilter from './visibilityFilter'
import change_num from './change_num'
import select_name from './select_name'

export default combineReducers({
  todos,
  visibilityFilter,
  change_num,
  select_name
}) // 合并多个reducer