import React, { Fragment } from 'react';

import TabPositionButtonGroupContainer from '../TabPositionButtonGroup';
import { Button } from '/imports/ui/components/common';

const TabVideoContent = ({
  videoUrl,
  selectedItem,
  onSelectedUrl,
  onAddVideoClick,
  onChangeVideoUrl,
  renderUrlError,
  videoList,
  startDisabled,
}) => (
  <Fragment>
    <div className="w-full py-3 flex flex-col" id="#Link3">
      <TabPositionButtonGroupContainer
        renderComponent="video"
        otherParams={{
          url: selectedItem.videoURL,
        }}
      />
      <div className="rounded-md mx-4 shadow-sm">
        <input
          name="video-url-input"
          className="w-full h-full rounded-md py-2 px-3 text-gray-700 mb-2"
          value={videoUrl}
          onChange={e => onChangeVideoUrl(e.target.value)}
        />
      </div>
      <div className="mx-4 mb-1 h-6">
        {renderUrlError()}
      </div>
      <div className="rounded-md mx-4 shadow-sm mb-3">
        <Button
          size="lg"
          color="secondary"
          onClick={onAddVideoClick}
          disabled={startDisabled}
          miscClass={startDisabled ? 'cursor-not-allowed' : null}
        >
          Add External Video
        </Button>
      </div>
    </div>
    <div className="overflow-y-scroll">
      {
        videoList ? (
          <ul className="list-disc">
            {
              videoList.map(({ _id, videoURL }) => (
                <li
                  className={`p-3 bg-gray-200 hover:bg-gray-300 cursor-pointer border ${_id === selectedItem._id ? 'border-red-500' : ''}`}
                  key={_id}
                  onClick={() => onSelectedUrl({ _id, videoURL })}
                  onKeyPress={() => { }}
                  role="menuitem"
                >
                  {videoURL}
                </li>
              ))
            }
          </ul>
        ) : null
      }
    </div>
  </Fragment>
);
export default TabVideoContent;
