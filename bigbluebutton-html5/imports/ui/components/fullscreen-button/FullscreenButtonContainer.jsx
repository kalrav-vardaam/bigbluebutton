import React from 'react';
import FullscreenButtonView from './FullScreenButtonView';
import FullscreenService from './service';

const FullscreenButtonContainer = props => <FullscreenButtonView {...props} />;

export default (props) => {
  const handleToggleFullScreen = ref => FullscreenService.toggleFullScreen(ref);
  const isIphone = navigator.userAgent.match(/iPhone/i);
  return (
    <FullscreenButtonContainer {...props} {...{ handleToggleFullScreen, isIphone }} />
  );
};
