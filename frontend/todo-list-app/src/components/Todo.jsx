import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {
  const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) return;
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = '';
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="Todo Icon" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          ref={inputRef}
          placeholder="Add your task"
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <button
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
          onClick={add}
        >
          ADD +
        </button>
      </div>

      <div>
        {todoList.length === 0 ? (
          <p className="text-center text-slate-500 mt-10">
            No tasks yet. Add one above!
          </p>
        ) : (
          todoList.map((item) => (
            <TodoItems
              key={item.id}
              toggle={toggle}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
