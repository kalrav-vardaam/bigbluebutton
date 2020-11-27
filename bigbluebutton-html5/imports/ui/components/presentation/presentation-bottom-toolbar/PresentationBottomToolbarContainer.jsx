import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import PresentationService from '/imports/ui/components/presentation/service';
import MediaService from '/imports/ui/components/media/service';
import Service from '/imports/ui/components/actions-bar/service';
import browser from 'browser-detect';
import PresentationBottomToolbarView from './PresentationBottomToolbarView';
import PresentationToolbarService from './service';
import { HUNDRED_PERCENT, MAX_PERCENT, STEP } from '/imports/utils/slideCalcUtils';

const PresentationBottomToolbarContainer = ({
  userIsPresenter,
  previousSlide,
  nextSlide,
  currentSlideNum,
  numberOfSlides,
  podId,
  zoom,
  zoomValue,
  zoomChanger,
  isMeteorConnected,
  ...props
}) => {
  const startOfSlides = !(currentSlideNum > 1);

  const endOfSlides = !(currentSlideNum < numberOfSlides);

  const BROWSER_RESULTS = browser();

  const isMobileBrowser = BROWSER_RESULTS.mobile
    || BROWSER_RESULTS.os.includes('Android');

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
    <PresentationBottomToolbarView
      {...props}
      change={change}
      currentSlideNum={currentSlideNum}
      endOfSlides={endOfSlides}
      handlePreviousSlide={handlePreviousSlide}
      handleNextSlide={handleNextSlide}
      isMeteorConnected={isMeteorConnected}
      isMobileBrowser={isMobileBrowser}
      minBound={HUNDRED_PERCENT}
      maxBound={MAX_PERCENT}
      startOfSlides={startOfSlides}
      step={STEP}
      zoomValue={zoom}
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
}))(PresentationBottomToolbarContainer);