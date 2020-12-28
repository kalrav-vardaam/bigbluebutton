import { check } from 'meteor/check';
import setNewScreen from './setNewScreen';

export default function batchUpdateScreens(meetingId, newScreens) {
  check(meetingId, String);
  check(newScreens, [Object]);

  return newScreens.forEach(screen => setNewScreen(meetingId, screen));
}
