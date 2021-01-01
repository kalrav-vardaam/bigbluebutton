import React from 'react';
import cx from 'classnames';

const ContentView = ({
  left,
  right,
}) => {
  let leftScreenWidthClass = (left.visible) ? 'w-1/2' : 'hidden';
  leftScreenWidthClass = (left.fullScreen) ? 'w-full' : leftScreenWidthClass;

  let rightScreenWidthClass = (right.visible) ? 'w-1/2' : 'hidden';
  rightScreenWidthClass = (right.fullScreen) ? 'w-full' : rightScreenWidthClass;

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
