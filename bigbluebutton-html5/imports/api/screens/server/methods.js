import { Meteor } from 'meteor/meteor';
import setDefaultScreens from './methods/setDefaultScreens';
import batchUpdateScreens from './methods/batchUpdateScreens';

Meteor.methods({
  setDefaultScreens,
  batchUpdateScreens,
});
