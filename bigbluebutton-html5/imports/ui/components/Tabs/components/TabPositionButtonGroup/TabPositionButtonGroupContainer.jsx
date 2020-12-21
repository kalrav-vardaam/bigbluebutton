import React, { useState } from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { makeCall } from '/imports/ui/services/api';

import Auth from '/imports/ui/services/auth';
import Screens from '/imports/api/screens';
import { getNewScreensPositions } from '/imports/api/screens/client/getScreensPositions';
import TabPositionButtonGroup from './TabPositionButtonGroup';

const TabPositionButtonGroupContainer = ({ renderComponent, screens }) => {
  const [position, setPosition] = useState('full');

  const handleButtonClick = (newPosition) => {
    setPosition(newPosition);

    const newScreens = getNewScreensPositions({
      oldScreens: screens,
      meetingId: Auth.meetingID,
      component: renderComponent,
      position: newPosition,
    });

    makeCall('batchUpdateScreens', Auth.meetingID, newScreens);
  };

  return (
    <TabPositionButtonGroup
      position={position}
      handleButtonClick={handleButtonClick}
    />
  );
};

export default withTracker(() => ({
  screens: Screens.find().fetch(),
}))(TabPositionButtonGroupContainer);
