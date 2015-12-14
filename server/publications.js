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

Meteor.publish('workers', function () {
  return Workers.find();
});

Meteor.publish('timers', function () {
  return Timers.find();
});
