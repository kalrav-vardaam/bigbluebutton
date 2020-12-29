import { check } from 'meteor/check';
import Screens from '/imports/api/screens';
import Logger from '/imports/startup/server/logger';

export default function setNewScreen(meetingId, screen) {
  check(meetingId, String);
  check(screen, Object);

  if (screen) {
    const selector = {
      meetingId,
      position: screen.position,
    };

    const modifier = {
      $set: screen,
    };
    const cb = (err) => {
      if (err) {
        return Logger.error(`Updating screen=${screen.position} meeting=${meetingId}: ${err}`);
      }

      return Logger.info(`Updated screen=${screen.position} meeting=${meetingId}`);
    };

    return Screens.update(selector, modifier, cb);
  }
  return null;
}
