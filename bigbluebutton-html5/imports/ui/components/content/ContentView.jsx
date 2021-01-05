import React from 'react';
import cx from 'classnames';

import ScreenSharePresenterContainer from '/imports/ui/components/screenshare-presenter';

const ContentView = ({
  left,
  right,
  isScreensharing,
  isPresenter,
  component,
}) => {
  if (isScreensharing) {
    return (
      <div id="mainContent" className="flex flex-auto w-full">
        <div className="py-20 bg-gray-100 m-2 rounded-lg relative flex items-center w-full">
          {
            !isPresenter
              ? component
              : <ScreenSharePresenterContainer />
            }
        </div>
      </div>
    );
  }

  if (left && right) {
    let leftScreenWidthClass = (left.visible) ? 'w-1/2' : 'hidden';
    leftScreenWidthClass = (left?.fullScreen) ? 'w-full' : leftScreenWidthClass;

    let rightScreenWidthClass = (right.visible) ? 'w-1/2' : 'hidden';
    rightScreenWidthClass = (right.fullScreen) ? 'w-full' : rightScreenWidthClass;

    return (
      <div id="mainContent" className="flex flex-auto w-full">
        <div className={cx(
          'py-20',
          'bg-gray-100',
          'm-2',
          'rounded-lg',
          'relative',
          'flex',
          'items-center',
          { hidden: !left.visible },
          leftScreenWidthClass,
        )}
        >
          {left.component}
        </div>
        <div className={cx(
          'py-20',
          'bg-gray-100',
          'm-2',
          'rounded-lg',
          'relative',
          'flex',
          'items-center',
          { hidden: !right.visible },
          rightScreenWidthClass,
        )}
        >
          {right.component}
        </div>
      </div>
    );
  }

  return null;
};

export default ContentView;
