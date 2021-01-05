import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const SlideView = ({
  name,
  image,
  handleSlideClick,
  pageNum,
  selectedSlide,
}) => (
  <li className={cx(
    'p-3',
    'bg-gray-200',
    'hover:bg-gray-300',
    { 'bg-gray-300': selectedSlide === pageNum },
  )}
  >
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
