import React from 'react';

import { IconButton } from '../../common';
import FullscreenButtonContainer from '/imports/ui/components/fullscreen-button';

const ALLOW_FULLSCREEN = Meteor.settings.public.app.allowFullscreen;

const PresentationTopToolbarView = ({
  isFullscreen,
  fullscreenRef,
}) => (
  <div className="text-right mx-3 mt-3 absolute top-0 right-0 z-10">
    <IconButton
      size="sm"
      icon="minimize"
    />
    <IconButton
      size="sm"
      icon="full-width"
    />
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
