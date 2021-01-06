import React from 'react';
import cx from 'classnames';

import ModalContainer from '../modal/container';
import AudioContainer from '../audio/container';
import HeaderContainer from '../header';
import FooterConatiner from '../footer';
import TabsContainer from '../Tabs';
import WhiteboardWrapperContainer from '/imports/ui/components/WhiteboardWrapper';
import ContentContainer from '/imports/ui/components/content';

const AppView = ({
  whiteboardOverlay,
  handleWhiteboardClick,
  isMenuOpen,
  onMenuToggle,
  isPresenter,
  ...props
}) => (
  <React.Fragment>
    <div id="main" className="flex h-screen">
      {
        isPresenter && (
          <TabsContainer
            {...props}
            handleWhiteboardClick={handleWhiteboardClick}
            whiteboardOverlay={whiteboardOverlay}
            isMenuOpen={isMenuOpen}
            onMenuToggle={onMenuToggle}
          />
        )
      }
      <section className={cx(
        'main-container',
        'py-2',
        'px-5',
        'flex',
        'items-center',
        'justify-between',
        'flex-col',
        'relative',
        {
          'w-11/12': isMenuOpen,
          'w-full': !isMenuOpen,
        },
      )}
      >
        {whiteboardOverlay && <WhiteboardWrapperContainer />}
        <HeaderContainer {...props} />
        <ContentContainer {...props} />
        <FooterConatiner {...props} />
      </section>
    </div>
    <ModalContainer />
    <AudioContainer />
  </React.Fragment>
);

export default AppView;
