import RedisPubSub from '/imports/startup/server/redis';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { extractCredentials } from '/imports/api/common/server/helpers';
import Logger from '/imports/startup/server/logger';

export default function undoAnnotation(whiteboardId) {
  const REDIS_CONFIG = Meteor.settings.private.redis;
  const CHANNEL = REDIS_CONFIG.channels.toAkkaApps;
  const EVENT_NAME = 'UndoWhiteboardPubMsg';

  const { meetingId, requesterUserId } = extractCredentials(this.userId);

  check(whiteboardId, String);

  const payload = {
    whiteboardId,
  };

  Logger.info(`channel - ${CHANNEL} event name- ${EVENT_NAME} meeting Id - ${meetingId} userid - ${requesterUserId} payload - ${JSON.stringify(payload)}`);
  return RedisPubSub.publishUserMessage(CHANNEL, EVENT_NAME, meetingId, requesterUserId, payload);
}
