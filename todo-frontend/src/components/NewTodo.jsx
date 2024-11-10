import React, { useState } from "react";

function NewTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, description: description }),
  };

  const Submit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/todo", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then(() => {
        setTitle("");
        setDescription("");
      });
  };

  return (
    <>
      <form onSubmit={Submit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </>
  );
}

export default NewTodo;
