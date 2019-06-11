const selete_name = (state = {name: '', value: ''}, action) => {
  switch (action.type) {
    case 'SELETE_NAME':
      return {
        name: action.name,
        value: action.value
    };
    default:
      return state
  }
}
export default selete_name