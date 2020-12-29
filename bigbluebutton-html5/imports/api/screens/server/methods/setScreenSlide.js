import { check } from 'meteor/check';
import Screens from '/imports/api/screens';
import Logger from '/imports/startup/server/logger';

export default function setScreenSlide(meetingId, position, presentationId, slideId) {
  check(meetingId, String);
  check(position, String);
  check(presentationId, String);
  check(slideId, String);

  const selector = {
    meetingId,
    position,
  };

  const modifier = {
    $set: {
      otherParams: {
        presentationId,
        slideId,
      },
    },
  };

  const cb = (err) => {
    if (err) {
      return Logger.error(`Updating slide for screen=${position} meeting=${meetingId}: ${err}`);
    }

    return Logger.info(`Updated slide for screen=${position} meeting=${meetingId}`);
  };

  return Screens.update(selector, modifier, cb);
}
