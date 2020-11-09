import React, { Fragment } from 'react';
import Select from 'react-select';
import TabPositionButtonGroup from '../TabPositionButtonGroup';
import Slide from '../Slide';


const TabContentPpt = ({
  options, selectedOption, Slides, NoOptionMessage, onChange,
}) => (
  <Fragment>
    <div className="w-full py-3 flex flex-col overflow-y-scroll" id="#Link1">
      <TabPositionButtonGroup />
      <span className="rounded-md mx-4 shadow-sm mb-3">
        <Select
          className="font-semibold"
          options={options}
          value={options.find(obj => obj.value === selectedOption)}
          noOptionsMessage={() => NoOptionMessage}
          onChange={e => onChange(e)}
        />
      </span>
      {
          Slides ? (
            <ul>
              {
                Slides.map(({ id, thumbUri }, k) => (
                  <Slide key={id} name={`Slide ${k + 1}`} image={thumbUri} />
                ))
              }
            </ul>
          ) : null
      }

    </div>
  </Fragment>
);

export default TabContentPpt;
