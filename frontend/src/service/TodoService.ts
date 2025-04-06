import { Todo } from "../model/Todo";

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
