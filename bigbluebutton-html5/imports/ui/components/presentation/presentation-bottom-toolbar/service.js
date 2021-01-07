import Auth from '/imports/ui/services/auth';
import Presentations from '/imports/api/presentations';
import { makeCall } from '/imports/ui/services/api';
import { throttle } from 'lodash';
import { Slides } from '/imports/api/slides';

const PAN_ZOOM_INTERVAL = Meteor.settings.public.presentation.panZoomInterval || 200;

const getNumberOfSlides = (podId, presentationId) => {
  const meetingId = Auth.meetingID;

  const presentation = Presentations.findOne({
    meetingId,
    podId,
    id: presentationId,
  });

  return presentation ? presentation.pages.length : 0;
};

const getSlideId = (currentSlideNum, presentationId) => {
  const meetingId = Auth.meetingID;
  const slide = Slides.findOne({
    meetingId,
    presentationId,
    num: currentSlideNum,
  });

  return slide ? slide.id : null;
};

const previousSlide = (currentSlideNum, podId, presentationId, position) => {
  if (currentSlideNum > 1) {
    makeCall('switchSlide', currentSlideNum - 1, podId, presentationId);

    const newSlideId = getSlideId(currentSlideNum - 1, presentationId);

    makeCall('setScreenSlide', Auth.meetingID, position, presentationId, newSlideId);
  }
};

const nextSlide = (currentSlideNum, numberOfSlides, podId, presentationId, position) => {
  if (currentSlideNum < numberOfSlides) {
    makeCall('switchSlide', currentSlideNum + 1, podId, presentationId);

    const newSlideId = getSlideId(currentSlideNum + 1, presentationId);

    makeCall('setScreenSlide', Auth.meetingID, position, presentationId, newSlideId);
  }
};

const zoomSlide = throttle(
  (
    currentSlideNum,
    podId,
    presentationId,
    widthRatio,
    heightRatio,
    xOffset,
    yOffset,
  ) => {
    makeCall('zoomSlide', currentSlideNum, podId, presentationId, widthRatio, heightRatio, xOffset, yOffset);
  }, PAN_ZOOM_INTERVAL,
);

const skipToSlide = (requestedSlideNum, podId, presentationId) => {
  makeCall('switchSlide', requestedSlideNum, podId, presentationId);
};

export default {
  getNumberOfSlides,
  nextSlide,
  previousSlide,
  skipToSlide,
  zoomSlide,
  getSlideId,
};
