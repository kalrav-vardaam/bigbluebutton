import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { unshareScreen } from '/imports/ui/components/screenshare/service';
import ScreensharePresenterView from './ScreensharePresenterView';

const ScreenSharePresenterContainer = ({ handleUnshareScreen }) => (
  <ScreensharePresenterView
    handleUnshareScreen={handleUnshareScreen}
  />
);

export default withTracker(() => ({
  handleUnshareScreen: () => unshareScreen(),
}))(ScreenSharePresenterContainer);
