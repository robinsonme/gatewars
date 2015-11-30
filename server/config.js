Accounts.onCreateUser(function(options, user) {
  user._id = Meteor.users._makeNewID();
  Meteor.call('createPlayer', user);
  return user;
});
