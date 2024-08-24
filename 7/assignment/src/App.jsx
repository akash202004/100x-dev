import "./App.css";
import { todo, looptodos, searchQuery } from "./store/atoms/todo";
import { useRecoilState } from "recoil";

function App() {
  // const [todo, setTodo] = useState({ title: "", description: "" });
  // const [todos, setTodos] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [todoRecoil, setTodoRecoil] = useRecoilState(todo);
  const [looptodosRecoil, setLooptodosRecoil] = useRecoilState(looptodos);
  const [searchQueryRecoil, setSearchQueryRecoil] = useRecoilState(searchQuery);

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setTodoRecoil({
      ...todoRecoil,
      [name]: value,
    });
  };

  const submitTodo = (e) => {
    e.preventDefault();
    setLooptodosRecoil([...looptodosRecoil, todoRecoil]);
    setTodoRecoil({ title: "", description: "" });
  };

  const handleSearch = (e) => {
    setSearchQueryRecoil(e.target.value);
  };

  const filteredTodos = looptodosRecoil.filter((item) =>
    item?.title?.toLowerCase().includes(searchQueryRecoil?.toLowerCase())
  );

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="title..."
          name="title"
          value={todoRecoil.title}
          onChange={inputHandle}
        />
        <input
          type="text"
          placeholder="description..."
          name="description"
          value={todoRecoil.description}
          onChange={inputHandle}
        />
        <button type="submit" onClick={submitTodo}>
          Add Todo
        </button>
      </form>
      <div>
        <input
          type="text"
          placeholder="Search Todos..."
          value={searchQueryRecoil}
          onChange={handleSearch}
        />
      </div>
      <div>
        <div>
          {filteredTodos.map((todo, index) => (
            <div key={index}>
              <h1>{todo.title}</h1>
              <h6>{todo.description}</h6>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
