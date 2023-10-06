"use client";

import Spinner from "@/components/Spinner";
import { useList, useTodos } from "@/utils/hooks";
import { Todo, TodoList } from "@/utils/types";
import { useParams } from "next/navigation";
import { createContext, Dispatch, ReactNode, useReducer } from "react";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ActionTypes {
  ShowAll = "SHOW_ALL",
  ShowActive = "SHOW_ACTIVE",
  ShowFinished = "SHOW_FINISHED",
  Search = "SEARCH",
}

type ActionPayload = {
  [ActionTypes.Search]: { search: string };
  [ActionTypes.ShowActive]: undefined;
  [ActionTypes.ShowAll]: undefined;
  [ActionTypes.ShowFinished]: undefined;
};

type FilterActions = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

type TodosStateType = {
  loading: boolean;
  search: string;
  filter:
    | ActionTypes.ShowAll
    | ActionTypes.ShowFinished
    | ActionTypes.ShowActive;
  list?: TodoList;
  todos: Todo[];
};

function FilterReducer(
  state: TodosStateType,
  action: FilterActions
): TodosStateType {
  switch (action.type) {
    case ActionTypes.ShowAll:
      return { ...state, filter: ActionTypes.ShowAll };

    case ActionTypes.ShowActive:
      return { ...state, filter: ActionTypes.ShowActive };

    case ActionTypes.ShowFinished:
      return { ...state, filter: ActionTypes.ShowFinished };

    case ActionTypes.Search:
      return { ...state, search: action.payload.search };

    default:
      throw new Error("Unhandled action type!");
  }
}

const initialState: TodosStateType = {
  loading: false,
  todos: [],
  list: undefined,
  search: "",
  filter: ActionTypes.ShowAll,
};

const TodosContext = createContext<
  TodosStateType & { dispatch: Dispatch<FilterActions> }
>({
  todos: [],
  dispatch: () => null,
  loading: false,
  search: "",
  filter: ActionTypes.ShowAll,
});

function TodosProvider({ children }: { children: ReactNode }) {
  const { id } = useParams();

  const [state, dispatch] = useReducer(FilterReducer, initialState);

  const { data, isLoading } = useTodos(id as string);
  console.log(data);
  const { data: listData, isLoading: listLoading } = useList(id as string);

  return (
    <TodosContext.Provider
      value={{
        ...state,
        todos: data || [],
        list: listData,
        loading: isLoading || listLoading,
        dispatch,
      }}
    >
      {isLoading ? (
        <div className="flex justify-center align-middle min-h-screen">
          <Spinner size="large" />
        </div>
      ) : (
        children
      )}
    </TodosContext.Provider>
  );
}

export { TodosProvider, TodosContext };
