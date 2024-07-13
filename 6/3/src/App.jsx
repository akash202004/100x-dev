import React, { useEffect, useRef } from "react";

const App = () => {
  const divRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      divRef.current.innerHTML = "10";
      console.log("changed");
    }, 2000);
  }, []);

  const incomeText = "20000";
  return (
    <h1>
      hi there <div ref={divRef}>{incomeText}</div>
    </h1>
  );
};

export default App;
