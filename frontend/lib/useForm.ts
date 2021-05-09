import { ChangeEvent, useEffect, useState } from "react";

function getValueBasedOnType({
  target,
}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):
  | string
  | number
  | File
  | null {
  if (target.type === "number") {
    return parseFloat(target.value);
  }
  if (target.type === "file") {
    if ("files" in target && target.files !== null && target.files[0]) {
      return target.files[0];
    }
    return null;
  }

  return target.value;
}

export default function useForm<TData extends { [k: string]: any }>(
  initial = {} as Partial<TData>
): {
  inputs: Partial<TData>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  resetForm: () => void;
  clearForm: () => void;
} {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join("");
  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInputs({
      ...inputs,
      [e.target.name]: getValueBasedOnType(e),
    });
  }

  function resetForm(): void {
    setInputs(initial);
  }

  function clearForm(): void {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ""])
    );
    setInputs(blankState as Partial<TData>);
  }

  return { inputs, handleChange, resetForm, clearForm };
}
