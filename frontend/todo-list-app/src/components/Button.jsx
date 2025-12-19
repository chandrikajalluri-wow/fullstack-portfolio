import React from 'react';
import propTypes from 'prop-types';

const Button = ({ onClick, children, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};
Button.propTypes = {
  onClick: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
  className: propTypes.string,
  type: propTypes.string,
};

export default Button;
