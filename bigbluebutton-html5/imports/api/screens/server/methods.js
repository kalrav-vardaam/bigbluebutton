import { Meteor } from 'meteor/meteor';
import setDefaultScreens from './methods/setDefaultScreens';
import batchUpdateScreens from './methods/batchUpdateScreens';
import setFullScreen from './methods/setFullScreen';
import setScreenSlide from './methods/setScreenSlide';

Meteor.methods({
  setDefaultScreens,
  batchUpdateScreens,
  setFullScreen,
  setScreenSlide,
});
