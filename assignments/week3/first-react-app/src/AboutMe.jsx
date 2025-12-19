import React from 'react';
import PropTypes from 'prop-types';
function AboutMe(props) {
    const {name, age, hobby} = props;
    return (
        <div>
            <h2>About Me</h2>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Favorite Hobby: {hobby}</p>
        </div>
    );
}
  AboutMe.propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        hobby: PropTypes.string.isRequired,
    };
export default AboutMe;