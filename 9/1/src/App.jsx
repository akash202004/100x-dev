import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import IsOnline from "./IsOnline";
import Debouncing from "./Debouncing";

function App() {
  const [render, setRender] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setRender(false);
    }, 1000);
  }, []);

  return (
    <>
      <div>
        <h1>Akash Laha</h1>
        {/* {render ? <MyComponent /> : <div>2nd Div</div>} */}
        {/* <CustomElementRegistry /> */}
        {/* <IsOnline /> */}
        <Debouncing />
      </div>
    </>
  );
}

// function MyComponent() {
//   const [count, setCount] = useState(0);

//   const incrementCount = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={incrementCount}>Increment</button>
//     </div>
//   );
// }

// class MyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: 0 };
//   }

//   incrementCount = () => {
//     this.setState({ count: this.state.count + 1 });
//   };

//   render() {
//     return (
//       <div>
//         <p>{this.state.count}</p>
//         <button onClick={this.incrementCount}>Increment</button>
//       </div>
//     );
//   }
// }

// function MyComponent() {
//   useEffect(() => {
//     console.log("Mounted");

//     return () => console.log("Unmounted");
//   }, []);

//   return <div>From Inside</div>;
// }

export default App;
