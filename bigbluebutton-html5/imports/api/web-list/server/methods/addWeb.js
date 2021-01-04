import { check } from 'meteor/check';
import WebList from '/imports/api/web-list';
import Logger from '/imports/startup/server/logger';

export default function addWeb(meetingId, webURL) {
  check(meetingId, String);
  check(webURL, String);

  const selector = {
    meetingId,
    webURL,
  };

  const modifier = {
    $set: {
      meetingId,
      webURL,
    },
  };

  const cb = (err, numChanged) => {
    if (err) {
      return Logger.error(`updating web list : ${err}`);
    }

    return Logger.info(`Updated Web List modified document=${numChanged}`);
  };

  return WebList.upsert(selector, modifier, cb);
}
