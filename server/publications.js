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
  return Workers.find();
});

Meteor.publish('soldiers', function () {
  return Soldiers.find();
});

Meteor.publish('offWeapons', function () {
  return OffensiveWeapons.find();
});

Meteor.publish('defWeapons', function () {
  return DefensiveWeapons.find();
});

Meteor.publish('facilities', function () {
  return Facilities.find();
});
