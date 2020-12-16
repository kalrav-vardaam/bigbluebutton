import React from 'react';
import cx from 'classnames';

const ContentView = ({
  leftComponent,
  rightComponent,
  leftFullScreen,
  rightFullscreen,
  leftVisible,
  rightVisible,
}) => {
  let leftScreenWidthClass;
  let rightScreenWidthClass;

  if (leftVisible) {
    leftScreenWidthClass = 'w-1/2';

    if (leftFullScreen) {
      leftScreenWidthClass = 'w-full';
    }
  }

  if (rightVisible) {
    rightScreenWidthClass = 'w-1/2';

    if (rightFullscreen) {
      rightScreenWidthClass = 'w-full';
    }
  }

  return (
    <div id="mainContent" className="flex flex-auto w-full">
      <div className={cx('py-20 bg-gray-100 m-2 rounded-lg relative flex items-center', leftScreenWidthClass)}>
        {leftComponent}
      </div>
      <div className={cx('py-20 bg-gray-100 m-2 rounded-lg relative flex items-center', rightScreenWidthClass)}>
        {rightComponent}
      </div>
    </div>
  );
};

export default ContentView;
