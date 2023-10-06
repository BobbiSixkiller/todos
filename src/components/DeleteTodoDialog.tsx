"use client";

import { useState } from "react";
import { Todo } from "@/utils/types";
import Button from "./Button";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useDdeleteTodo } from "@/utils/hooks";
import Modal from "./Modal";

export default function DeleteTodoDialog({ todo }: { todo: Todo }) {
  let [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isLoading, error } = useDdeleteTodo();

  const deleteBtnHandler = async () => {
    try {
      await mutateAsync(todo);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <TrashIcon className="h-3 w-3" />
      </Button>

      <Modal
        title="Novy zoznam uloh"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <p className="my-4">Naozaj chcete zmazat vybranu ulohu?</p>
        <Button type="button" onClick={() => setIsOpen(false)}>
          Zrusit
        </Button>
        <Button
          type="submit"
          className="ml-2"
          onClick={deleteBtnHandler}
          isLoading={isLoading}
        >
          Zmazat
        </Button>
      </Modal>
    </>
  );
}
