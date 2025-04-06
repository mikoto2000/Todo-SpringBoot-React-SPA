import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './model/Todo';
import * as TodoService from './service/TodoService';
import { useAuth } from 'react-oidc-context';

function App() {

  const auth = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const newTodos = TodoService.getTodo();
      setTodos(newTodos);
    }
  }, [auth]);

  if (auth.isAuthenticated) {

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
              todos.map(e => <li key={e.id}>{e.id} : {e.title}</li>)
            }
          </ul>
        </div>
      </>
    )
  } else {
    return (
      <>
        <h1>Todo SPA Application</h1>
        <h2>Please login</h2>
        <button onClick={() => auth.signinRedirect()}>Login</button>
      </>
    )
  }
}

export default App
