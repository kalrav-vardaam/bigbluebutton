import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { makeCall } from '/imports/ui/services/api';

import { withModalMounter } from '/imports/ui/components/modal/service';
import ExternalVideoService from '/imports/ui/components/external-video-player/service';
import Auth from '/imports/ui/services/auth';

import Service from '../../service';
import TabVideoContent from './TabVideoContent';

const TabVideoContentContainer = ({
  isSharingVideo,
  stopExternalVideoShare,
  allowExternalVideo,
  videoList,
}) => {
  const [videoUrl, setvideoUrl] = useState('');
  const [selectedItem, setselectedItem] = useState({});

  const handleAddVideoClick = () => {
    if (videoUrl) {
      makeCall('addVideo', Auth.meetingID, videoUrl);
      setvideoUrl('');
    }
  };

  const handleChangeVideoUrl = (url) => {
    setvideoUrl(url);
  };

  const handleSelectedUrl = (item) => {
    setselectedItem(item);
  };

  return (
    <TabVideoContent
      isSharingVideo={isSharingVideo}
      stopExternalVideoShare={stopExternalVideoShare}
      allowExternalVideo={allowExternalVideo}
      videoUrl={videoUrl}
      selectedItem={selectedItem}
      onAddVideoClick={handleAddVideoClick}
      onChangeVideoUrl={handleChangeVideoUrl}
      onSelectedUrl={handleSelectedUrl}
      videoList={videoList}
    />
  );
};

export default withModalMounter(withTracker(() => ({
  amIPresenter: Service.amIPresenter(),
  amIModerator: Service.amIModerator(),
  stopExternalVideoShare: ExternalVideoService.stopWatching,
  isSharingVideo: Service.isSharingVideo(),
  allowExternalVideo: Meteor.settings.public.externalVideoPlayer.enabled,
  isMeteorConnected: Meteor.status().connected,
  videoList: Service.getVideoList(),
}))(TabVideoContentContainer));
