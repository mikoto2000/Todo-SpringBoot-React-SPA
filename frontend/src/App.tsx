import { useState } from 'react'
import './App.css'

function App() {

  const dummyTodo = [
    {
      id: 1,
      title: "Todo1",
      done: false,
    },
    {
      id: 2,
      title: "Todo2",
      done: true,
    },
    {
      id: 3,
      title: "Todo3",
      done: true,
    },
  ];

  const [todos, setTodos] = useState(dummyTodo);

  return (
    <>
      <h1>Todo SPA Application</h1>
      <h2>Add Task</h2>
      <div>
        <input type="text"></input>
        <input type="submit" value="Send"></input>
      </div>
      <h2>Todos</h2>
      <div>
      <ul>
        {
          todos.map(e => <li key="{e.id}">{e.id} : {e.title}</li>)
        }
      </ul>
      </div>
    </>
  )
}

export default App
