import React from 'react';

import WhiteboardOverlayContainer from '/imports/ui/components/whiteboard/whiteboard-overlay/container';
import WhiteboardToolbarContainer from '/imports/ui/components/whiteboard/whiteboard-toolbar/container';
import CursorWrapperContainer from '/imports/ui/components/presentation/cursor/cursor-wrapper-container/container';
import AnnotationGroupContainer from '/imports/ui/components/whiteboard/annotation-group/container';

const WhiteboardWrapperView = ({
  userIsPresenter,
  multiUser,
  podId,
  whiteboardId,
  divRef,
  svgRef,
  width,
  height,
  zIndex,
  overlayStyle,
}) => (whiteboardId
  ? (
    <div
      className="absolute w-full h-full z-50"
      ref={divRef}
      width={width}
      height={height}
    >
      <svg
        data-test="whiteboard"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="object-contain w-full h-full max-w-full max-h-full"
        ref={svgRef}
      >
        <defs>
          <clipPath id="viewBox">
            <rect x="0" y="0" width="100%" height="100%" fill="none" />
          </clipPath>
        </defs>
        <g clipPath="url(#viewBox)">
          <AnnotationGroupContainer
            width={width}
            height={height}
            published
            whiteboardId={whiteboardId}
          />
          <AnnotationGroupContainer
            width={width}
            height={height}
            published={false}
            whiteboardId={whiteboardId}
          />
          <CursorWrapperContainer
            podId={podId}
            whiteboardId={whiteboardId}
            widthRatio={10}
            physicalWidthRatio={10}
            slideWidth={width}
            slideHeight={height}
          />
        </g>
        <foreignObject
          clipPath="url(#viewBox)"
          x="0"
          y="0"
          width={width}
          height={height}
          style={{ zIndex }}
        >
          <div
            role="presentation"
            onBlur={() => { }}
            style={overlayStyle}
          >
            <WhiteboardOverlayContainer
              svgRef={svgRef}
              slideWidth={width}
              slideHeight={height}
              physicalSlideWidth={width}
              physicalSlideHeight={height}
              viewBoxX={1}
              viewBoxY={1}
              viewBoxWidth={width}
              viewBoxHeight={height}
              whiteboardId={whiteboardId}
            />
          </div>
        </foreignObject>
      </svg>
      { userIsPresenter || multiUser
        ? (
          <WhiteboardToolbarContainer
            whiteboardId={whiteboardId}
            height={height}
          />)
        : null}
    </div>
  ) : null);

export default WhiteboardWrapperView;
