"use client";

import { useField } from "formik";

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
}

export default function TextArea({
  label,
  placeholder = "",
  ...props
}: InputFieldProps) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-500">{label}</label>
      <textarea
        {...field}
        {...props}
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
