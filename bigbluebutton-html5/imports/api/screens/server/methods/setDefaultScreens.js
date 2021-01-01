import { check } from 'meteor/check';
import Screens from '/imports/api/screens';
import Logger from '/imports/startup/server/logger';

export default function setDefaultScreens(meetingId) {
  check(meetingId, String);

  Logger.info('inside default screen call');

  const findCollection = Screens.find({ meetingId }).fetch();

  if (findCollection) {
    Logger.info(`Old screens found for meeting=${meetingId}`);

    Screens.remove({ meetingId });

    Logger.info(`Removed screens for  meeting=${meetingId}`);
  }

  const cb = (err, insertedId) => {
    if (err) {
      return Logger.error(`Adding screen to collection: ${err}`);
    }

    if (insertedId) {
      // set left & right screens
      return Logger.info(`Added screens for meeting=${meetingId}`);
    }

    return Logger.info(`Screens are added for meeting=${meetingId}`);
  };

  const screens = [
    {
      meetingId,
      position: 'left',
      component: 'presentation',
      fullScreen: true,
      visible: true,
    },
    {
      meetingId,
      position: 'right',
      component: 'presentation',
      fullScreen: false,
      visible: false,
    },
  ];

  // add new records for default screens
  screens.forEach(async (screen) => {
    const MeetingScreen = {
      meetingId,
      ...screen,
    };

    Screens.insert(MeetingScreen, cb);
  });

  return true;
}
