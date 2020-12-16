import React, { useState } from 'react';
import { makeCall } from '/imports/ui/services/api';
import Auth from '/imports/ui/services/auth';
import Icon from '/imports/ui/components/Icon';

const TabPositionButtonGroup = ({ renderComponent }) => {
  const [position, setPosition] = useState('full');

  const handleButtonClick = (newPosition) => {
    setPosition(newPosition);
    makeCall('batchUpdateScreens', Auth.meetingID, renderComponent, newPosition);
  };

  const activeClass = 'focus:outline-none border-2 border border-gray-900';

  return (
    <span className="rounded-md mx-4 bg-white py-2 px-3 flex justify-between mb-3">
      <button
        type="button"
        className={`bg-transparent outline-none ${position === 'full' ? activeClass : null}`}
        selected={position === 'full'}
        onClick={() => handleButtonClick('full')}
      >
        <Icon icon="active-full" className="h-12 w-24 p-1 bg-gray-100 rounded" />
      </button>
      <button
        type="button"
        className={`bg-transparent ${position === 'left' ? activeClass : null}`}
        selected={position === 'left'}
        onClick={() => handleButtonClick('left')}
      >
        <Icon icon="active-left" className="h-12 w-24 p-1 bg-gray-100 rounded" />
      </button>

      <button
        type="button"
        className={`bg-transparent ${position === 'right' ? activeClass : null}`}
        selected={position === 'right'}
        onClick={() => handleButtonClick('right')}
      >
        <Icon icon="active-right" className="h-12 w-24 p-1 bg-gray-100 rounded" />
      </button>
    </span>
  );
};

export default TabPositionButtonGroup;
