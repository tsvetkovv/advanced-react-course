import { ChangeEvent } from "react";
import PropTypes from "prop-types";

function FormItem({
  name,
  label,
  type = "text",
  onChange,
  value,
  placeholder,
}: {
  name: string;
  value: number | string | undefined;
  label: string;
  placeholder: string;
  type: "text" | "number";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label htmlFor={name}>
      {label}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "number"]),
  onChange: PropTypes.func.isRequired,
};

FormItem.defaultProps = {
  value: undefined,
  placeholder: "",
  type: "text",
};

export default FormItem;
