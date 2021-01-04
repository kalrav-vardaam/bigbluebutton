import { Meteor } from 'meteor/meteor';
import WebList from '/imports/api/web-list';
import Logger from '/imports/startup/server/logger';
import { extractCredentials } from '/imports/api/common/server/helpers';

function webList() {
  if (!this.userId) {
    return WebList.find({ meetingId: '' });
  }
  const { meetingId, requesterUserId } = extractCredentials(this.userId);

  Logger.debug(`Publishing web List for ${meetingId} ${requesterUserId}`);

  return WebList.find({ meetingId });
}

function publish(...args) {
  const boundScreens = webList.bind(this);
  return boundScreens(...args);
}

Meteor.publish('web-list', publish);
