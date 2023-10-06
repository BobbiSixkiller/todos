import { Todo, TodoList } from "./types";

export async function getLists(): Promise<TodoList[]> {
  const res = await fetch("https://651d05dc44e393af2d590607.mockapi.io/lists", {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getList(id: string): Promise<TodoList> {
  const res = await fetch(
    `https://651d05dc44e393af2d590607.mockapi.io/lists/${id}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function createList(
  list: Pick<TodoList, "name">
): Promise<TodoList | undefined> {
  const res = await fetch(
    "https://651d05dc44e393af2d590607.mockapi.io/lists?page=1&limit=19",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(list),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to send data");
  }

  return res.json();
}

export async function getTodos(id: string): Promise<Todo[]> {
  const res = await fetch(
    `https://651d05dc44e393af2d590607.mockapi.io/lists/${id}/todos`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function createTodo(
  id: string,
  todo: Omit<Todo, "id" | "listId">
): Promise<Todo> {
  const res = await fetch(
    `https://651d05dc44e393af2d590607.mockapi.io/lists/${id}/todos`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todo),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to send data");
  }

  return res.json();
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(
    `https://651d05dc44e393af2d590607.mockapi.io/lists/${todo.listId}/todos/${todo.id}`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todo),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to send data");
  }

  return res.json();
}

export async function deleteTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(
    `https://651d05dc44e393af2d590607.mockapi.io/lists/${todo.listId}/todos/${todo.id}`,
    {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to send data");
  }

  return res.json();
}
