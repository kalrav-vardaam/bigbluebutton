import { check } from 'meteor/check';
import Screens from '/imports/api/screens';
import Logger from '/imports/startup/server/logger';

export default function changeFullScreen(meetingId, component) {
  check(meetingId, String);
  check(component, String);

  const oldFullScreen = {
    selector: {
      meetingId,
      fullScreen: true,
    },
    modifier: {
      $set: { fullScreen: false },
    },
    callback: (err) => {
      if (err) {
        return Logger.error(`Unsetting the fullscreen for presentation: ${err}`);
      }

      return Logger.info('Unsetted fullscreen presentation');
    },
  };

  const newFullScreen = {
    selector: {
      meetingId,
      component,
    },
    modifier: {
      $set: { fullScreen: true },
    },
    callback: (err) => {
      if (err) {
        return Logger.error(`Setting as fullscreen for presentation in meeitng=${meetingId}: ${err}`);
      }

      return Logger.info(`Setted as fullscreen for presentation in meeting=${meetingId}`);
    },
  };

  const oldFullScreenPresentation = Screens.findOne(oldFullScreen.selector);
  const newFullScreenPresentation = Screens.findOne(newFullScreen.selector);

  // Prevent bug with presentation being unset, same happens in the slide
  // See: https://github.com/bigbluebutton/bigbluebutton/pull/4431
  if (oldFullScreenPresentation
    && newFullScreenPresentation
    && (oldFullScreenPresentation._id === newFullScreenPresentation._id)) {
    return;
  }

  if (newFullScreenPresentation) {
    Screens.update(newFullScreenPresentation._id, newFullScreen.modifier, newFullScreen.callback);
  }

  if (oldFullScreenPresentation) {
    Screens.update(oldFullScreenPresentation._id, oldFullScreen.modifier, oldFullScreen.callback);
  }
}
