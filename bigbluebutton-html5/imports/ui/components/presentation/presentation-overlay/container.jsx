import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PresentationOverlay from './component';
import WhiteboardToolbarService from '../../whiteboard/whiteboard-toolbar/service';

const PresentationOverlayContainer = props => (
  <PresentationOverlay {...props} />
);

export default withTracker(() => {
  const drawSettings = WhiteboardToolbarService.getCurrentDrawSettings();
  const tool = drawSettings ? drawSettings.whiteboardAnnotationTool : '';

  return {
    annotationTool: tool,
  };
})(PresentationOverlayContainer);
