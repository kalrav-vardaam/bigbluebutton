import Auth from '/imports/ui/services/auth';
import Presentations from '/imports/api/presentations';
import { makeCall } from '/imports/ui/services/api';
import { throttle } from 'lodash';
import Slides from '/imports/api/slides';

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

const previousSlide = (currentSlideNum, podId, presentationId) => {
  if (currentSlideNum > 1) {
    makeCall('switchSlide', currentSlideNum - 1, podId, presentationId);
  }
};

const nextSlide = (currentSlideNum, numberOfSlides, podId, presentationId) => {
  if (currentSlideNum < numberOfSlides) {
    makeCall('switchSlide', currentSlideNum + 1, podId, presentationId);
  }
};

const zoomSlide = throttle((currentSlideNum, podId, widthRatio, heightRatio, xOffset, yOffset) => {
  makeCall('zoomSlide', currentSlideNum, podId, widthRatio, heightRatio, xOffset, yOffset);
}, PAN_ZOOM_INTERVAL);

const skipToSlide = (requestedSlideNum, podId, presentationId) => {
  makeCall('switchSlide', requestedSlideNum, podId, presentationId);
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

export default {
  getNumberOfSlides,
  nextSlide,
  previousSlide,
  skipToSlide,
  zoomSlide,
  getSlideId,
};
