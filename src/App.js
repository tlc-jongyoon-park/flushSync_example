import { useRef, useState, memo } from "react";
import { flushSync } from "react-dom";
import { v4 as uuid } from "uuid";
import mockTodos from "./mock.json";

const App = () => {
  const [todos, setTodos] = useState(mockTodos);
  const listRef = useRef();

  console.log("!!!! app render");

  const handleAdd = (input) => {
    flushSync(() => {
      setTodos([...todos, { id: uuid(), task: input }]);
    });
    listRef.current.scrollTop = listRef.current.scrollHeight;
  };

  return (
    <section>
      <h1>Todos</h1>
      <ul ref={listRef}>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <MemoAddTodo handleAdd={handleAdd} />
    </section>
  );
};

const AddTodo = ({ handleAdd }) => {
  const [taskInput, setTaskInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskInput) return;
    setTaskInput("");
    handleAdd(taskInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="input 기입"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button>input 추가</button>
    </form>
  );
};

const MemoAddTodo = memo(AddTodo);

export default App;
