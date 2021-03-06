import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import MediaService, { getSwapLayout, shouldEnableSwapLayout } from '/imports/ui/components/media/service';
import { notify } from '/imports/ui/services/notification';
import PresentationAreaService from './service';
import { Slides } from '/imports/api/slides';
import PresentationArea from './component';
import PresentationToolbarService from './presentation-bottom-toolbar/service';
import Auth from '/imports/ui/services/auth';
import Meetings from '/imports/api/meetings';
import Users from '/imports/api/users';
import getFromUserSettings from '/imports/ui/services/users-settings';

const ROLE_VIEWER = Meteor.settings.public.user.role_viewer;

const PresentationAreaContainer = ({ presentationPodIds, mountPresentationArea, ...props }) => (
  mountPresentationArea && <PresentationArea {...props} />
);

const APP_CONFIG = Meteor.settings.public.app;
const PRELOAD_NEXT_SLIDE = APP_CONFIG.preloadNextSlides;
const fetchedpresentation = {};

export default withTracker(({ podId, presentationId, slideId: selectedSlideId }) => {
  const currentSlide = PresentationAreaService.getCurrentSlideById(
    podId,
    presentationId,
    selectedSlideId,
  );
  const presentationIsDownloadable = PresentationAreaService.isPresentationDownloadable(
    podId,
    presentationId,
  );
  const layoutSwapped = getSwapLayout() && shouldEnableSwapLayout();
  const isViewer = Users.findOne({ meetingId: Auth.meetingID, userId: Auth.userID }, {
    fields: {
      role: 1,
    },
  }).role === ROLE_VIEWER;

  let slidePosition;
  if (currentSlide) {
    const {
      presentationId: currentPresentationId,
      id: slideId,
    } = currentSlide;
    slidePosition = PresentationAreaService.getSlidePosition(podId, currentPresentationId, slideId);
    if (PRELOAD_NEXT_SLIDE && !fetchedpresentation[currentPresentationId]) {
      fetchedpresentation[currentPresentationId] = {
        canFetch: true,
        fetchedSlide: {},
      };
    }
    const currentSlideNum = currentSlide.num;
    const presentation = fetchedpresentation[currentPresentationId];

    if (PRELOAD_NEXT_SLIDE
      && !presentation.fetchedSlide[currentSlide.num + PRELOAD_NEXT_SLIDE]
        && presentation.canFetch) {
      const slidesToFetch = Slides.find({
        podId,
        presentationId: currentPresentationId,
        num: {
          $in: Array(PRELOAD_NEXT_SLIDE).fill(1).map((v, idx) => currentSlideNum + (idx + 1)),
        },
      }).fetch();

      const promiseImageGet = slidesToFetch
        .filter(s => !fetchedpresentation[currentPresentationId].fetchedSlide[s.num])
        .map(async (slide) => {
          if (presentation.canFetch) presentation.canFetch = false;
          const image = await fetch(slide.imageUri);
          if (image.ok) {
            presentation.fetchedSlide[slide.num] = true;
          }
        });
      Promise.all(promiseImageGet).then(() => { presentation.canFetch = true; });
    }
  }
  return {
    currentSlide,
    slidePosition,
    downloadPresentationUri: PresentationAreaService.downloadPresentationUri(podId),
    userIsPresenter: PresentationAreaService.isPresenter(podId) && !layoutSwapped,
    multiUser: PresentationAreaService.getMultiUserStatus(currentSlide && currentSlide.id)
      && !layoutSwapped,
    presentationIsDownloadable,
    mountPresentationArea: !!currentSlide,
    currentPresentation: PresentationAreaService.getCurrentPresentation(podId),
    notify,
    zoomSlide: PresentationToolbarService.zoomSlide,
    podId,
    layoutSwapped,
    toggleSwapLayout: MediaService.toggleSwapLayout,
    publishedPoll: Meetings.findOne({ meetingId: Auth.meetingID }, {
      fields: {
        publishedPoll: 1,
      },
    }).publishedPoll,
    isViewer,
    currentPresentationId: Session.get('currentPresentationId') || null,
    restoreOnUpdate: getFromUserSettings(
      'bbb_force_restore_presentation_on_new_events',
      Meteor.settings.public.presentation.restoreOnUpdate,
    ),
  };
})(PresentationAreaContainer);
