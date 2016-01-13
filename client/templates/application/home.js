Template.home.helpers({
  'players': function() {
    return Players.find({}, {sort: {'money': -1}, limit: 10});
  },
  'formatNumber':function(number) {
    if (number || number == 0) {
      var num = number && number.toLocaleString();
      return num;
    } else {
      return undefined;
    }
  },
  'addOne': function(number) {
    return number + 1;
  }
});
