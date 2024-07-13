# Reconcillation , Rendering, State, useState, useEffect, useMemo, memo. useCallback nad useRed Revision

```
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [exchangeData, setExchangeData] = useState({});
  const [namkData, setNamkData] = useState({});
  console.log("hi there re-render");

  useEffect(() => {
    setTimeout(() => {
      setNamkData({ aaa: 1000 });
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setExchangeData({ returns: 500 });
    }, 1000);
  }, []);

  const incomeTax = (namkData.aaa + exchangeData.returns) * 0.3;

  return (
    <>
      <h1>hi There {incomeTax}</h1>
    </>
  );
}

export default App;

```

```
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

```
