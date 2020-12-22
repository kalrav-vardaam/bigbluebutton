
export const getNewScreensPositions = ({
  url,
  oldScreens,
  component,
  position,
}) => {
  const fullScreen = oldScreens.find(screen => screen.fullScreen === true);
  const oldLeftPosition = oldScreens.find(screen => screen.position === 'left');
  const oldRightPosition = oldScreens.find(screen => screen.position === 'right');
  let newLeftPosition = {};
  let newRightPosition = {};

  // switching to full screen
  if (position === 'full') {
    newLeftPosition = {
      ...oldLeftPosition,
      component,
      fullScreen: true,
      visible: true,
      url,
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
          component,
          fullScreen: false,
          visible: true,
          url,
        };

        newRightPosition = {
          ...oldLeftPosition,
          fullScreen: false,
          visible: true,
        };
      } else if (position === 'right') {
        newLeftPosition = {
          ...oldRightPosition,
          fullScreen: false,
          visible: true,
        };

        newRightPosition = {
          ...oldRightPosition,
          component,
          fullScreen: false,
          visible: true,
          url,
        };
      }
    }
    // override left / right position

    if (position === 'left') {
      newLeftPosition = {
        ...oldLeftPosition,
        component,
        fullScreen: false,
        visible: true,
        url,
      };

      newRightPosition = {
        ...oldRightPosition,
      };
    }

    if (position === 'right') {
      newLeftPosition = {
        ...oldLeftPosition,
      };

      newRightPosition = {
        ...oldRightPosition,
        component,
        fullScreen: false,
        visible: true,
        url,
      };
    }
  }

  return [newLeftPosition, newRightPosition];
};

export default {};
