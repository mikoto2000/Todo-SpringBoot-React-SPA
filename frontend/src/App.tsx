import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './model/Todo';
import * as TodoService from './service/TodoService';

function App() {

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const newTodos = TodoService.getTodo();
    setTodos(newTodos);
  });

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
