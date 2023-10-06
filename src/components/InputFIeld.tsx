"use client";

import { formatDateToISOString } from "@/utils/functions";
import { useField } from "formik";
import { useEffect } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

export default function InputField({
  label,
  type = "text",
  placeholder = "",
  ...props
}: InputFieldProps) {
  const [field, meta, helpers] = useField(props);

  useEffect(() => {
    if (type === "datetime-local") {
      const date = new Date(field.value);

      helpers.setValue(formatDateToISOString(date));
    }
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-500" htmlFor={props.name}>
        {label}
      </label>
      <input
        {...field}
        {...props}
        id={props.name}
        type={type}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-md p-2 w-full mt-1 ${
          meta.touched && meta.error ? "border-red-500" : ""
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
}
