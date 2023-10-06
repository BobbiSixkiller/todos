"use client";

import Card from "./Card";
import DeleteTodoDialog from "./DeleteTodoDialog";
import Toggle from "./Toggle";
import { useContext } from "react";
import { ActionTypes, TodosContext } from "@/app/providers/TodosProvider";

export default function Todos() {
  const { todos, search, filter } = useContext(TodosContext);

  const filteredTodos = todos.filter((todo) => {
    if (filter === ActionTypes.ShowAll) {
      return true;
    }

    if (filter === ActionTypes.ShowActive && !todo.finished) {
      return true;
    }
    if (filter === ActionTypes.ShowFinished && todo.finished) {
      return true;
    }

    return false;
  });

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {filteredTodos
        .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
        .map((t) => (
          <Card key={t.id}>
            <div className="absolute top-3 right-3">
              <DeleteTodoDialog todo={t} />
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                  {t.name}
                </h5>
                <p className="text-sm text-gray-500">
                  Deadline: {new Date(t.deadline).toLocaleString()}
                </p>
              </div>
              <p className="mb-10">{t.desc}</p>
              <div className="absolute bottom-3 right-3 flex gap-2">
                <span className={`${t.finished ? "text-lime-500" : ""}`}>
                  {t.finished ? "HOTOVO" : "In Progress"}
                </span>{" "}
                <Toggle todo={t} />
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}
