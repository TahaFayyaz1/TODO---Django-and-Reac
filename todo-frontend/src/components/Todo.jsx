import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Todo({ todo, onDelete }) {
  const [priority, setPriority] = useState(false);

  const DeleteButton = () => {
    fetch(`http://localhost:8000/todo/${todo.id}`, { method: "DELETE" }).then(
      (response) => {
        if (response.ok) {
          onDelete(todo.id);
        }
      }
    );
  };

  const PriorityButton = () => {
    if (priority === false) {
      fetch(`http://localhost:8000/priority/${todo.id}`, { method: "POST" });
      setPriority(true);
    } else {
      fetch(`http://localhost:8000/priority/${todo.id}`, { method: "DELETE" });
      setPriority(false);
    }
  };

  return (
    <li>
      {todo.title}
      <Link to={`edit/${todo.id}`}>Edit</Link>
      <button onClick={DeleteButton}>Delete</button>
      <button onClick={PriorityButton}>Priority</button>
    </li>
  );
}

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/todo")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  //updates the Todos so that onDelete the list is rerendered
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onDelete={handleDelete} />
        ))}
      </ul>
    </>
  );
}

export default Todos;
