import React from 'react';
import PropTypes from 'prop-types';

const SlideView = ({
  name, image, handleSlideClick, pageNum,
}) => (
  <li className="p-3 bg-gray-200 hover:bg-gray-300">
    <a href="/#" onClick={e => handleSlideClick(e, pageNum)}>
      {name}
      <img className="mx-auto" src={image} alt="" />
    </a>
  </li>
);

SlideView.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default SlideView;
