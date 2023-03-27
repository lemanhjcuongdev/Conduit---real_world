import { ChangeEvent } from "react";

export function debounce(
  func: (e: ChangeEvent<HTMLInputElement>) => void,
  wait: number
) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(e: ChangeEvent<HTMLInputElement>) {
    const later = () => {
      clearTimeout(timeout);
      func(e);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
