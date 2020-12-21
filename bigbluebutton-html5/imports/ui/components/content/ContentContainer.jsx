import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import MediaService from '/imports/ui/components/media/service';
import getFromUserSettings from '/imports/ui/services/users-settings';
import Settings from '/imports/ui/services/settings';

import PresentationPodsContainer from '../presentation-pod/container';
import ScreenshareContainer from '../screenshare/container';
import DefaultContent from '../presentation/default-content/component';
import ContentView from './ContentView';
import Screens from '/imports/api/screens';
import ExternalVideoContainer from '../external-video-player/container';

const LAYOUT_CONFIG = Meteor.settings.public.layout;

const ContentContainer = props => (
  <ContentView
    {...props}
  />
);

export default withTracker(() => {
  const { dataSaving } = Settings;
  const { viewScreenshare } = dataSaving;
  const hidePresentation = getFromUserSettings('bbb_hide_presentation', LAYOUT_CONFIG.hidePresentation);
  const autoSwapLayout = getFromUserSettings('userdata-bbb_auto_swap_layout', LAYOUT_CONFIG.autoSwapLayout);
  const screens = Screens.find().fetch();

  const leftScreen = screens.find(screen => screen.position === 'left');
  const rightScreen = screens.find(screen => screen.position === 'right');

  const data = {
    leftComponent: <DefaultContent {...{ autoSwapLayout, hidePresentation }} />,
    rightComponent: null,
    audioModalIsOpen: Session.get('audioModalIsOpen'),
  };

  data.leftFullScreen = leftScreen.fullScreen;
  data.leftVisible = leftScreen.visible;
  if (leftScreen.component === 'presentation' && !hidePresentation) {
    data.currentPresentation = MediaService.getPresentationInfo();
    data.leftComponent = <PresentationPodsContainer />;
  }

  data.rightFullscreen = rightScreen.fullScreen;
  data.rightVisible = rightScreen.visible;
  if (rightScreen.component === 'presentation' && !hidePresentation) {
    data.currentPresentation = MediaService.getPresentationInfo();
    data.rightComponent = <PresentationPodsContainer />;
  }

  if (MediaService.shouldShowScreenshare() && (viewScreenshare || MediaService.isUserPresenter())) {
    if (leftScreen.component === 'presentation') {
      data.leftFullScreen = leftScreen.fullScreen;
      data.leftVisible = leftScreen.visible;
      data.leftComponent = <ScreenshareContainer />;
    }

    if (rightScreen.component === 'presentation') {
      data.rightFullscreen = rightScreen.fullScreen;
      data.rightVisible = rightScreen.visible;
      data.rightComponent = <ScreenshareContainer />;
    }
  }

  data.isScreensharing = MediaService.isVideoBroadcasting();

  if (MediaService.shouldShowExternalVideo()) {
    data.children = (
      <ExternalVideoContainer
        isPresenter={MediaService.isUserPresenter()}
      />
    );
  }

  return data;
})(ContentContainer);
