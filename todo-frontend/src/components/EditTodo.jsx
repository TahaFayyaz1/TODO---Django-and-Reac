import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { todoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/todo/${todoId}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
      });
  }, [todoId]);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, description: description }),
  };

  const Submit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/todo/${todoId}`, requestOptions).then(() => {
      navigate("/");
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
        <button type="submit">Edit Todo</button>
      </form>
    </>
  );
}

export default EditTodo;
