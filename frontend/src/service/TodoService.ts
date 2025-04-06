import { Todo } from "../model/Todo";
import { TodoForAdd } from "../model/TodoForAdd";

export const getTodo = async (accessToken: string): Promise<Todo[]> => {
  const result = await fetch("http://localhost:8081/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!result.ok) {
    throw new Error("Failed to fetch todos");
  }

  const dummyTodo: Todo[] = await result.json();

  return dummyTodo;
}

export const addTodo = async (accessToken: string, todo: TodoForAdd): Promise<Todo> => {
  const result = await fetch("http://localhost:8081/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(todo),
  })

  if (!result.ok) {
    throw new Error("Failed to fetch todos");
  }

  const dummyTodo: Todo = await result.json();

  return dummyTodo;
}
