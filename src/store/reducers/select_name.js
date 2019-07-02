const select_name = (state = '', action) => {
  switch (action.type) {
    case 'SELETE_NAME':
    //   return {
    //     // name: action.name,
    //     value: action.value
    // };
    return action.value;
    default:
      return state;
  }
}
export default select_name