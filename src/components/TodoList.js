import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("array"));
    if (data) {
      setTodos(data);
    } else {
      localStorage.setItem("array", JSON.stringify([]));
    }
    return () => {};
  }, []);

  const addTodo = (todo) => {
    if (!todo.text) {
      return;
    }

    const newTodos = [todo, ...todos];
    localStorage.setItem("array", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\S*$/.test(newValue.text)) {
      return;
    }

    setTodos((pre) =>
      pre.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const comleteTodo = (id) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  return (
    <div className="main">
      <h1 className="title">TodoList</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={comleteTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />

      {/* <div classname = "ui search">
        <div classsName = "iu search icon">
          <input type="text" placeholder="Search Todos" className="prompt"/>
          <i className="search icon"></i>
        </div>
      </div> */}
    </div>
  );
}

export default TodoList;
