// src/App.jsx
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Todos from './pages/Todos';
import About from './pages/About';
import ErrorBoundary from './components/ErrorBoundary';
import BuggyComponent from './components/BuggyComponent';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 grid place-items-center">
      <nav className="fixed top-0 left-0 right-0 bg-orange-600 text-white px-6 py-3 flex gap-6 shadow-md z-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium hover:underline ${isActive ? 'underline' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/todos"
          className={({ isActive }) =>
            `text-sm font-medium hover:underline ${isActive ? 'underline' : ''}`
          }
        >
          Todos
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-sm font-medium hover:underline ${isActive ? 'underline' : ''}`
          }
        >
          About
        </NavLink>
      </nav>

      <main className="w-full pt-20 px-4">
        <div className="mx-auto w-11/12 max-w-7xl">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todos" element={<Todos />} />
              <Route
                path="/about"
                element={
                  <>
                    <About />
                    <BuggyComponent />
                  </>
                }
              />
            </Routes>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};

export default App;
