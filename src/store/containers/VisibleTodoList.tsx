import { connect } from 'react-redux';
import { toggleTodo } from '../action/index';
import TodoList from '../../components/TodoList';

const getVisibleTodos = (todos: any, filter: any) => {
  // console.log(todos, filter)
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter((t: any) => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((t: any) => !t.completed);
    case 'SHOW_ALL':
    default:
      return todos;
  }
};
const mapStateToProps = (state: any) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleTodo: (id: number) => dispatch(toggleTodo(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
