import React from 'react';
import Footer from '../../components/Footer'
import AddTodo from '../../store/containers/AddTodo'
import VisibleTodoList from '../../store/containers/VisibleTodoList'

class Worry extends React.Component {
  render() {
    return (
      <div>
        错题集页面
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    )
  }
}

export default Worry