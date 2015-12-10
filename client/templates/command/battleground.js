Template.battleground.helpers({
  'players': function() {
    return Players.find({}, {sort: {'money': -1}});
  },
  'formatNumber':function(number) {
    return number.toLocaleString();
  },
  'addOne': function(number) {
    return number + 1;
  }
});
