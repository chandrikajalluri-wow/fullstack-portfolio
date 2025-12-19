import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [customValue, setCustomValue] = useState('');

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const handleCustomChange = (e) => setCustomValue(e.target.value);
  const setCustomCount = () => {
    const value = parseInt(customValue);
    if (!isNaN(value)) setCount(value);
    setCustomValue('');
  };
  return (
    <div className="bg-container">
      <h2>React Counter App</h2>
      <div>
        <h1 className="count-value">{count}</h1>
        <button className="btn" onClick={decrement}>
          -
        </button>
        <button className="btn" onClick={increment}>
          +
        </button>
      </div>
      <div className="custom-input">
        <input
          type="text"
          className="input-box"
          value={customValue}
          onChange={handleCustomChange}
          placeholder="Enter custom value"
        />
        <br />
        <button onClick={setCustomCount} className="set-btn">
          Set
        </button>
      </div>
    </div>
  );
};
export default Counter;
