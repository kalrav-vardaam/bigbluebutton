import React, { useState } from 'react';

import { makeCall } from '/imports/ui/services/api';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '../modal/service';

import Meetings from '/imports/api/meetings';

import AppView from './AppView';

const AppContainer = ({ whiteboardOverlay, ...props }) => {
  const [isMenuOpen, setIsmenuOpen] = useState(false);

  const handleWhiteboardClick = () => {
    makeCall('toggleWhiteboardOverlay');
  };

  const handleMenuToggle = (value) => {
    setIsmenuOpen(value);
  };

  return (
    <AppView
      {...props}
      whiteboardOverlay={whiteboardOverlay}
      handleWhiteboardClick={handleWhiteboardClick}
      isMenuOpen={isMenuOpen}
      onMenuToggle={handleMenuToggle}
    />
  );
};

export default withModalMounter(withTracker(({ User }) => {
  const { meetingId, presenter } = User;
  const meetingObject = Meetings.findOne({ meetingId });
  const whiteboardOverlay = (meetingObject && meetingObject.whiteboardOverlay) || false;
  return {
    whiteboardOverlay,
    isPresenter: presenter,
  };
})(AppContainer));
