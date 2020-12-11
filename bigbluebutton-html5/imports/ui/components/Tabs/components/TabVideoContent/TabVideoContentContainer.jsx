import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { withModalMounter } from '/imports/ui/components/modal/service';
import ExternalVideoService from '/imports/ui/components/external-video-player/service';
import ExternalVideoModal from '/imports/ui/components/external-video-player/modal/container';

import Service from '../../service';
import TabVideoContent from './TabVideoContent';

const TabVideoContentContainer = ({
  isSharingVideo,
  stopExternalVideoShare,
  allowExternalVideo,
  ...props
}) => {
  const handleExternalVideoClick = () => {
    const { mountModal } = props;
    mountModal(<ExternalVideoModal />);
  };

  return (
    <TabVideoContent
      isSharingVideo={isSharingVideo}
      stopExternalVideoShare={stopExternalVideoShare}
      allowExternalVideo={allowExternalVideo}
      handleExternalVideoClick={handleExternalVideoClick}
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
}))(TabVideoContentContainer));
