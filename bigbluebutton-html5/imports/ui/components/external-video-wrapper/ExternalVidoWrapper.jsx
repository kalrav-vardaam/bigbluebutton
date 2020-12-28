import React, { useRef } from 'react';

import { styles } from './styles.scss';
import ExternalVideoContainer from '../external-video-player/container';
import PresentationTopToolbarContainer from '../presentation/presentation-top-toolbar';

const ExternalVideoWrapper = ({ isPresenter, url }) => {
  let videoWrapperRef = useRef(null);

  const renderPresentationTopToolbar = () => (
    <PresentationTopToolbarContainer
      fitToWidth={false}
      isFullscreen={false}
      fullscreenRef={videoWrapperRef}
    />
  );

  return (
    <div
      ref={(ref) => { videoWrapperRef = ref; }}
      className={styles.videoWrapperContainer}
    >
      {isPresenter
        ? renderPresentationTopToolbar()
        : null}
      <div className={styles.videoWrapper}>
        <ExternalVideoContainer
          isPresenter={isPresenter}
          url={url}
        />
      </div>
    </div>
  );
};

export default ExternalVideoWrapper;
