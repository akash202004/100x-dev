# use of useEffect to render some todos

```
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div>
      <button onClick={() => setSelectedId(1)}>1</button>
      <button onClick={() => setSelectedId(2)}>2</button>
      <button onClick={() => setSelectedId(3)}>3</button>
      <button onClick={() => setSelectedId(4)}>4</button>
      <button onClick={() => setSelectedId(5)}>5</button>
      <Todo id={selectedId} />
    </div>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    axios
      .get(`https://sum-server.100xdevs.com/todo?id=${id}`)
      .then(function (res) {
        setTodo(res.data.todo);
      });
  }, [id]);

  return (
    <div>
      <h1>ID: {id}</h1>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
    </div>
  );
}

export default App;

```

# use of useMemo for extra rerendering

```
import React, { useEffect, useMemo, useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(1);
  const [finalValue, setFinalValue] = useState(0);

  // normal approach
  // let count = 0;
  // for (let i = 1; i <= inputValue; i++) {
  //   count += i;
  // }

  // optimal approach
  // useEffect(() => {
  //   let count = 0;
  //   for (let i = 1; i <= inputValue; i++) {
  //     count += i;
  //   }
  //   setFinalValue(count);
  // }, [inputValue]);

  // use of useMemo
  let count = useMemo(() => {
    let ans = 0;
    for (let i = 1; i <= inputValue; i++) {
      ans += i;
    }
    return ans;
  }, [inputValue]);

  return (
    <div>
      <input
        placeholder="Find sum from 1 to n"
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <br />
      <h1>
        Sum from 1 to {inputValue} is {count}
      </h1>
      <br />
      <button onClick={() => setCounter(counter + 1)}>
        Counter ({counter})
      </button>
    </div>
  );
};

export default App;

```
