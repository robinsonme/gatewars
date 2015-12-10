Meteor.publish('userData', function () {
  return Meteor.users.find({}, {sort: {money:-1}});
});

Meteor.publish('players', function () {
  return Players.find();
});

Meteor.publish('workers', function () {
  return Workers.find();
});
