# 1. How avoid rerendering of the component by using React.memo

## And we use to declared state in a fucntion to avoid extra rerendering of the component

```
import { useState } from "react";
import "./App.css";
import React from "react";
import { Fragment } from "react";

function App() {
const [name, setName] = useState("My name is Akash");
const handlename = () => {
setName("My name is " + Math.random());
};

return (

<div>
{/_ <button onClick={handlename}>Click</button>
<Header title={name}></Header> _/}
{/_ <HeaderWithButton /> _/}
<button onClick={handlename}>Click</button>
<Header title={name}></Header>
<Header title="Rohit"></Header>
<Header title="Rohit 2"></Header>
</div>
);
}

// React.memo is used to avoid extra rerendering of the component
const Header = React.memo(function Header({ title }) {
return <h1>{title}</h1>;
});

// by this we can avoid extra rerendering of the component
// function HeaderWithButton() {
// const [name, setName] = useState("My name is Akash");
// const handlename = () => {
// setName("My name is " + Math.random());
// };

// return (
// <>
// <button onClick={handlename}>Click</button>
// <Header title={name}></Header>
// </>
// );
// }

// function Header({ title }) {
// return <h1>{title}</h1>;
// }

export default App;
```

# 2. Significant of key in React

## Help react to identify which items have changed, are added, or are removed

```
import React, { useState } from "react";

let count = 4;

const App = () => {
const [todos, setTodos] = useState([
{ id: 1, title: "Learn React", description: "Learn React" },
{ id: 2, title: "Learn Node", description: "Learn Node" },
{ id: 3, title: "Learn Express", description: "Learn Express" },
]);

function addTodo() {
setTodos([
...todos,
{
id: count++,
title: "Learn React Native",
description: "Learn React Native",
},
]);
}

return (
<div>
<button onClick={addTodo}>Add todo</button>
{todos.map((todo) => (
<Todo key={todo.id} title={todo.title} description={todo.description} />
))}
</div>
);
};

function Todo({ title, description }) {
return (
<div>
<h1>{title}</h1>
<p>{description}</p>
</div>
);
}

export default App;
```

# 3. Children prop is used to pass the innerComponent to the Card component

## Wrapper component that renders two Card components with TextComponent as innerComponent && Two ways to wrap the innerComponent in Card component

```
import React from "react";

const App = () => {
  return (
    <>
      {/* <Card innerComponent={<TextComponent />} /> */}
      {/* <Card innerComponent={<TextComponent />} /> */}
      <Card>
        <Card>
          <h1>Card Title</h1>
          <p>Card description</p>
        </Card>
        <h1>Card Title</h1>
        <p>Card description</p>
      </Card>
    </>
  );
};

function Card({ children }) {
  return (
    <div style={{ border: "2px solid white", padding: "20px" }}>{children}</div>
  );
}

// function TextComponent({}) {
//   return (
//     <div>
//       <h1>Card Title</h1>
//       <p>Card description</p>
//     </div>
//   );
// }

// function Card({ innerComponent }) {
//   return (
//     <div style={{ border: "2px solid white", padding: "20px" }}>
//       {innerComponent}
//     </div>
//   );
// }

export default App;
```

# 4. Fetch the data from the server and display it on the screen. The data should be fetched every 1 second.

## by setInterval function.

```
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
```
