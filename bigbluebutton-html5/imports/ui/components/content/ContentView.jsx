import React from 'react';

const ContentView = ({
  children,
}) => (
  <div id="mainContent" className="flex flex-auto w-full">
    <div className="w-full py-20 bg-gray-100 m-2 rounded-lg relative flex items-center">
      {children}
    </div>
    {/* <div className="w-1/2 py-20 bg-gray-100 m-2 rounded-lg relative flex items-center">
      {children}
    </div> */}
  </div>
);

export default ContentView;
