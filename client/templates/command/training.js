Template.training.helpers({
  'player':function() {
    var currentUser = Meteor.userId();
    return Players.findOne({createdBy: currentUser});
  },
  'workers':function() {
    return Workers.find({});
  },
  'formatNumber':function(number) {
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

Template.training.events({
  'click input.buy': function(event) {
    Meteor.call('purchase', event.target.id);
  },
  'click input.buyTen': function(event) {
    Meteor.call('purchase', event.target.id, 10);
  },
  'click input.buyHun': function(event) {
    Meteor.call('purchase', event.target.id, 100);
  },
  'click input.buyMax': function(event) {
    var worker = Workers.findOne({name: event.target.id});
    var currentUser = Meteor.userId();
    var player = Players.findOne({createdBy: currentUser}, {fields: {money: 1, citizens: 1}});
    var max = Math.floor(player.money / worker.cost);
    if(max > player.citizens) {
      max = player.citizens;
    }
    Meteor.call('purchase', event.target.id, max);
  },
  'click input.buyGrowth': function(event) {
    Meteor.call('purchaseGrowth', event.target.id);
  },
  'click input.buyTenGrowth': function(event) {
    Meteor.call('purchaseGrowth', event.target.id, 10);
  },
  'click input.buyHunGrowth': function(event) {
    Meteor.call('purchaseGrowth', event.target.id, 100);
  },
  'click input.buyMaxGrowth': function(event) {
    var currentUser = Meteor.userId();
    var player = Players.findOne({createdBy: currentUser}, {fields: {money: 1}});
    var max = Math.floor(player.money / event.target.id);
    console.log(max);
    console.log(event.target.id);
    Meteor.call('purchaseGrowth', event.target.id, max);
  }
});

Template.training.onCreated(function() {
  this.subscribe('thisPlayer');
});
