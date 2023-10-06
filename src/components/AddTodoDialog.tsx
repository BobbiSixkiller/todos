"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Modal from "./Modal";
import { InferType, date, object, string } from "yup";
import { Form, Formik, FormikProps } from "formik";
import InputField from "./InputFIeld";
import Button from "./Button";
import { useAddTodo } from "@/utils/hooks";
import { useParams } from "next/navigation";
import TextArea from "./TextArea";

const inputSchema = object({
  name: string().required("Zadajte nazov ulohy"),
  desc: string().required("Zadajte popis ulohy"),
  deadline: date()
    .min(new Date(), "Deadline nemoze byt v minulosti") // Use min() to ensure it's not in the past
    .required("Zadajte deadline"),
});

type Values = InferType<typeof inputSchema>;

export default function AddTodoDialog() {
  const { id } = useParams();
  let [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isLoading } = useAddTodo(id as string);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        <PlusIcon className="h-6 w-6" />
        <span className="pl-2">Pridat</span>
      </Button>

      <Modal
        title="Novy zoznam uloh"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Formik
          initialValues={{
            name: "",
            desc: "",
            deadline: new Date(),
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
                label="Deadline"
                placeholder="Deadline..."
                name="deadline"
                type="datetime-local"
              />

              <Button type="button" onClick={() => setIsOpen(false)}>
                Zrušiť
              </Button>
              <Button type="submit" className="ml-2" isLoading={isLoading}>
                Pridať
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
