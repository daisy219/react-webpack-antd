const current_chapter_tree = (state = '', action) => {
  if (action.type === 'CHAPTER_TREE') {
    return action.value
  }
  return state
}

export default current_chapter_tree