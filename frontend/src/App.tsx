import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './model/Todo';
import * as TodoService from './service/TodoService';
import { useAuth } from 'react-oidc-context';
import { TodoForAdd } from './model/TodoForAdd';

function App() {

  const auth = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      getTodos();
    }
  }, [auth]);

  const getTodos = async () => {
    const newTodos = await TodoService.getTodo(auth.user?.access_token || "");
    setTodos(newTodos);
  }

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = form.elements.namedItem("title") as HTMLInputElement;
    const todo: TodoForAdd = {
      title: title.value,
      done: false
    }

    const generatedTodo = await TodoService.addTodo(auth.user?.access_token || "", todo);

    // Todo 更新
    setTodos([generatedTodo, ...todos]);

    // title 消去
    title.value = "";
  };

  const completeTodo = async (todo: Todo) => {
    todo.done = !todo.done;
    TodoService.completeTodo( auth.user?.access_token || "", todo);
  }

  if (auth.isAuthenticated) {

    return (
      <>
        <h1>Todo SPA Application</h1>
        <h2>Add Task</h2>
        <form onSubmit={addTodo}>
          <input type="text" name="title"></input>
          <input type="submit" value="Send"></input>
        </form>
        <h2>Todos</h2>
        <div>
          <ul>
            {
              todos.map(e => (
                <li key={e.id}>{e.id} : {e.title}
                  {!e.done ? <button onClick={() => completeTodo(e)}>完了</button> : <></>}
                </li>)
              )
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
