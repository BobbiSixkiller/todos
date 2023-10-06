"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Modal from "./Modal";
import { InferType, object, string } from "yup";
import { Form, Formik, FormikProps } from "formik";
import InputField from "./InputFIeld";
import Button from "./Button";
import { useAddTodoList } from "@/utils/hooks";

const inputSchema = object({
  name: string().required("Zadajte nazov zoznamu uloh"),
});

type Values = InferType<typeof inputSchema>;

export default function AddTodoListDialog() {
  let [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isLoading } = useAddTodoList();

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
          }}
          validationSchema={inputSchema}
          onSubmit={async (values, formik) => {
            try {
              await mutateAsync(values);
              setIsOpen(false);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ handleSubmit }: FormikProps<Values>) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                label="Nazov zoznamu"
                placeholder="Nazov zoznamu..."
                name="name"
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
