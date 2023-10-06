"use client";

import { ActionTypes, TodosContext } from "@/app/providers/TodosProvider";
import { useContext, useEffect, useState } from "react";
import FilterRadio from "./FilterRadio";

export default function Filter() {
  const { dispatch, search } = useContext(TodosContext);
  const [filter, setFilter] = useState<
    ActionTypes.ShowAll | ActionTypes.ShowActive | ActionTypes.ShowFinished
  >(ActionTypes.ShowAll);

  useEffect(() => {
    dispatch({ type: filter });
  }, [filter]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-3/4 mb-6">
      <div className="flex flex-col gap-1">
        <label className="block text-sm text-gray-500" htmlFor="search">
          Hladat
        </label>
        <input
          id="search"
          placeholder="Zadajte nazov..."
          className="border border-gray-300 rounded-xl p-2 w-full shadow-xl"
          value={search}
          onChange={(e) =>
            dispatch({
              type: ActionTypes.Search,
              payload: { search: e.target.value },
            })
          }
        />
      </div>
      <FilterRadio
        label="Filter"
        val={filter}
        onChange={(val) => setFilter(val)}
        options={[
          { label: "Vsetky", value: ActionTypes.ShowAll },
          { label: "In progress", value: ActionTypes.ShowActive },
          { label: "Hotove", value: ActionTypes.ShowFinished },
        ]}
      />
    </div>
  );
}
