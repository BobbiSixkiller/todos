"use client";

import { useLists } from "@/utils/hooks";
import { TodoList } from "@/utils/types";
import Link from "next/link";
import Spinner from "./Spinner";
import Card from "./Card";

export default function TodoLists() {
  const { data, isLoading, error } = useLists();

  if (isLoading) {
    return (
      <div className="flex justify-center align-middle h-72">
        <Spinner size="large" />
      </div>
    );
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((list: TodoList) => (
        <Link key={list.id} href={`/${list.id}`}>
          <Card>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              {list.name}
            </h5>
          </Card>
        </Link>
      ))}
    </div>
  );
}
