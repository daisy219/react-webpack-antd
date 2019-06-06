import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, toggleTodo }) => {
  // console.log(todos, toggleTodo)
  return (
  <ul>
    {todos && todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => {toggleTodo(todo.id)}} />
    ))}
  </ul>
  )
}


export default TodoList