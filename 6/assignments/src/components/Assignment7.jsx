import React, { useState, useRef } from "react";

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.
export function Assignment7() {
  const [count, setCount] = useState(0);

  const numberOFRender = useRef(0);
  const handleReRender = () => {
    // Update state to force re-render
    setCount(count + 1);
  };

  numberOFRender.current = numberOFRender.current + 1;

  return (
    <div>
      <p>This component has rendered {numberOFRender.current} times.</p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  );
}
