const current_chapter_tree = (state = '', action: any) => {
  if (action.type === 'CHAPTER_TREE') {
    return action.value;
  }
  return state;
};

export default current_chapter_tree;
