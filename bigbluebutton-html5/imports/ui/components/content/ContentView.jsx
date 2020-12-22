import React from 'react';
import cx from 'classnames';

const ContentView = ({
  left,
  right,
}) => {
  let leftScreenWidthClass;
  let rightScreenWidthClass;

  if (left.visible) {
    leftScreenWidthClass = 'w-1/2';

    if (left.fullScreen) {
      leftScreenWidthClass = 'w-full';
    }
  }

  if (right.visible) {
    rightScreenWidthClass = 'w-1/2';

    if (right.fullScreen) {
      rightScreenWidthClass = 'w-full';
    }
  }

  return (
    <div id="mainContent" className="flex flex-auto w-full">
      <div className={cx('py-20 bg-gray-100 m-2 rounded-lg relative flex items-center', leftScreenWidthClass)}>
        {left.component}
      </div>
      <div className={cx('py-20 bg-gray-100 m-2 rounded-lg relative flex items-center', rightScreenWidthClass)}>
        {right.component}
      </div>
    </div>
  );
};

export default ContentView;
