import { Meteor } from 'meteor/meteor';
import VideoList from '/imports/api/video-list';
import Logger from '/imports/startup/server/logger';
import { extractCredentials } from '/imports/api/common/server/helpers';

function videoList() {
  if (!this.userId) {
    return VideoList.find({ meetingId: '' });
  }
  const { meetingId, requesterUserId } = extractCredentials(this.userId);

  Logger.debug(`Publishing video List for ${meetingId} ${requesterUserId}`);

  return VideoList.find({ meetingId });
}

function publish(...args) {
  const boundScreens = videoList.bind(this);
  return boundScreens(...args);
}

Meteor.publish('video-list', publish);
