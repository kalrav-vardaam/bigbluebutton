import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { meetingIsBreakout, getMeetingInfo } from '/imports/ui/components/app/service';
import { withModalMounter } from '../modal/service';
import { makeCall } from '/imports/ui/services/api';
import Service from '../actions-bar/service';
import Header from './Header';

const LOGOUT_CODE = '680';

const HeaderContainer = (props) => {
  const handleLeaveSession = () => {
    makeCall('userLeftMeeting');
    Session.set('codeError', LOGOUT_CODE);
  };

  return (
    <Header
      {...props}
      leaveSession={handleLeaveSession}
    />
  );
};

export default withModalMounter(withTracker(() => ({
  amIModerator: Service.amIModerator(),
  isMeteorConnected: Meteor.status().connected,
  isBreakoutRoom: meetingIsBreakout(),
  meetingInfo: getMeetingInfo(),
}))(HeaderContainer));
