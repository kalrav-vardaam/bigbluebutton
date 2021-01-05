export const getNewScreensPositions = ({
  otherParams,
  oldScreens,
  component,
  position,
}) => {
  const fullScreen = oldScreens.find(screen => screen.fullScreen === true);
  const oldLeftPosition = oldScreens.find(screen => screen.position === 'left');
  const oldRightPosition = oldScreens.find(screen => screen.position === 'right');

  delete oldLeftPosition._id;
  delete oldRightPosition._id;

  let newLeftPosition = {};
  let newRightPosition = {};

  // switching to full screen
  if (position === 'full') {
    newLeftPosition = {
      ...oldLeftPosition,
      component,
      fullScreen: true,
      visible: true,
      otherParams,
    };

    newRightPosition = {
      ...oldRightPosition,
      fullScreen: false,
      visible: false,
    };
  } else {
    // switching to split screen / swap

    if (fullScreen) {
      if (position === 'left') {
        newLeftPosition = {
          ...oldLeftPosition,
          position: 'left',
          component,
          fullScreen: false,
          visible: true,
          otherParams,
        };

        newRightPosition = {
          ...oldLeftPosition,
          position: 'right',
          fullScreen: false,
          visible: true,
        };
      }
      if (position === 'right') {
        newLeftPosition = {
          ...oldLeftPosition,
          position: 'left',
          fullScreen: false,
          visible: true,
        };

        newRightPosition = {
          ...oldRightPosition,
          position: 'right',
          component,
          fullScreen: false,
          visible: true,
          otherParams,
        };
      }

      return [newLeftPosition, newRightPosition];
    }

    if (position === 'left') {
      newLeftPosition = {
        ...oldLeftPosition,
        position: 'left',
        component,
        fullScreen: false,
        visible: true,
        otherParams,
      };

      newRightPosition = {
        ...oldRightPosition,
        position: 'right',
      };
    } else if (position === 'right') {
      newLeftPosition = {
        ...oldLeftPosition,
        position: 'left',
      };

      newRightPosition = {
        ...oldRightPosition,
        position: 'right',
        component,
        fullScreen: false,
        visible: true,
        otherParams,
      };
    }
  }

  return [newLeftPosition, newRightPosition];
};

export default {};
