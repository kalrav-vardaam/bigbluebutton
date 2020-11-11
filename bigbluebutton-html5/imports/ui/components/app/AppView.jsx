import React from 'react';
import ModalContainer from '../modal/container';
import AudioContainer from '../audio/container';
import HeaderContainer from '../header';
import FooterConatiner from '../footer';
import Content from '../content';
import TabsContainer from '../Tabs';
import WhiteboardWrapperContainer from '/imports/ui/components/WhiteboardWrapper';

const AppView = props => (
  <React.Fragment>
    <div id="main" className="flex h-screen">
      <TabsContainer {...props} />
      <section className="main-container w-11/12 py-2 px-5 flex items-center justify-between flex-col relative">
        <WhiteboardWrapperContainer />
        <HeaderContainer {...props} />
        <Content />
        <FooterConatiner {...props} />
      </section>
    </div>
    <ModalContainer />
    <AudioContainer />
  </React.Fragment>
);

export default AppView;
