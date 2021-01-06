import React from 'react';

import { Button } from '/imports/ui/components/common';

const ScreenSharePresenterView = ({ handleUnshareScreen }) => (
  <div className="flex justify-center w-full text-center">
    <div className="max-w-md rounded overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">You are sharing to everyone now.</div>
        <p className="text-gray-700 text-base">
          {'At anytime during the session, click the "Stop Sharing" button below to stop sharing your screen.'}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 text-center">
        <Button
          size="md"
          color="secondary"
          variant="outlined"
          fontWeight="semibold"
          onClick={handleUnshareScreen}
        >
        Stop Sharing
        </Button>
      </div>
    </div>
  </div>
);

export default ScreenSharePresenterView;
