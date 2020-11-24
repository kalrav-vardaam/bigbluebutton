import React, { useState } from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '../modal/service';
import PresentationUploaderService from '/imports/ui/components/presentation/presentation-uploader/service';
import PresentationPodService from '/imports/ui/components/presentation-pod/service';

import AppView from './AppView';

const AppContainer = ({ ...props }) => {
  const [whiteboardOverlay, setWhiteboardOverlay] = useState(false);

  const handleWhiteboardClick = () => {
    setWhiteboardOverlay(!whiteboardOverlay);
  };

  return (
    <AppView
      {...props}
      whiteboardOverlay={whiteboardOverlay}
      handleWhiteboardClick={handleWhiteboardClick}
    />
  );
};

export default withModalMounter(withTracker(() => ({
  allPresentations: PresentationUploaderService.getPresentations(),
  setPresentation: PresentationUploaderService.setPresentation,
  podIds: PresentationPodService.getPresentationPodIds(),
}))(AppContainer));
