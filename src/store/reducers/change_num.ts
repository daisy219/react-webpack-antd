const test_num = (state = 0, action: any) => {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'REDUCE':
      return state - 1;
    default:
      return state;
  }
};
export default test_num;
