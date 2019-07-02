const current_book_list = (state = '', action) => {
  if (action.type === 'BOOK_LIST') {
    return action.value;
  }
  return state;
}

export default current_book_list