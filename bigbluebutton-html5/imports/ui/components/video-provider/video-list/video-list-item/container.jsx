import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import UserListService from '/imports/ui/components/user-list/service';
import VoiceUsers from '/imports/api/voice-users/';
import VideoListItem from './component';

const VideoListItemContainer = props => (
  <VideoListItem {...props} />
);

export default withTracker((props) => {
  const {
    userId,
  } = props;

  return {
    users: UserListService.getUsers(),
    voiceUser: VoiceUsers.findOne({ intId: userId }),
  };
})(VideoListItemContainer);
