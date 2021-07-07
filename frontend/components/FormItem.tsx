import PropTypes from "prop-types";
import { ChangeEvent, ReactElement } from "react";

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
  type: "text" | "number" | "file" | "textarea";
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}): ReactElement {
  return (
    <label htmlFor={name}>
      {label}
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
        />
      )}
    </label>
  );
}

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "file", "textarea"]),
  onChange: PropTypes.func.isRequired,
};

FormItem.defaultProps = {
  value: undefined,
  placeholder: "",
  type: "text",
};

export default FormItem;
