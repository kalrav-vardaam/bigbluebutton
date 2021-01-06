import React, { Fragment } from 'react';

import TabPositionButtonGroupContainer from '../TabPositionButtonGroup';
import { Button } from '/imports/ui/components/common';

const TabWebContent = ({
  webUrl,
  selectedItem,
  onAddWebClick,
  onChangeWebUrl,
  onSelectedUrl,
  webList,
  renderUrlError,
  addDisabled,
}) => (
  <Fragment>
    <div className="w-full py-3 flex flex-col" id="#Link3">
      <TabPositionButtonGroupContainer
        renderComponent="web"
        otherParams={{
          url: selectedItem.webURL,
        }}
      />
      <div className="rounded-md mx-4 shadow-sm">
        <input
          name="video-url-input"
          className="w-full h-full rounded-md py-2 px-3 text-gray-700 mb-2"
          value={webUrl}
          onChange={e => onChangeWebUrl(e.target.value)}
        />
      </div>
      <div className="mx-4 mb-1 h-6">
        {renderUrlError()}
      </div>
      <div className="rounded-md mx-4 shadow-sm mb-3">
        <Button
          size="lg"
          color="secondary"
          onClick={onAddWebClick}
          disabled={addDisabled}
          miscClass={addDisabled ? 'cursor-not-allowed' : null}
        >
          Add Website
        </Button>
      </div>
    </div>
    <div className="overflow-y-scroll">
      {
        webList ? (
          <ul className="list-disc">
            {
              webList.map(({ _id, webURL }) => (
                <li
                  className={`p-3 bg-gray-200 hover:bg-gray-300 cursor-pointer border ${_id === selectedItem._id ? 'border-red-500' : ''}`}
                  key={_id}
                  onClick={() => onSelectedUrl({ _id, webURL })}
                  onKeyPress={() => { }}
                  role="menuitem"
                >
                  {webURL}
                </li>
              ))
            }
          </ul>
        ) : null
      }
    </div>
  </Fragment>
);

export default TabWebContent;
