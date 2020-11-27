import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import MediaService from '/imports/ui/components/media/service';
import getFromUserSettings from '/imports/ui/services/users-settings';
import Settings from '/imports/ui/services/settings';
import PresentationPodsContainer from '../presentation-pod/container';
import ScreenshareContainer from '../screenshare/container';
import DefaultContent from '../presentation/default-content/component';
import ContentView from './ContentView';

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
  const data = {
    children: <DefaultContent {...{ autoSwapLayout, hidePresentation }} />,
    audioModalIsOpen: Session.get('audioModalIsOpen'),
  };

  if (!hidePresentation) {
    data.currentPresentation = MediaService.getPresentationInfo();
    data.children = <PresentationPodsContainer />;
  }

  if (MediaService.shouldShowScreenshare() && (viewScreenshare || MediaService.isUserPresenter())) {
    data.children = <ScreenshareContainer />;
  }
  data.hidePresentation = getFromUserSettings('bbb_hide_presentation', LAYOUT_CONFIG.hidePresentation);

  return data;
})(ContentContainer);
