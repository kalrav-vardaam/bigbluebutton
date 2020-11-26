import React, { useState, useRef, useEffect } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Auth from '/imports/ui/services/auth';
import Users from '/imports/api/users';
import PresentationAreaService from '/imports/ui/components/presentation/service';
import WhiteboardWrapperView from './WhiteboardWrapperView';

const ROLE_VIEWER = Meteor.settings.public.user.role_viewer;

const WhiteboardWrapperContainer = ({
  multiUser,
  podId,
  userIsPresenter,
  whiteboardId,
}) => {
  const useContainerDimensions = (myRef) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight,
    });

    useEffect(() => {
      const handleResize = () => {
        setDimensions(getDimensions());
      };

      if (myRef.current) {
        setDimensions(getDimensions());
      }

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [myRef]);

    return dimensions;
  };

  const divRef = useRef(null);

  const svgRef = useRef(null);

  const { width, height } = useContainerDimensions(divRef);

  const MAX_Z_INDEX = (2 ** 31) - 1;

  const baseName = Meteor.settings.public.app.cdn + Meteor.settings.public.app.basename;

  let cursor;

  if (!userIsPresenter) {
    cursor = undefined;
  } else {
    cursor = `url('${baseName}/resources/images/whiteboard-cursor/pan.png') 4 8,  default`;
  }

  const overlayStyle = {
    width: '100%',
    height: '100%',
    touchAction: 'none',
    zIndex: MAX_Z_INDEX,
    cursor,
  };

  return (
    <WhiteboardWrapperView
      userIsPresenter={userIsPresenter}
      multiUser={multiUser}
      podId={podId}
      whiteboardId={whiteboardId}
      divRef={divRef}
      svgRef={svgRef}
      width={width}
      height={height}
      zIndex={MAX_Z_INDEX}
      overlayStyle={overlayStyle}
    />
  );
};

export default withTracker(() => {
  const podId = 'DEFAULT_PRESENTATION_POD';

  const isViewer = Users.findOne({ meetingId: Auth.meetingID, userId: Auth.userID }, {
    fields: {
      role: 1,
    },
  }).role === ROLE_VIEWER;

  const defaultSlide = PresentationAreaService.getCurrentSlide(podId);

  return {
    isViewer,
    multiUser: PresentationAreaService.getMultiUserStatus(defaultSlide && defaultSlide.id),
    podId,
    userIsPresenter: PresentationAreaService.isPresenter(podId),
    whiteboardId: defaultSlide?.id,
  };
})(WhiteboardWrapperContainer);
