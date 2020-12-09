import { Meteor } from 'meteor/meteor';
import Screens from '/imports/api/screens';
import Logger from '/imports/startup/server/logger';
import { extractCredentials } from '/imports/api/common/server/helpers';

function screens() {
  if (!this.userId) {
    return Screens.find({ meetingId: '' });
  }
  const { meetingId, requesterUserId } = extractCredentials(this.userId);

  Logger.debug(`Publishing Screens for ${meetingId} ${requesterUserId}`);

  return Screens.find({ meetingId });
}

function publish(...args) {
  const boundScreens = screens.bind(this);
  return boundScreens(...args);
}

Meteor.publish('screens', publish);
