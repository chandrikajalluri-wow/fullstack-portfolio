import React from 'react';
import PropTypes from 'prop-types';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

const TodoItems = ({ text, id, isComplete, category, toggle, deleteTodo }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => toggle(id)}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img
          src={isComplete ? tick : not_tick}
          alt={isComplete ? 'Completed' : 'Not completed'}
          className="w-7"
        />
        <div className="ml-4 flex flex-col">
          <p
            className={`text-slate-700 text-[17px] ${isComplete ? 'line-through decoration-slate-500' : ''}`}
          >
            {text}
          </p>
          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full self-start mt-0.5">
            {category || 'Uncategorized'}
          </span>
        </div>
      </div>
      <img
        onClick={() => deleteTodo(id)}
        src={delete_icon}
        alt="Delete task"
        className="w-3.5 cursor-pointer"
      />
    </div>
  );
};

TodoItems.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  category: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

// React.memo optimization to prevent unnecessary re-renders
export default React.memo(TodoItems);
