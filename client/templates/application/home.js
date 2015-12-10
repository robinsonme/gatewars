Template.home.helpers({
  'players': function() {
    return Players.find({}, {sort: {'money': -1}, limit: 10});
  },
  'formatNumber': function(number) {
    return number.toLocaleString();
  },
  'addOne': function(number) {
    return number + 1;
  }
});
