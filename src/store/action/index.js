let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const add_num = () => ({
  type: 'ADD',
  // num
  // num: num ++,
})

export const reduce_num = () => ({
  type: 'REDUCE',
  // num
  // num: num - 1,
})
// 课本信息
export const choose_textbook = (bookinfo) => ({
  type: 'CHOOES_TEXTBOOK',
  bookinfo: bookinfo
})

export const select_name = (value) => ({
  type: 'SELETE_NAME',
  // name: current.name,
  value: value
})
// 章节树信息
export const change_chapter_tree = (value) => ({
  type: 'CHAPTER_TREE',
  // name: current.name,
  value: value
})

// 课本列表
export const save_book_list = (value) => ({
  type: 'BOOK_LIST',
  // name: current.name,
  value: value
})