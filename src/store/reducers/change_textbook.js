const current_textbook = (state = { bookname: '', bookid: '' }, action) => {
  if (action.type === 'CHOOES_TEXTBOOK') {
    return {
      state
    }
  }
  return state
  // switch (action.type) {
  //   case 'CHOOES_TEXTBOOK':
  //     return [
  //       ...state,
  //       {
  //         id: action.id,
  //         text: action.text, 
  //         completed: false
  //       }
  //     ]
  //   case 'TOGGLE_TODO':
  //     return state.map(todo =>
  //       todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   default:
  //     return state
  // }
}

export default current_textbook