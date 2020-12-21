
export const getNewScreensPositions = ({
  oldScreens,
  component,
  position,
}) => {
  const newScreens = oldScreens;

  // new position is full screen
  if (position === 'full') {
    const leftPosition = newScreens.find(screen => screen.position === 'left');

    leftPosition.component = component;
    leftPosition.fullScreen = true;
    leftPosition.visible = true;

    const rightPosition = newScreens.find(screen => screen.position === 'right');

    rightPosition.component = '';
    rightPosition.fullScreen = false;
    rightPosition.visible = false;
  } else {
    const isFullScreen = newScreens.find(screen => screen.fullScreen === true);

    // check fullscreen
    if (isFullScreen) {
      // const oldComponent = isFullScreen.component;
      isFullScreen.component = component;
      isFullScreen.fullScreen = false;

      const rightPosition = newScreens.find(screen => screen.position === 'right');
      rightPosition.component = '';
      rightPosition.fullScreen = false;
      rightPosition.visible = true;
    } else {
      // check position
      const oldPosition = newScreens.find(screen => screen.position === position);
      const newPosition = newScreens.find(screen => screen.position !== position);
      let oldComponent = '';

      if (oldPosition.component) {
        oldComponent = oldPosition.component;
      }

      // if find any get component set it rev position
      oldPosition.component = component;
      oldPosition.fullScreen = false;
      oldPosition.visible = true;
      newPosition.component = oldComponent;
      newPosition.fullScreen = false;
      newPosition.visible = true;
    }
  }

  return newScreens;
};

export default {};
