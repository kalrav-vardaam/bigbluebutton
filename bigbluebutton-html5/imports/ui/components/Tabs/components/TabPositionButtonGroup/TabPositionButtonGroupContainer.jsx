import React, { useState } from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { makeCall } from '/imports/ui/services/api';

import Auth from '/imports/ui/services/auth';
import Screens from '/imports/api/screens';
import { getNewScreensPositions } from '/imports/api/common/client/getScreensPositions';
import TabPositionButtonGroup from './TabPositionButtonGroup';
import PresentationToolbarService from '/imports/ui/components/presentation/presentation-bottom-toolbar/service';

const TabPositionButtonGroupContainer = ({
  selectedSlide,
  renderComponent,
  screens,
  otherParams,
  skipToSlide,
}) => {
  const [position, setPosition] = useState('full');

  const handleButtonClick = (newPosition) => {
    setPosition(newPosition);

    const newScreens = getNewScreensPositions({
      oldScreens: screens,
      component: renderComponent,
      position: newPosition,
      otherParams,
    });

    if (otherParams && otherParams.slideId) {
      skipToSlide(selectedSlide, 'DEFAULT_PRESENTATION_POD', otherParams.presentationId);
    }

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
  skipToSlide: PresentationToolbarService.skipToSlide,
}))(TabPositionButtonGroupContainer);
