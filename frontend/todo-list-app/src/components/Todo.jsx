import React, { useRef } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';
import { useLocalStorage } from '../customhooks/useLocalStorage';
import { useToggle } from '../customhooks/useToggle';
import Button from './Button';
import Dashboard from './Dashboard';
import FilterBar from './FilterBar';

const Todo = () => {
  const [todoList, setTodoList] = useLocalStorage('todos', []);
  const [showCompleted, toggleShowCompleted] = useToggle(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('All');
  const [selectedCategory, setSelectedCategory] = React.useState('Personal');

  const inputRef = useRef();

  const categories = ['Personal', 'Work', 'Urgent', 'Shopping', 'Health'];

  // Simulate loading delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) return;
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      category: selectedCategory,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = '';
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const filteredTodos = (
    showCompleted ? todoList : todoList.filter((todo) => !todo.isComplete)
  ).filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === 'All' || todo.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Dashboard todoList={todoList} />

      <div>
        <div className="flex items-center mt-7 gap-2 mb-6">
          <img className="w-8" src={todo_icon} alt="Todo Icon" />
          <h1 className="text-3xl font-semibold">To-Do List</h1>
        </div>

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
        />

        <div className="flex flex-col gap-2 mb-7 bg-gray-200 rounded-xl p-2">
          <div className="flex items-center bg-gray-200 rounded-full">
            <input
              className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
              type="text"
              ref={inputRef}
              placeholder="Add your task"
              onKeyDown={(e) => e.key === 'Enter' && add()}
            />
            <Button
              className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium"
              onClick={add}
            >
              ADD +
            </Button>
          </div>
          <div className="flex justify-end px-4 pb-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm bg-white px-2 py-1 rounded-lg border-none shadow-sm outline-none text-slate-600"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Toggle show/hide completed */}
        <Button
          onClick={toggleShowCompleted}
          className="self-end mb-4 px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors"
        >
          {showCompleted ? 'Hide Completed' : 'Show Completed'}
        </Button>

        <div>
          {isLoading ? (
            <div className="text-center text-slate-500 mt-10 animate-pulse">
              Loading your tasks...
            </div>
          ) : filteredTodos.length === 0 ? (
            <p className="text-center text-slate-500 mt-10">
              No tasks yet. Add one above!
            </p>
          ) : (
            filteredTodos.map((item) => (
              <TodoItems
                key={item.id}
                toggle={toggleTodo}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                category={item.category}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Todo;
