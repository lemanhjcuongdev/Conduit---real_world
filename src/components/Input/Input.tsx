import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  memo,
} from "react";

interface IInputProps {
  value?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  setValue?: (value: string) => void;
  setError?: (error: string) => void;
  handleAddToList?: KeyboardEventHandler<HTMLInputElement>;
}

const Input = memo((props: IInputProps) => {
  const {
    value,
    className,
    placeholder,
    type = "text",
    setValue,
    setError,
    handleAddToList,
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
      onKeyDown={handleAddToList}
    />
  );
});

export default Input;
