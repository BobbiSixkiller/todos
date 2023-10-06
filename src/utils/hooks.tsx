"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createList,
  createTodo,
  deleteTodo,
  getList,
  getLists,
  getTodos,
  updateTodo,
} from "./api";
import { Todo } from "./types";

export function useLists() {
  return useQuery({
    queryKey: ["lists"],
    queryFn: getLists,
  });
}

export function useList(id: string) {
  return useQuery({
    queryKey: ["lists", id],
    queryFn: () => getList(id),
  });
}

export function useAddTodoList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createList,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
  });
}

export function useTodos(listId: string) {
  return useQuery({
    queryKey: ["todos", listId],
    queryFn: () => getTodos(listId),
  });
}

export function useAddTodo(listId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Todo, "id" | "listId">) => createTodo(listId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["todos", listId] }),
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    onSuccess: (data) =>
      queryClient.invalidateQueries({ queryKey: ["todos", data.listId] }),
  });
}

export function useDdeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => deleteTodo(data),
    onSuccess: (data) =>
      queryClient.invalidateQueries({ queryKey: ["todos", data.listId] }),
  });
}
