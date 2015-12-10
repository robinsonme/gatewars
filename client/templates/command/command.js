Template.command.helpers({
  'player':function() {
    var currentUser = Meteor.userId();
    return Players.findOne({createdBy: currentUser});
  },
  'workers':function() {
    return Workers.find({});
  },
  'formatCurrency':function(number) {
    return number.toLocaleString();
  },
  'number': function(name) {
    var currentUser = Meteor.userId();
    var selector = {};
    selector[name] = 1;
    var player = Players.findOne({createdBy: currentUser}, {fields: selector});
    if(player[name]) {
      return player[name];
    } else {
      return 0;
    }
  }
});

Template.command.events({
  'click input.code': function() {
    Meteor.call('click');
  },'click input.codeBig': function() {
    Meteor.call('clickBig');
  },
  'click input.buy': function(event) {
    Meteor.call('purchase', event.target.id);
  }
});
