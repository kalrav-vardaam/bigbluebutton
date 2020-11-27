import React, { Fragment } from 'react';
import Select from 'react-select';

import TabPositionButtonGroup from '../TabPositionButtonGroup';
import Slide from '../Slide';

const TabPresentationContent = ({
  presentations,
  selectedOption,
  pages,
  emptyMessage,
  onSelectChange,
  fileType,
  slideLabel,
  skipToSlide,
}) => {
  const getSelectedOption = () => {
    const selectedValue = presentations.find(obj => obj.value === selectedOption[fileType]);

    return selectedValue || null;
  };

  return (
    <Fragment>
      <div className="w-full py-3 flex flex-col" id="#Link2">
        <TabPositionButtonGroup />
        <div className="rounded-md mx-4 shadow-sm mb-3">
          <Select
            className="font-semibold"
            options={presentations}
            value={getSelectedOption()}
            noOptionsMessage={() => emptyMessage}
            onChange={({ value }) => onSelectChange(value)}
          />
        </div>
      </div>
      <div className="overflow-y-scroll">
        {
          pages ? (
            <ul>
              {
                pages.map(({ id, thumbUri }, k) => (
                  <Slide
                    key={id}
                    name={`${slideLabel} ${k + 1}`}
                    image={thumbUri}
                    pageNum={k + 1}
                    skipToSlide={skipToSlide}
                  />
                ))
              }
            </ul>
          ) : null
        }
      </div>
    </Fragment>
  );
};

export default TabPresentationContent;
