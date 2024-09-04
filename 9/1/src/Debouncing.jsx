import React, { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};

const Debouncing = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  return (
    <div>
      <h1>Debouncing {debouncedValue}</h1>
      <input
        style={{ width: "100%" }}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default Debouncing;
