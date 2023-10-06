"use state";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useUpdateTodo } from "@/utils/hooks";
import { Todo } from "@/utils/types";

export default function Toggle({ todo }: { todo: Todo }) {
  const [enabled, setEnabled] = useState(todo.finished);

  const { mutateAsync, isLoading } = useUpdateTodo();

  const handleChange = async () => {
    try {
      if (!isLoading) {
        await mutateAsync({ ...todo, finished: !enabled });
        setEnabled(!enabled);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Switch
        checked={enabled}
        onChange={handleChange}
        className={`${enabled ? "bg-teal-900" : "bg-teal-700"} ${
          isLoading ? "opacity-50" : ""
        }
          relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-9" : "translate-x-0"} ${
            isLoading ? "opacity-50" : ""
          }
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
