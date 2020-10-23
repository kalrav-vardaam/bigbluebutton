import React from 'react';
import AudioContainer from '../audio/container';
import Tabs from '../tabs';
import Header from '../header';
import Footer from '../footer';
import Content from '../content';

const AppView = () => (
  <React.Fragment>
    <AudioContainer />
    <div id="main" className="flex h-screen">
      <Tabs />
      <section className="main-container w-11/12 py-2 px-5 flex items-center justify-between flex-col">
        <Header />
        <Content />
        <Footer />
      </section>
    </div>
  </React.Fragment>
);

export default AppView;
