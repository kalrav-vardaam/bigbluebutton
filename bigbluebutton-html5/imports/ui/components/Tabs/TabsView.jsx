import React, { Fragment } from 'react';

import Tab from './components/Tab';
import TabPresentationContentContainer from './components/TabPresentationContent';
import TabVideoContent from './components/TabVideoContent';
import TabWebContent from './components/TabWebContent';
import Icon from '/imports/ui/components/Icon';
import IconButton from '/imports/ui/components/common/IconButton';

const TabsView = ({
  selectedIndex,
  tabsCollection,
  onTabClick,
  onPresentationClick,
  selectedOption,
  onSelectChange,
  handleWhiteboardClick,
  whiteboardOverlay,
  skipToSlide,
}) => {
  const getComponent = () => {
    const { fileType, emptyMessage, slideLabel } = tabsCollection[selectedIndex];

    switch (selectedIndex) {
      case 0:
      case 1:
        return (
          <TabPresentationContentContainer
            fileType={fileType}
            emptyMessage={emptyMessage}
            slideLabel={slideLabel}
            selectedOption={selectedOption}
            onSelectChange={onSelectChange}
            skipToSlide={skipToSlide}
          />
        );
      case 2:
        return <TabVideoContent />;
      case 3:
        return <TabWebContent />;
      default:
        return <TabPresentationContentContainer fileType={fileType} />;
    }
  };

  return (
    <Fragment>
      <aside className="primary-nav w-1/12 relative">
        <div className="h-24 bg-green-900 rounded-lg text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl justify-center items-center flex m-3">SeeIT</div>
        <ul className="flex flex-col justify-center items-center">
          {tabsCollection.map(({ fileType, icon }, i) => (
            <Tab
              key={fileType}
              index={i}
              icon={icon}
              activeKey={selectedIndex}
              tabArea={`#Link${i}`}
              onClick={() => onTabClick(i)}
            />
          ))}
          <li className="w-full">
            <button type="button" onClick={onPresentationClick} className="p-8 block justify-center flex">
              <Icon icon="plus" iconvh="min-w-20 min-h-20" />
            </button>
          </li>
        </ul>
        <div className="w-full flex justify-center items-center absolute bottom-0 my-8">
          <IconButton
            color={whiteboardOverlay ? 'error' : 'secondary'}
            icon={whiteboardOverlay ? 'board' : 'board-off'}
            noMargin
            onClick={handleWhiteboardClick}
          />
        </div>
      </aside>
      <aside className="secondary-nav w-3/12 bg-gray-100 flex flex-col">
        <div className="bg-gray-200 w-full px-2 py-4 flex justify-between items-center">
          <h2 className="p-2 text-xl font-medium">Documents</h2>
          <IconButton icon="times" transparent noMargin miscClass="p-2" />
        </div>
        {getComponent()}
      </aside>
    </Fragment>
  );
};

export default TabsView;
