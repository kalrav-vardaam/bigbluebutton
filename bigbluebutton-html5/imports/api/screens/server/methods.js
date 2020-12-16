import { Meteor } from 'meteor/meteor';
import setDefaultScreens from './methods/setDefaultScreens';
import changeFullScreen from './methods/changeFullScreen';
import changePosition from './methods/changePosition';

Meteor.methods({
  setDefaultScreens,
  changeFullScreen,
  changePosition,
});
