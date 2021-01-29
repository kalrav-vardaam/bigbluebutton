import React from 'react';

import { Button } from '../common';
import EndMeetingConfirmationContainer from '/imports/ui/components/end-meeting-confirmation/container';

const Header = ({
  mountModal,
  amIModerator,
  isBreakoutRoom,
  isMeteorConnected,
  meetingInfo,
  leaveSession,
}) => {
  const allowedToEndMeeting = amIModerator && !isBreakoutRoom;

  const { name } = meetingInfo.meetingProp;

  return (
    <div id="topBar" className="flex w-full">
      <div className="w-5/12 p-2 flex items-center">
        <div className="w-auto pr-5">
          <img src="images/group-8.svg" alt="/#" />
        </div>
        <div className="w-11/12">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-base sm:text-sm">
            Powered by
            <span className="font-bold text-blue-600 ml-1">SeeIT Solutions</span>
          </p>
        </div>
      </div>
      <div className="w-2/12 p-2 flex justify-center">
        <img src="images/company_logo.jpeg" className="w-24 object-contain" alt="" />
      </div>
      <div className="w-5/12 p-2 flex items-center justify-end">
        {allowedToEndMeeting && isMeteorConnected
          ? (
            <Button
              size="md"
              color="secondary"
              variant="outlined"
              fontWeight="semibold"
              miscClass="z-50"
              onClick={() => mountModal(<EndMeetingConfirmationContainer />)}
            >
              END MEETING
            </Button>
          )
          : (
            <Button
              size="md"
              color="secondary"
              variant="outlined"
              fontWeight="semibold"
              miscClass="z-50"
              onClick={leaveSession}
            >
              LEAVE MEETING
            </Button>
          )
        }
      </div>
    </div>
  );
};

export default Header;
