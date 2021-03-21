import { ChangeEvent, useState } from "react";

function getValueBasedOnType({
  target,
}: ChangeEvent<HTMLInputElement>): string | number | [FileList] | null {
  if (target.type === "number") {
    return parseFloat(target.value);
  }
  if (target.type === "file") {
    if (target.files !== null) {
      return [target.files];
    }
    return null;
  }

  return target.value;
}

export default function useForm<TData extends { [k: string]: any }>(
  initial = {} as Partial<TData>
): {
  inputs: Partial<TData>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
  clearForm: () => void;
} {
  const [inputs, setInputs] = useState(initial);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
