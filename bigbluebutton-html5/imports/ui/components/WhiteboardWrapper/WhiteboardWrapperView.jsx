import React from 'react';

import WhiteboardOverlayContainer from '/imports/ui/components/whiteboard/whiteboard-overlay/container';
import WhiteboardToolbarContainer from '/imports/ui/components/whiteboard/whiteboard-toolbar/container';
import CursorWrapperContainer from '/imports/ui/components/presentation/cursor/cursor-wrapper-container/container';
import AnnotationGroupContainer from '/imports/ui/components/whiteboard/annotation-group/container';

const WhiteboardWrapperView = ({ whiteboardId }) => (
  <div className="absolute w-full h-full z-50">
    <svg
      data-test="whiteboard"
      width="100"
      height="100"
        // ref={(ref) => { if (ref != null) { this.svggroup = ref; } }}
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className="object-contain w-full h-full max-w-full max-h-full"
    >
      <defs>
        <clipPath id="viewBox">
          <rect x="0" y="0" width="100%" height="100%" fill="none" />
        </clipPath>
      </defs>
      <g clipPath="url(#viewBox)">
        <AnnotationGroupContainer
          {...{
            width,
            height,
          }}
          published
          whiteboardId={whiteboardId}
        />
        <AnnotationGroupContainer
          {...{
            width,
            height,
          }}
          published={false}
          whiteboardId={whiteboardId}
        />
        <CursorWrapperContainer
          podId={podId}
          whiteboardId={whiteboardId}
          widthRatio={widthRatio}
          physicalWidthRatio={svgDimensions.width / width}
          slideWidth={width}
          slideHeight={height}
        />
      </g>
      <WhiteboardOverlayContainer />
    </svg>
    <WhiteboardToolbarContainer />
  </div>
);

export default WhiteboardWrapperView;
