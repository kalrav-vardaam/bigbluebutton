import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PresentationOverlay from './component';

const HAND_TOOL = 'hand';

const PresentationOverlayContainer = props => (
  <PresentationOverlay {...props} />
);

export default withTracker(() => ({
  annotationTool: HAND_TOOL,
}))(PresentationOverlayContainer);
