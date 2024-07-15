import { useEffect, useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input.
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
  const [input, setInput] = useState("");
  const finalVal = useMemo(() => {
    let fact = 1;
    for (let i = 1; i <= input; i++) {
      fact = fact * i;
    }
    return fact;
  }, [input]);
  // Your solution ends here

  return (
    <div>
      <input
        type="number"
        value={input}
        placeholder="Enter a number"
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <p>Calculated Value: {finalVal}</p>
    </div>
  );
}
