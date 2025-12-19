import React from 'react';
import PropTypes from 'prop-types';

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  filterCategory,
  setFilterCategory,
  categories,
}) => {
  return (
    <div className="flex gap-2 mb-4 w-full">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg bg-gray-100 border-none outline-none focus:ring-2 focus:ring-orange-200"
      />
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="px-4 py-2 rounded-lg bg-gray-100 border-none outline-none focus:ring-2 focus:ring-orange-200 cursor-pointer"
      >
        <option value="All">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};
FilterBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  filterCategory: PropTypes.string.isRequired,
  setFilterCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilterBar;
