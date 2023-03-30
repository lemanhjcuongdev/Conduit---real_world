import { ChangeEvent, memo } from "react";

interface ITextAreaProps {
  value?: string;
  placeholder?: string;
  className?: string;
  rows: number;
  setValue?: (value: string) => void;
  setError?: (error: string) => void;
}

const TextArea = memo((props: ITextAreaProps) => {
  const { value, className, placeholder, rows, setValue, setError } = props;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue && setValue(e.target.value);
    setError && setError("");
  };

  return (
    <textarea
      className={className}
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={handleChange}
    />
  );
});
export default TextArea;
