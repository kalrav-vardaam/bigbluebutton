import React from 'react';

import { IconButton } from '../../common';
import FullscreenButtonContainer from '/imports/ui/components/fullscreen-button';

const ALLOW_FULLSCREEN = Meteor.settings.public.app.allowFullscreen;

const PresentationTopToolbarView = ({
  isFullscreen,
  fullscreenRef,
  isSplitScreen,
  position,
  onFullScreenChange,
}) => (
  <div className="text-right mx-3 mt-3 absolute top-0 right-0 z-50">
    {
      isSplitScreen && !isFullscreen
        ? (
          <IconButton
            size="sm"
            icon="full-width"
            onClick={() => onFullScreenChange(position)}
          />
        )
        : null
    }
    {
      ALLOW_FULLSCREEN
        ? (
          <FullscreenButtonContainer
            fullscreenRef={fullscreenRef}
            isFullscreen={isFullscreen}
          />
        )
        : null
    }
  </div>
);

export default PresentationTopToolbarView;
