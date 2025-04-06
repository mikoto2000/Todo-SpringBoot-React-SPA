import { Todo } from "../model/Todo";

export const getTodo = (): Todo[] => {
  const dummyTodo: Todo[] = [
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

  return dummyTodo;
}
