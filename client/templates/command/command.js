Template.command.helpers({
  'player':function() {
    var currentUser = Meteor.userId();
    return Players.findOne({createdBy: currentUser});
  },
  'floor':function (number) {
    if (number || number == 0) {
      var num = number;
      num = Math.floor(num);
      return num;
    } else {
      return undefined;
    }
  },
  'formatNumber':function(number) {
    if (number || number == 0) {
      var num = number && number.toLocaleString();
      return num;
    } else {
      return undefined;
    }
  },
});

Template.command.events({
  'click input.code': function() {
    Meteor.call('click');
  },'click input.codeBig': function() {
    Meteor.call('clickBig');
  },
  'click input.codeBiggest': function() {
    Meteor.call('clickBiggest');
  }
});


Template.command.onCreated(function() {
  this.subscribe('thisPlayer');
});
