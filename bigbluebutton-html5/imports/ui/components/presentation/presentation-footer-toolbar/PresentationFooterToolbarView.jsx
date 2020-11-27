import React, { Fragment } from 'react';
import { IconButton } from '../../common';

const PresentationFooterToolbarView = ({
  handlePreviousSlide,
  handleNextSlide,
  currentSlideNum,
  startOfSlides,
  endOfSlides,
  isMeteorConnected,
}) => (
  <Fragment>
    <div className="text-left mx-3 mb-3 absolute bottom-0 left-0">
      <IconButton
        size="sm"
        icon="chevron-left"
        onClick={handlePreviousSlide}
        disabled={startOfSlides || !isMeteorConnected}
      />
      <IconButton
        size="sm"
        icon="chevron-right"
        onClick={handleNextSlide}
        disabled={endOfSlides || !isMeteorConnected}
      />
    </div>
    <div className="text-center mx-3 mb-5 absolute bottom-0">
      {`Page ${currentSlideNum}`}
    </div>
    <div className="text-right mx-3 mb-3 absolute bottom-0 right-0">
      <IconButton
        size="sm"
        icon="bi-dash"
      />
      <IconButton
        size="sm"
        icon="bi-plus"
        noMargin
      />
    </div>
  </Fragment>
);

export default PresentationFooterToolbarView;
