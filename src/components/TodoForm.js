import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  var arr = new Array();

  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const ipputRef = useRef(null);

  useEffect(() => {
    ipputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Edit todo"
            value={input}
            name="text"
            className="edit-input"
            onChange={handleChange}
            ref={ipputRef}
          />
          <button className="edit-button">Update todo</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a todo"
            value={input}
            name="text"
            className="add-input"
            onChange={handleChange}
            ref={ipputRef}
          />
          <button className="add-button">Add todo</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
