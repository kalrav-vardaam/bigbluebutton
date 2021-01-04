import React from 'react';

const ExternalWebView = ({ isPresenter, webUrl }) => (
  isPresenter
  && (
  <iframe
    src={webUrl}
    height="100%"
    width="100%"
    title={webUrl}
    target="_parent"
  />
  )
);

export default ExternalWebView;
