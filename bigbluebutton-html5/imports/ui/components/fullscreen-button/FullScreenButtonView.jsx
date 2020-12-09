import React from 'react';

import { IconButton } from '/imports/ui/components/common';

const FullScreenButtonView = ({
  fullscreenRef,
  handleToggleFullScreen,
  isIphone,
  isFullscreen,
}) => {
  if (isIphone) return null;
  return (
    <IconButton
      size="sm"
      icon={!isFullscreen ? 'full-window' : 'exit-fullscreen'}
      onClick={() => handleToggleFullScreen(fullscreenRef)}
    />
  );
};

export default FullScreenButtonView;
