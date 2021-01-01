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
import ExternalVideoWrapper from '../external-video-wrapper';

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
  const defaultPdfPresentation = MediaService.getPresentationInfo();

  const leftScreen = screens.find(screen => screen.position === 'left');
  const rightScreen = screens.find(screen => screen.position === 'right');

  const data = {
    left: {
      component: <DefaultContent {...{ autoSwapLayout, hidePresentation }} />,
    },
    right: {
      component: '',
    },
    audioModalIsOpen: Session.get('audioModalIsOpen'),
  };

  if (leftScreen) {
    data.left = {
      component: <PresentationPodsContainer
        presentationId={leftScreen.otherParams?.presentationId
          ? leftScreen.otherParams.presentationId
          : defaultPdfPresentation.id}
        slideId={leftScreen.otherParams?.slideId
          ? leftScreen.otherParams.slideId
          : null}
        position="left"
      />,
      fullScreen: leftScreen.fullScreen,
      visible: leftScreen.visible,
    };

    if (leftScreen.component === 'presentation' && !hidePresentation) {
      data.currentPresentation = MediaService.getPresentationInfo();
    }
  }

  if (rightScreen) {
    data.right = {
      component: <PresentationPodsContainer
        presentationId={rightScreen?.otherParams?.presentationId}
        slideId={rightScreen?.otherParams?.slideId}
        position="right"
      />,
      fullScreen: rightScreen.fullScreen,
      visible: rightScreen.visible,
    };

    if (rightScreen.component === 'presentation' && !hidePresentation) {
      data.currentPresentation = MediaService.getPresentationInfo();
    }
  }

  if (MediaService.shouldShowScreenshare() && (viewScreenshare || MediaService.isUserPresenter())) {
    if (leftScreen && leftScreen.component === 'presentation') {
      data.left = {
        component: <ScreenshareContainer />,
        fullScreen: leftScreen.fullScreen,
        visible: leftScreen.visible,
      };
    }

    if (rightScreen && rightScreen.component === 'presentation') {
      data.right = {
        component: <ScreenshareContainer />,
        fullScreen: rightScreen.fullScreen,
        visible: rightScreen.visible,
      };
    }
  }

  data.isScreensharing = MediaService.isVideoBroadcasting();

  if (leftScreen && leftScreen.component === 'video') {
    data.left = {
      component: <ExternalVideoWrapper
        isPresenter={MediaService.isUserPresenter()}
        url={leftScreen.otherParams.url}
        position="left"
        visible={leftScreen.visible}
      />,
      fullScreen: leftScreen.fullScreen,
      visible: leftScreen.visible,
    };
  }

  if (rightScreen && rightScreen.component === 'video') {
    data.right = {
      component: <ExternalVideoWrapper
        isPresenter={MediaService.isUserPresenter()}
        url={rightScreen.otherParams.url}
        position="right"
        visible={rightScreen.visible}
      />,
      fullScreen: rightScreen.fullScreen,
      visible: rightScreen.visible,
    };
  }

  return data;
})(ContentContainer);
