Template.command.helpers({
  'player':function() {
    var currentUser = Meteor.userId();
    return Players.findOne({createdBy: currentUser});
  },
  'workers':function() {
    return [{name: "Miner", cost: 500}, {name: "Engineer", cost: 5000}, {name: "Foreman", cost: 25000}, {name: "Supervisor", cost: 100000}, {name: "Excavator", cost: 500000}, {name: "John Henry", cost: 5000000}];
  },
  'formatCurrency':function(number) {
    return number.toLocaleString();
  }
});

Template.command.events({
  'click input.code': function() {
    Meteor.call('click');
  },
  'click input.buy': function(event) {
    Meteor.call('buy', event.target.id);
  }
});
