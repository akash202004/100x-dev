import React, { memo, useCallback, useEffect, useState } from "react";
import axios from "axios";

function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("").then((res) => setTodos(res.data.todos));
  }, []);

  return todos;
}

const App = () => {
  const todos = useTodos();
  return <div>{todos}</div>;
};

export default App;
