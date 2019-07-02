const current_textbook = (state = '', action) => {
  if (action.type === 'CHOOES_TEXTBOOK') {
    return action.bookinfo;
  }
  return state;
}

export default current_textbook