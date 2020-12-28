import React from 'react';
import SlideView from './SlideView';

const SlideContainer = ({
  id,
  name,
  image,
  pageNum,
  selectedSlide,
  onSlideChange,
}) => {
  const handleSlideClick = (e, pageNumber) => {
    e.preventDefault();
    onSlideChange(pageNumber);
  };

  return (
    <SlideView
      key={id}
      name={name}
      image={image}
      handleSlideClick={(e, pageNumber) => handleSlideClick(e, pageNumber)}
      pageNum={pageNum}
      selectedSlide={selectedSlide}
    />
  );
};

export default SlideContainer;
