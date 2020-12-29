import { check } from 'meteor/check';
import Screens from '/imports/api/screens';
import Logger from '/imports/startup/server/logger';

export default function setFullScreen(meetingId, position) {
  check(meetingId, String);
  check(position, String);

  const selector = {
    meetingId,
    position,
  };

  const modifier = {
    $set: { fullScreen: true },
  };

  const cb = (err) => {
    if (err) {
      return Logger.error(`Updating fullscreen for =${position} meeting=${meetingId}: ${err}`);
    }

    return Logger.info(`Updated fullscreen=${position} meeting=${meetingId}`);
  };

  return Screens.update(selector, modifier, cb);
}
