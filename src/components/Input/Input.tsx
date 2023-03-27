import { ChangeEvent, HTMLInputTypeAttribute, memo } from "react";

interface IInputProps {
  value?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  setValue?: (value: string) => void;
  setError?: (error: string) => void;
}

function Input(props: IInputProps) {
  const {
    value,
    className,
    placeholder,
    type = "text",
    setValue,
    setError,
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value);
    setError && setError("");
  };

  return (
    <input
      className={className}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
    />
  );
}

export default memo(Input);
