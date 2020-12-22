import { Meteor } from 'meteor/meteor';

const VideoList = new Mongo.Collection('video-list');

if (Meteor.isServer) {
  // types of queries for the presentations:
  // 1. meetingId                   ( 1 )

  VideoList._ensureIndex({ meetingId: 1 });
}

export default VideoList;
