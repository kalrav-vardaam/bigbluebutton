import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ExternalWebView from './ExternalWebView';

const ExternalWebContainer = props => (
  <ExternalWebView {...props} />
);

export default withTracker(({ isPresenter, url }) => ({
  isPresenter,
  webUrl: url,
}))(ExternalWebContainer);
