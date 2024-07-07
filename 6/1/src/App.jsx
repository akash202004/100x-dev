// Fetch the data from the server and display it on the screen. The data should be fetched every 1 second.
// by setInterval function.

import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setInterval(() => {
      fetch("https://sum-server.100xdevs.com/todos").then(async (res) => {
        const json = await res.json();
        setData(json.todos);
      });
    }, 1000);
  }, []);

  return (
    <div>
      <h1>My Todos</h1>
      <button>Fetch Todos</button>
      <div>
        {data.map((todo, id) => (
          <div key={id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
