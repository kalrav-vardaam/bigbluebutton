import Logger from '/imports/startup/server/logger';
import Meetings from '/imports/api/meetings';
import { extractCredentials } from '/imports/api/common/server/helpers';

export default function toggleWhiteboardOverlay() {
  const { meetingId } = extractCredentials(this.userId);

  const meetingObject = Meetings.findOne({ meetingId });

  const whiteboardOverlay = meetingObject?.whiteboardOverlay || false;

  const selector = {
    meetingId,
  };

  const modifier = {
    $set: { whiteboardOverlay: !whiteboardOverlay },
  };

  const cb = (err) => {
    if (err) {
      return Logger.error(`Updating whiteboard for meeting=${meetingId}: ${err}`);
    }

    return Logger.info(`Updated whiteboard for meeting=${meetingId}`);
  };

  return Meetings.update(selector, modifier, cb);
}
