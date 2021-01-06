import { Meteor } from 'meteor/meteor';

const WebList = new Mongo.Collection('web-list');

if (Meteor.isServer) {
  // types of queries for the presentations:
  // 1. meetingId                   ( 1 )

  WebList._ensureIndex({ meetingId: 1 });
}

export default WebList;
