import { check } from 'meteor/check';
import Screens from '/imports/api/screens';
import Logger from '/imports/startup/server/logger';

export default function changePosition(meetingId, component, position) {
  check(meetingId, String);
  check(component, String);
  check(position, String);

  const revPosition = (position === 'left') ? 'right' : 'left';

  const oldPosition = {
    selector: {
      meetingId,
      position,
    },
    modifier: {
      $set: { position: revPosition },
    },
    callback: (err) => {
      if (err) {
        return Logger.error(`Unsetting the position for presentation: ${err}`);
      }

      return Logger.info(`Unsetted position=${position} presentation`);
    },
  };

  const newPosition = {
    selector: {
      meetingId,
      component,
    },
    modifier: {
      $set: { position, component },
    },
    callback: (err) => {
      if (err) {
        return Logger.error(`Setting the position meeting=${meetingId}: ${err}`);
      }

      return Logger.info(`Setted the position meeting=${meetingId}`);
    },
  };

  const oldPositionPresentation = Screens.findOne(oldPosition.selector);
  const newPositionPresentation = Screens.findOne(newPosition.selector);

  if (oldPositionPresentation
    && newPositionPresentation
    && (oldPositionPresentation._id === newPositionPresentation._id)) {
    return;
  }

  if (newPositionPresentation) {
    Screens.update(newPositionPresentation._id, newPosition.modifier, newPosition.callback);
  }

  if (oldPositionPresentation) {
    Screens.update(oldPositionPresentation._id, oldPosition.modifier, oldPosition.callback);
  }
}
