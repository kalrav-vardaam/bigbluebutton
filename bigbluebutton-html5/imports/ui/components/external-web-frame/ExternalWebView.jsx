import React from 'react';

const ExternalWebView = ({ webUrl }) => (
  <iframe
    src={webUrl}
    height="100%"
    width="100%"
    title={webUrl}
    target="_parent"
  />
);

export default ExternalWebView;
