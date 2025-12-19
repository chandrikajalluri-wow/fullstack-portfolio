import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ todoList }) => {
  const totalTasks = todoList.length;
  const completedTasks = todoList.filter((todo) => todo.isComplete).length;
  const pendingTasks = totalTasks - completedTasks;

  const categories = todoList.reduce((acc, todo) => {
    const cat = todo.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
      <div className="bg-orange-100 p-4 rounded-xl flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold text-orange-600">{totalTasks}</h3>
        <p className="text-sm text-gray-600">Total Tasks</p>
      </div>
      <div className="bg-green-100 p-4 rounded-xl flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold text-green-600">{completedTasks}</h3>
        <p className="text-sm text-gray-600">Completed</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-xl flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold text-yellow-600">{pendingTasks}</h3>
        <p className="text-sm text-gray-600">Pending</p>
      </div>
      <div className="bg-indigo-100 p-4 rounded-xl flex flex-col text-center justify-center">
        <h3 className="text-lg font-bold text-indigo-600">Categories</h3>
        <div className="text-xs text-gray-600 mt-1 max-h-16 overflow-y-auto w-full">
          {Object.entries(categories).map(([cat, count]) => (
            <div key={cat} className="flex justify-between px-2">
              <span>{cat}</span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
          {totalTasks === 0 && <span>No data</span>}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default Dashboard;
