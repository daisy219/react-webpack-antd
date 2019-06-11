import { connect } from 'react-redux'
import { select_name } from '../action/index'
import Worry from '../../pages/wrong/index'

// const getVisibleTodos = (todos, filter) => {
//   // console.log(todos, filter)
//   switch (filter) {
//     case 'SHOW_COMPLETED':
//       return todos.filter(t => t.completed)
//     case 'SHOW_ACTIVE':
//       return todos.filter(t => !t.completed)
//     case 'SHOW_ALL':
//     default:
//       return todos
//   }
// }
const mapStateToProps = state => ({
  current_select: state.selete_name
})

const mapDispatchToProps = dispatch => ({
  selete_name: current => dispatch(select_name(current))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Worry)