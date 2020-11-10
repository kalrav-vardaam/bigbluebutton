import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Service from '../../service';
import PresentationService from '/imports/ui/components/presentation/presentation-uploader/service';
import TabPresentationContent from './TabPresentationContent';

const TabPresentationContentContainer = ({
  presentations,
  fileType,
  selectedOption,
  onSelectChange,
  emptyMessage,
  slideLabel,
  pages,
}) => (
  <TabPresentationContent
    fileType={fileType}
    presentations={presentations}
    selectedOption={selectedOption}
    pages={pages}
    emptyMessage={emptyMessage}
    slideLabel={slideLabel}
    onSelectChange={value => onSelectChange(value, fileType)}
  />
);

export default withTracker(({ fileType, selectedOption }) => ({
  amIPresenter: Service.amIPresenter(),
  amIModerator: Service.amIModerator(),
  handleTakePresenter: Service.takePresenterRole,
  isMeteorConnected: Meteor.status().connected,
  presentations: PresentationService.getPresentationDropdownValues(fileType),
  pages: PresentationService.getPresentationPages(selectedOption[fileType]),
}))(TabPresentationContentContainer);
