import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import PresentationService from '/imports/ui/components/presentation/service';
import MediaService from '/imports/ui/components/media/service';
import Service from '/imports/ui/components/actions-bar/service';
import PresentationFooterToolbarView from './PresentationFooterToolbarView';
import PresentationToolbarService from './service';
import { HUNDRED_PERCENT, MAX_PERCENT, STEP } from '/imports/utils/slideCalcUtils';

const PresentationFooterToolbarContainer = ({
  userIsPresenter,
  previousSlide,
  nextSlide,
  currentSlideNum,
  numberOfSlides,
  podId,
  zoom,
  zoomChanger,
  isMeteorConnected,
  ...props
}) => {
  const startOfSlides = !(currentSlideNum > 1);
  const endOfSlides = !(currentSlideNum < numberOfSlides);

  const handleNextSlide = () => {
    nextSlide(currentSlideNum, numberOfSlides, podId);
  };

  const handlePreviousSlide = () => {
    previousSlide(currentSlideNum, podId);
  };

  const change = (value) => {
    zoomChanger(value);
  };

  return userIsPresenter && (
  <PresentationFooterToolbarView
    {...props}
    handlePreviousSlide={handlePreviousSlide}
    handleNextSlide={handleNextSlide}
    startOfSlides={startOfSlides}
    endOfSlides={endOfSlides}
    currentSlideNum={currentSlideNum}
    zoomValue={zoom}
    change={change}
    minBound={HUNDRED_PERCENT}
    maxBound={MAX_PERCENT}
    step={STEP}
    isMeteorConnected={isMeteorConnected}

  />
  );
};


export default withTracker(({
  podId,
  presentationId,
}) => ({
  amIPresenter: Service.amIPresenter(),
  layoutSwapped: MediaService.getSwapLayout() && MediaService.shouldEnableSwapLayout(),
  userIsPresenter: PresentationService.isPresenter(podId),
  numberOfSlides: PresentationToolbarService.getNumberOfSlides(podId, presentationId),
  nextSlide: PresentationToolbarService.nextSlide,
  previousSlide: PresentationToolbarService.previousSlide,
  isMeteorConnected: Meteor.status().connected,
  currentSlidHasContent: PresentationService.currentSlidHasContent(),
  parseCurrentSlideContent: PresentationService.parseCurrentSlideContent,
}))(PresentationFooterToolbarContainer);
