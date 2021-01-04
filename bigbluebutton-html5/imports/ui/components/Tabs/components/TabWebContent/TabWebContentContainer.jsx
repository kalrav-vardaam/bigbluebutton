import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { makeCall } from '/imports/ui/services/api';

import Auth from '/imports/ui/services/auth';

import Service from '../../service';
import TabWebContent from './TabWebContent';

const TabWebContentContainer = ({
  webList,
  iswebUrl,
}) => {
  const [webUrl, setwebUrl] = useState('');
  const [selectedItem, setselectedItem] = useState({});

  const handleAddWebClick = () => {
    if (webUrl) {
      makeCall('addWeb', Auth.meetingID, webUrl);
      setwebUrl('');
    }
  };

  const handleChangeWebUrl = (url) => {
    setwebUrl(url);
  };

  const handleSelectedUrl = (item) => {
    setselectedItem(item);
  };

  const addDisabled = !iswebUrl(webUrl);

  const handleUrlError = () => {
    const valid = (!webUrl || webUrl.length <= 3) || iswebUrl(webUrl);

    return (
      !valid
        ? (
          <div className="text-red-500">
            { 'Invalid Web Url'}
          </div>
        )
        : null
    );
  };

  return (
    <TabWebContent
      webUrl={webUrl}
      selectedItem={selectedItem}
      onAddWebClick={handleAddWebClick}
      onChangeWebUrl={handleChangeWebUrl}
      onSelectedUrl={handleSelectedUrl}
      webList={webList}
      renderUrlError={handleUrlError}
      addDisabled={addDisabled}
    />
  );
};

export default withTracker(() => ({
  amIPresenter: Service.amIPresenter(),
  amIModerator: Service.amIModerator(),
  isMeteorConnected: Meteor.status().connected,
  webList: Service.getWebList(),
  iswebUrl: Service.isWebUrl,
}))(TabWebContentContainer);
