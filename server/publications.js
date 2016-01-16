Meteor.publish('userData', function () {
  return Meteor.users.find({}, {sort: {credits:-1}});
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
  if (!this.userId) {
    return this.ready();
  }

  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return Workers.find({createdBy: player._id});
});

Meteor.publish('soldiers', function () {
  if (!this.userId) {
    return this.ready();
  }

  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return Soldiers.find({createdBy: player._id});
});

Meteor.publish('offWeapons', function () {
  if (!this.userId) {
    return this.ready();
  }

  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return OffensiveWeapons.find({createdBy: player._id});
});

Meteor.publish('defWeapons', function () {
  if (!this.userId) {
    return this.ready();
  }

  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return DefensiveWeapons.find({createdBy: player._id});
});

Meteor.publish('facilities', function () {
  if (!this.userId) {
    return this.ready();
  }
  
  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return Facilities.find({createdBy: player._id});
});

Meteor.publish('resources', function () {
  if (!this.userId) {
    return this.ready();
  }

  var currentUserId = this.userId;
  var player = Players.findOne({createdBy: currentUserId});
  return Resources.find({createdBy: player._id});
});
