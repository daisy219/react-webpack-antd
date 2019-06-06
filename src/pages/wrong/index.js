import React from 'react';
import Footer from '../../components/Footer'
import AddTodo from '../../store/containers/AddTodo'
import VisibleTodoList from '../../store/containers/VisibleTodoList'
import NumDisplay from '../../store/containers/num_display'
class Worry extends React.Component {
  render() {
    return (
      <div>
        错题集页面
        <AddTodo />
        <VisibleTodoList />
        <Footer />
        <NumDisplay />
      </div>
    )
  }
}

export default Worry