import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Auth from '/imports/ui/services/auth';
import Users from '/imports/api/users';
import PresentationAreaService from '/imports/ui/components/presentation/service';
import WhiteboardWrapperView from './WhiteboardWrapperView';

const ROLE_VIEWER = Meteor.settings.public.user.role_viewer;

const WhiteboardWrapperContainer = ({
  userIsPresenter, multiUser, podId, isViewer, whiteboardId,
}) => (
  <WhiteboardWrapperView
    userIsPresenter={userIsPresenter}
    multiUser={multiUser}
    podId={podId}
    isViewer={isViewer}
    whiteboardId={whiteboardId}
  />
);

export default withTracker(() => {
  const podId = 'DEFAULT_PRESENTATION_POD';

  const isViewer = Users.findOne({ meetingId: Auth.meetingID, userId: Auth.userID }, {
    fields: {
      role: 1,
    },
  }).role === ROLE_VIEWER;

  const defaultSlide = PresentationAreaService.getCurrentSlide(podId);

  return {
    userIsPresenter: PresentationAreaService.isPresenter(podId),
    multiUser: PresentationAreaService.getMultiUserStatus(defaultSlide && defaultSlide.id),
    podId,
    isViewer,
    whiteboardId: defaultSlide.id,
  };
})(WhiteboardWrapperContainer);
