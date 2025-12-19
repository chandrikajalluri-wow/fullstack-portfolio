import React from 'react';
import PropTypes from "prop-types";

const Header = ({ title, subtitle, level }) => {
  const Tag = `h${level}`;
  return (
    <header>
      <Tag>{title}</Tag>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
};

Header.defaultProps = {
  level: 1,
};

export default Header;