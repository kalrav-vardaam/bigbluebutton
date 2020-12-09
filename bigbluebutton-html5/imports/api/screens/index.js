import { Meteor } from 'meteor/meteor';

const Screens = new Mongo.Collection('screens');

if (Meteor.isServer) {
  // types of queries for the presentations:
  // 1. meetingId                   ( 1 )

  Screens._ensureIndex({ meetingId: 1 });
}

export default Screens;
