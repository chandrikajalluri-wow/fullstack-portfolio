import React from 'react';
import PropTypes from "prop-types";
const Card = ({ title, content, children }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "5px", margin: "1rem 0" }}>
      {title && <h3>{title}</h3>}
      {content && <p>{content}</p>}
      {children}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  children: PropTypes.node,
};

export default Card;