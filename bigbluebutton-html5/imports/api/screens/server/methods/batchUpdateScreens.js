import { check } from 'meteor/check';
import Screens from '/imports/api/screens';
import Logger from '/imports/startup/server/logger';

export default function batchUpdateScreens(newScreens) {
  check(newScreens, [Object]);

  const { meetingID } = newScreens[0];

  const cb = (err, numChanged) => {
    if (err) {
      return Logger.error(`updating screen : ${err}`);
    }

    return Logger.info(`Updated Screen modified document=${numChanged}`);
  };

  newScreens.forEach(({ _id, ...screen }) => {
    const selector = {
      _id,
    };

    Screens.upsert(selector, screen, cb);
  });

  return Logger.info(`Screens updated for meeting=${meetingID}`);
}
