"use client";

import { TodosContext } from "@/app/providers/TodosProvider";
import { todosCountString } from "@/utils/functions";
import { useContext } from "react";

export default function ListInfo({ id }: { id: string }) {
  const { todos, list } = useContext(TodosContext);

  return (
    <div className="w-2/3">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Zoznam: {list?.name}
      </h2>
      <p className="mt-2 text-lg leading-8 text-gray-600">
        Obsahuje dokopy: {todosCountString(todos!.length)}
      </p>
    </div>
  );
}
