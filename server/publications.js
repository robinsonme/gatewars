Meteor.publish('userData', function () {
  return Meteor.users.find({}, {sort: {money:-1}});
});

Meteor.publish('players', function () {
  return Players.find({}, {fields: {username: 1, money: 1, rate: 1}});
});

Meteor.publish('thisPlayer', function () {
  var currentUserId = this.userId;
  return Players.find({createdBy: currentUserId});
});

Meteor.publish('timers', function () {
  return Timers.find();
});


Meteor.publish('workers', function () {
  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return Workers.find({createdBy: player._id});
});

Meteor.publish('soldiers', function () {
  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return Soldiers.find({createdBy: player._id});
});

Meteor.publish('offWeapons', function () {
  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return OffensiveWeapons.find({createdBy: player._id});
});

Meteor.publish('defWeapons', function () {
  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return DefensiveWeapons.find({createdBy: player._id});
});

Meteor.publish('facilities', function () {
  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return Facilities.find({createdBy: player._id});
});

Meteor.publish('resources', function () {
  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return Resources.find({createdBy: player._id});
});
