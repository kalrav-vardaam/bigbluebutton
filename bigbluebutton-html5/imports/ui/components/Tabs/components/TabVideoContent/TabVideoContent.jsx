import React from 'react';

import TabPositionButtonGroup from '../TabPositionButtonGroup';
import { Button } from '../../../common';

const TabVideoContent = ({
  isSharingVideo,
  stopExternalVideoShare,
  allowExternalVideo,
  handleExternalVideoClick,
}) => (
  <div className="w-full py-3 flex flex-col overflow-y-scroll" id="#Link3">
    <TabPositionButtonGroup />

    {allowExternalVideo && (
      <span className="rounded-md mx-4 shadow-sm mb-3">
        <Button
          size="lg"
          color="primary"
          onClick={isSharingVideo ? stopExternalVideoShare : handleExternalVideoClick}
        >
          <img src="images/video.svg" className="inline-block w-1/12" alt="" />
          <span className="w-full text-left text-md pl-4">
            {isSharingVideo ? 'Stop External Video' : 'Share External Video'}
          </span>
        </Button>
      </span>
    )}
  </div>
);
export default TabVideoContent;
