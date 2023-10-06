"use client";

import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Card from "./Card";

interface Option {
  label: string;
  value: string;
}

interface Radio {
  label: string;
  options: Option[];
  val: string;
  onChange: (val: any) => void;
}

export default function FilterRadio({ label, options, val, onChange }: Radio) {
  return (
    <HeadlessRadioGroup
      value={val}
      onChange={onChange}
      as="div"
      className="flex w-auto gap-3"
    >
      <div className="flex flex-col gap-1">
        <HeadlessRadioGroup.Label className="block text-sm text-gray-500">
          {label}
        </HeadlessRadioGroup.Label>
        <div className="flex gap-2">
          {options.map((o, i) => (
            <HeadlessRadioGroup.Option value={o.value} key={i}>
              {({ checked }) => (
                <Card
                  size="small"
                  className="flex items-center justify-items-center gap-2"
                >
                  {checked && (
                    <div className="shrink-0 ">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                  )}
                  <span className="block text-gray-500">{o.label}</span>
                </Card>
              )}
            </HeadlessRadioGroup.Option>
          ))}
        </div>
      </div>
    </HeadlessRadioGroup>
  );
}
