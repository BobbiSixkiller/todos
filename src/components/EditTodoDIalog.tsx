"use client";

import { useState } from "react";
import Modal from "./Modal";
import { InferType, bool, date, object, string } from "yup";
import { Form, Formik, FormikProps } from "formik";
import InputField from "./InputFIeld";
import Button from "./Button";
import TextArea from "./TextArea";
import { Todo } from "@/utils/types";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useUpdateTodo } from "@/utils/hooks";

const inputSchema = object({
  id: string().required(),
  listId: string().required(),
  name: string().required("Zadajte nazov ulohy"),
  desc: string().required("Zadajte popis ulohy"),
  deadline: date().required("Zadajte deadline"),
  finished: bool().required(),
});

type Values = InferType<typeof inputSchema>;

export default function EditTodoDialog({ todo }: { todo: Todo }) {
  let [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, error, isLoading } = useUpdateTodo();

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        <PencilIcon className="h-3 w-3" />
      </Button>

      <Modal
        title="Novy zoznam uloh"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Formik
          initialValues={{
            ...todo,
          }}
          validationSchema={inputSchema}
          onSubmit={async (values, formik) => {
            try {
              await mutateAsync({ ...values, finished: false });
              setIsOpen(false);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ handleSubmit }: FormikProps<Values>) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                label="Nazov ulohy"
                placeholder="Nazov ulohy..."
                name="name"
              />
              <TextArea
                label="Popis ulohy"
                placeholder="Popis ulohy..."
                name="desc"
              />
              <InputField
                label="Nazov zoznamu"
                placeholder="Nazov zoznamu..."
                name="deadline"
                type="datetime-local"
              />

              <Button type="button" onClick={() => setIsOpen(false)}>
                Zrušiť
              </Button>
              <Button type="submit" className="ml-2" isLoading={isLoading}>
                Aktualizovat
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
