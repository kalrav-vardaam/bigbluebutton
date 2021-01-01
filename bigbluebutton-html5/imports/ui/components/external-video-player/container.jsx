import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import ExternalVideo from './component';

const ExternalVideoContainer = props => (
  <ExternalVideo {...{ ...props }} />
);

export default withTracker(({ isPresenter, url }) => {
  const inEchoTest = Session.get('inEchoTest');
  return {
    inEchoTest,
    isPresenter,
    videoUrl: url,
  };
})(ExternalVideoContainer);
