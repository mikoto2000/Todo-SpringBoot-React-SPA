import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './model/Todo';
import * as TodoService from './service/TodoService';
import { useAuth } from 'react-oidc-context';
import { TodoForAdd } from './model/TodoForAdd';
import { useSearchParams, useNavigate } from 'react-router-dom';

function App() {

  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const size = searchParams.get('size') ? parseInt(searchParams.get('size') as string) : 10;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      getTodos();
    }
  }, [auth, size, page]);

  const getTodos = async () => {
    const newTodos = await TodoService.getTodo(auth.user?.access_token || "", size, page);
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

  const toggleTodo = async (todo: Todo) => {
    todo.done = !todo.done;
    await TodoService.completeTodo(auth.user?.access_token || "", todo);
    // UI上のTodoリストを更新
    setTodos([...todos]);
  }

  const removeTodo = async (todo: Todo) => {
    await TodoService.deleteTodo(auth.user?.access_token || "", todo.id);
    // UIからTodoを削除
    setTodos(todos.filter(t => t.id !== todo.id));
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
                <li key={e.id}>
                  <span className={e.done ? "completed" : ""}>
                    {e.id} : {e.title}
                  </span>
                  {!e.done ? <button onClick={() => toggleTodo(e)}>完了</button> :
                    <button onClick={() => toggleTodo(e)}>未完了に戻す</button>}
                  <button onClick={() => removeTodo(e)}>削除</button>
                </li>)
              )
            }
          </ul>
          <div className="pagination">
            <button onClick={() => {
              const newPage = page > 0 ? page - 1 : 0;
              navigate(`?page=${newPage}&size=${size}`);
            }}>前へ</button>
            <span>ページ {page + 1}</span>
            <button onClick={() => {
              const newPage = page + 1;
              navigate(`?page=${newPage}&size=${size}`);
            }}>次へ</button>
          </div>
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
