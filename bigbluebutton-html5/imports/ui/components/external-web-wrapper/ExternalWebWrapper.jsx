import React, { useState, useRef } from 'react';

import { styles } from './styles.scss';
import ExternalWebContainer from '../external-web-frame';
import PresentationTopToolbarContainer from '../presentation/presentation-top-toolbar';

const ExternalWebWrapper = ({
  isPresenter,
  url,
  position,
  visible,
}) => {
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const WebWrapperRef = useRef(null);

  const handleFullScreenModeChange = () => {
    setFullScreenMode(!fullScreenMode);
  };

  const renderPresentationTopToolbar = () => (
    <PresentationTopToolbarContainer
      fitToWidth={false}
      isFullscreen={fullScreenMode}
      fullscreenRef={WebWrapperRef.current}
      position={position}
      onFullScreenModeChange={handleFullScreenModeChange}
    />
  );

  return (
    <div
      ref={WebWrapperRef}
      className={styles.webWrapperContainer}
    >
      {isPresenter
        ? renderPresentationTopToolbar()
        : null}
      <div className={styles.webWrapper}>
        <ExternalWebContainer
          isPresenter={isPresenter}
          url={url}
          visible={visible}
        />
      </div>
    </div>
  );
};

export default ExternalWebWrapper;
