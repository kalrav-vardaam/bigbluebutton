import React, { useState, useEffect } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Service from './service';
import { withModalMounter } from '/imports/ui/components/modal/service';
import ExternalVideoService from '/imports/ui/components/external-video-player/service';
import PresentationService from '../presentation/presentation-uploader/service';
import PresentationUploaderContainer from '/imports/ui/components/presentation/presentation-uploader/container';
import { UPLOAD_FILE_TYPES } from '/imports/api/presentations/constants';

import TabsView from './TabsView';

const TABS = [
  {
    fileType: UPLOAD_FILE_TYPES.PDF,
    icon: 'pdf',
    emptyMessage: 'No Documents',
    slideLabel: 'Page',
  },
  {
    fileType: UPLOAD_FILE_TYPES.PPT,
    icon: 'ppt',
    emptyMessage: 'No Presentations',
    slideLabel: 'Slide',
  },
  {
    fileType: UPLOAD_FILE_TYPES.VIDEO,
    icon: 'video',
    emptyMessage: null,
    slideLabel: null,
  },
  {
    fileType: UPLOAD_FILE_TYPES.WWW,
    icon: 'www',
    emptyMessage: null,
    slideLabel: null,
  },
];

const TabsContainer = ({
  mountModal,
  defaultPdfPresentation,
  defaultPptPresentation,
  handleWhiteboardClick,
  whiteboardOverlay,
  getPresentation,
  setPresentation,
  getDefaultSlideId,
  updateDefaultScreen,
  ...props
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState({
    [UPLOAD_FILE_TYPES.PPT]: null,
    [UPLOAD_FILE_TYPES.PDF]: null,
  });

  const [selectedSlide, setSelectedSlide] = useState(1);

  useEffect(() => {
    // prevent tab switching when sharing video & external site
    if (defaultPdfPresentation && selectedOption[UPLOAD_FILE_TYPES.PDF] === null) {
      setSelectedOption(prevState => ({
        ...prevState,
        [UPLOAD_FILE_TYPES.PDF]: defaultPdfPresentation.id,
      }));
      setTabIndex(0);

      // update default screens
      const { id: defaultSlideId } = getDefaultSlideId(defaultPdfPresentation.id);
      updateDefaultScreen(defaultPdfPresentation.id, defaultSlideId);
    }
  }, [defaultPdfPresentation]);

  useEffect(() => {
    if (defaultPptPresentation && selectedOption[UPLOAD_FILE_TYPES.PPT] === null) {
      setSelectedOption(prevState => ({
        ...prevState,
        [UPLOAD_FILE_TYPES.PPT]: defaultPptPresentation.id,
      }));
      setTabIndex(1);

      // update default screens
      const { id: defaultSlideId } = getDefaultSlideId(defaultPdfPresentation.id);
      updateDefaultScreen(defaultPdfPresentation.id, defaultSlideId);
    }
  }, [defaultPptPresentation]);

  const handleTabClick = (value) => {
    setTabIndex(value);
    Session.set('selectedTab', value);
  };

  const handleSelectChange = (value, fileType) => {
    setSelectedOption(prevState => ({
      ...prevState,
      [fileType]: value,
    }));
  };

  const handlePresentationClick = () => {
    Session.set('showUploadPresentationView', true);
    mountModal(<PresentationUploaderContainer />);
  };

  const handleSlideChange = (slideNum) => {
    setSelectedSlide(slideNum);
  };

  return (
    <TabsView
      {...props}
      selectedIndex={tabIndex}
      tabsCollection={TABS}
      onTabClick={handleTabClick}
      onPresentationClick={handlePresentationClick}
      selectedOption={selectedOption}
      onSelectChange={handleSelectChange}
      handleWhiteboardClick={handleWhiteboardClick}
      whiteboardOverlay={whiteboardOverlay}
      selectedSlide={selectedSlide}
      onSlideChange={handleSlideChange}
    />
  );
};

export default withModalMounter(withTracker(() => ({
  amIPresenter: Service.amIPresenter(),
  amIModerator: Service.amIModerator(),
  allowExternalVideo: Meteor.settings.public.externalVideoPlayer.enabled,
  handleTakePresenter: Service.takePresenterRole,
  isSharingVideo: Service.isSharingVideo(),
  stopExternalVideoShare: ExternalVideoService.stopWatching,
  isMeteorConnected: Meteor.status().connected,
  defaultPdfPresentation: PresentationService.getDefaultPresentation(UPLOAD_FILE_TYPES.PDF),
  defaultPptPresentation: PresentationService.getDefaultPresentation(UPLOAD_FILE_TYPES.PPT),
  getPresentation: PresentationService.getPresentation,
  setPresentation: PresentationService.setPresentation,
  getDefaultSlideId: PresentationService.getDefaultSlideId,
  updateDefaultScreen: PresentationService.updateDefaultScreen,
}))(TabsContainer));
