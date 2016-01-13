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
  return Workers.find({createdBy: currentUserId});
});

Meteor.publish('soldiers', function () {
  var currentUserId = this.userId;
  return Soldiers.find({createdBy: currentUserId});
});

Meteor.publish('offWeapons', function () {
  var currentUserId = this.userId;
  return OffensiveWeapons.find({createdBy: currentUserId});
});

Meteor.publish('defWeapons', function () {
  var currentUserId = this.userId;
  return DefensiveWeapons.find({createdBy: currentUserId});
});

Meteor.publish('facilities', function () {
  var currentUserId = this.userId;
  return Facilities.find({createdBy: currentUserId});
});

Meteor.publish('resources', function () {
  var currentUserId = this.userId;
  return Resources.find({createdBy: currentUserId});
});
