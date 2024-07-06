# Here we learn how to avoid rerendering of the component by using React.memo

# and we use to declared state in a fucntion to avoid extra rerendering of the component

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
