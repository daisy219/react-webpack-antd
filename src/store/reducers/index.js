import { combineReducers } from 'redux'
import todos from './todo'
import visibilityFilter from './visibilityFilter'
import change_num from './change_num'

export default combineReducers({
  todos,
  visibilityFilter,
  change_num
}) // 合并多个reducer