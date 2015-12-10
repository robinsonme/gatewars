Template.command.helpers({
  'player':function() {
    var currentUser = Meteor.userId();
    return Players.findOne({createdBy: currentUser});
  },
  'formatNumber':function(number) {
    return number.toLocaleString();
  }
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
