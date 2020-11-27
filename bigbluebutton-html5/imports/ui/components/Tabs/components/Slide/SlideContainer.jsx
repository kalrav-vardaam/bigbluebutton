import React from 'react';
import SlideView from './SlideView';

const SlideContainer = ({
  id,
  name,
  image,
  skipToSlide,
  pageNum,
}) => {
  const handleSlideClick = (e, pageNumber) => {
    e.preventDefault();
    skipToSlide(pageNumber, 'DEFAULT_PRESENTATION_POD');
  };

  return (
    <SlideView
      key={id}
      name={name}
      image={image}
      handleSlideClick={(e, pageNumber) => handleSlideClick(e, pageNumber)}
      pageNum={pageNum}
    />
  );
};

export default SlideContainer;
