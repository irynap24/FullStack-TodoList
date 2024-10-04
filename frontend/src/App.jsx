import { useEffect, useState } from "react";
import "./App.css";

export const BaseUrl = import.meta.env.VITE_BASE_URL; // import specific for vite

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    async function test() {
      const response = await fetch(`${BaseUrl}/todos`);
      const data = await response.json();
      console.log(data);
      setTodos(data);
    }
    test(); // runs immediately
  }, []);

  function handleChange(e) {
    setInput(e.target.value);
  }

  // console.log(input);
  async function handleSubmit(e) {
    e.preventDefault(); // prevents default refresh of page
    // format data to match the ToDo schema model
    const todo = {
      text: input,
    };

    // make the request
    const response = await fetch(`${BaseUrl}/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newTodo = await response.json();

    setTodos([...todos, newTodo]);
  }
  // the id is the _id from the todo docs we want to delete
  async function handleDelete(id) {
    await fetch(`${BaseUrl}/todos/${id}`, {
      method: "DELETE",
    });
    const newTodos = todos.filter((todo) => todo._id !== id);
    // update the state with new reference
    setTodos(newTodos);
  }

  return (
    <>
      <ul>
        {" "}
        <h1>Todos:</h1>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input type="checkbox" checked={todo.completed} />
            {todo.text}
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li> // _id comes assigned from mongodb
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleChange} />
        <button>Add</button>
      </form>
    </>
  );
}

export default App;
