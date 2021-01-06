import React from 'react';
import { makeCall } from '/imports/ui/services/api';
import { withTracker } from 'meteor/react-meteor-data';
import Auth from '/imports/ui/services/auth';

import PresentationTopToolbarView from './PresentationTopToolbarView';
import PresentationService from '/imports/ui/components/presentation/service';
import Screens from '/imports/api/screens';

const PresentationTopToolbarContainer = (props) => {
  const handleFullScreenChange = (position) => {
    const { leftScreen, rightScreen } = props;
    let newScreens;

    delete leftScreen._id;
    delete rightScreen._id;

    if (position === 'left') {
      newScreens = [{
        ...leftScreen,
        fullScreen: true,
        visible: true,
      }, {
        ...rightScreen,
        fullScreen: false,
        visible: false,
      }];
    } else if (position === 'right') {
      newScreens = [{
        ...rightScreen,
        position: 'left',
        fullScreen: true,
        visible: true,
      }, {
        ...leftScreen,
        position: 'right',
        fullScreen: false,
        visible: false,
      }];
    }

    makeCall('batchUpdateScreens', Auth.meetingID, newScreens);
  };

  return (
    <PresentationTopToolbarView
      {...props}
      onFullScreenChange={handleFullScreenChange}
    />
  );
};

export default withTracker(() => {
  const screens = Screens.find().fetch();

  return {
    leftScreen: screens.find(screen => screen.position === 'left'),
    rightScreen: screens.find(screen => screen.position === 'right'),
    isSplitScreen: PresentationService.isSplitScreen(),
  };
})(PresentationTopToolbarContainer);
