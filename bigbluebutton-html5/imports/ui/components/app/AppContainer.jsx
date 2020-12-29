import React from 'react';

import { makeCall } from '/imports/ui/services/api';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '../modal/service';

import Meetings from '/imports/api/meetings';

import AppView from './AppView';

const AppContainer = ({ whiteboardOverlay, ...props }) => {
  const handleWhiteboardClick = () => {
    makeCall('toggleWhiteboardOverlay');
  };

  return (
    <AppView
      {...props}
      whiteboardOverlay={whiteboardOverlay}
      handleWhiteboardClick={handleWhiteboardClick}
    />
  );
};

export default withModalMounter(withTracker(({ User }) => {
  const { meetingId } = User;
  const meetingObject = Meetings.findOne({ meetingId });
  const whiteboardOverlay = meetingObject?.whiteboardOverlay || false;
  return {
    whiteboardOverlay,
  };
})(AppContainer));
