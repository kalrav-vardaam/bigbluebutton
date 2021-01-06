import React, { useState, useRef } from 'react';

import { styles } from './styles.scss';
import ExternalVideoContainer from '../external-video-player/container';
import PresentationTopToolbarContainer from '../presentation/presentation-top-toolbar';

const ExternalVideoWrapper = ({
  isPresenter,
  url,
  position,
  visible,
}) => {
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const videoWrapperRef = useRef(null);

  const handleFullScreenModeChange = () => {
    setFullScreenMode(!fullScreenMode);
  };

  const renderPresentationTopToolbar = () => (
    <PresentationTopToolbarContainer
      fitToWidth={false}
      isFullscreen={fullScreenMode}
      fullscreenRef={videoWrapperRef.current}
      position={position}
      onFullScreenModeChange={handleFullScreenModeChange}
    />
  );

  return (
    <div
      ref={videoWrapperRef}
      className={styles.videoWrapperContainer}
    >
      {isPresenter
        ? renderPresentationTopToolbar()
        : null}
      <div className={styles.videoWrapper}>
        <ExternalVideoContainer
          isPresenter={isPresenter}
          url={url}
          visible={visible}
        />
      </div>
    </div>
  );
};

export default ExternalVideoWrapper;
