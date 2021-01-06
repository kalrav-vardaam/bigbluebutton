import React, { Fragment } from 'react';

import { IconButton } from '/imports/ui/components/common';
import ZoomTool from './zoom-tool';

const PresentationBottomToolbarView = ({
  currentSlideNum,
  endOfSlides,
  handlePreviousSlide,
  handleNextSlide,
  isMeteorConnected,
  startOfSlides,
  isMobileBrowser,
  minBound,
  maxBound,
  step,
  zoomValue,
  onChange,
}) => (
  <Fragment>
    <div className="text-left mx-3 mb-3 absolute bottom-0 left-0 z-50">
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
    <div className="text-right mx-3 mb-3 absolute bottom-0 right-0 z-50">

      {
        !isMobileBrowser
          ? (
            <ZoomTool
              zoomValue={zoomValue}
              change={onChange}
              minBound={minBound}
              maxBound={maxBound}
              step={step}
              isMeteorConnected={isMeteorConnected}
            />
          )
          : null
      }

    </div>
  </Fragment>
);

export default PresentationBottomToolbarView;
