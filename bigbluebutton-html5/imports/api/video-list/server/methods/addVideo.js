import { check } from 'meteor/check';
import VideoList from '/imports/api/video-list';
import Logger from '/imports/startup/server/logger';

export default function addVideo(meetingId, videoURL) {
  check(meetingId, String);
  check(videoURL, String);

  const selector = {
    meetingId,
    videoURL,
  };

  const modifier = {
    $set: {
      meetingId,
      videoURL,
    },
  };

  const cb = (err, numChanged) => {
    if (err) {
      return Logger.error(`updating video list : ${err}`);
    }

    return Logger.info(`Updated Video List modified document=${numChanged}`);
  };

  return VideoList.upsert(selector, modifier, cb);
}
