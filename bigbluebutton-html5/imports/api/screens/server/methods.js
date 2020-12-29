import { Meteor } from 'meteor/meteor';
import setDefaultScreens from './methods/setDefaultScreens';
import batchUpdateScreens from './methods/batchUpdateScreens';
import setFullScreen from './methods/setFullScreen';

Meteor.methods({
  setDefaultScreens,
  batchUpdateScreens,
  setFullScreen,
});
