import { check } from 'meteor/check';
import Screens from '/imports/api/screens';
import Logger from '/imports/startup/server/logger';

export default function batchUpdateScreens(meetingId, newScreens) {
  check(meetingId, String);
  check(newScreens, [Object]);

  const cb = (err, numChanged) => {
    if (err) {
      return Logger.error(`updating screen : ${err}`);
    }

    return Logger.info(`Updated Screen modified document=${numChanged}`);
  };

  Screens.remove({ meetingId });

  newScreens.forEach(async (screen) => {
    const MeetingScreen = {
      meetingId,
      ...screen,
    };

    Screens.insert(MeetingScreen, cb);
  });

  return Logger.info(`Screens updated for meeting=${meetingId}`);
}
