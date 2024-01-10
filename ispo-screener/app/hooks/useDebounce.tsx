import { useState, useEffect } from "react";

export default function useDebounce<T>(value: T, delay = 500): T {
  const [debounceVal, setDebounceVal] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceVal(value), delay);
    return () => clearTimeout(timeout);
  }, [value]);

  return debounceVal;
}
