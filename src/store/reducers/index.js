import { combineReducers } from 'redux';
import todos from './todo';
import visibilityFilter from './visibilityFilter';
import change_num from './change_num';
import select_name from './select_name';
import change_textbook from './change_textbook';
import chapter_tree from './chapter_change';
import textbook_list from './save_book_list';

export default combineReducers({
  todos,
  visibilityFilter,
  change_num,
  select_name,
  change_textbook,
  chapter_tree,
  textbook_list
}) // 合并多个reducer