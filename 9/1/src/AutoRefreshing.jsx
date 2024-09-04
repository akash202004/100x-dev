import { useEffect, useState } from "react";
import axios from "axios";

function useTodos(n) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const value = setInterval(() => {
      axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      });
    }, n * 1000);

    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
      setLoading(false);
    });

    return () => {
      clearInterval(value);
    };
  }, [n]);

  return { todos, loading };
}

function AutoRefreshing() {
  const { todos, loading } = useTodos(10);

  if (loading) {
    return <div> loading... </div>;
  }

  return (
    <>
      {todos.map((todo) => (
        <Track todo={todo} />
      ))}
    </>
  );
}

function Track({ todo }) {
  return (
    <div>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}

export default AutoRefreshing;

// another lib for cleanup --> swp

// import useSWR from "swr";

// const fetcher = (url) => fetch(url).then((res) => res.json());
// const fetcher = async function(url) {
//   const data = await fetch(url);
//   const json = await data.json();
//   return json;
// };

// function Profile() {
//   const { data, error, isLoading } = useSWR('https://sum-server.100xdevs.com/todos', fetcher)

//   if (error) return <div>failed to load</div>
//   if (isLoading) return <div>loading...</div>
//   return <div>hello, you have {data.todos.length} todos!</div>
// }
