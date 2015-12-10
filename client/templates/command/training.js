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
  'click input.buyGrowth': function() {
    Meteor.call('purchaseGrowth');
  },
  'click input.buyTenGrowth': function() {
    Meteor.call('purchaseGrowth', 10);
  },
  'click input.buyHunGrowth': function() {
    Meteor.call('purchaseGrowth', 100);
  },
  'click input.buyMaxGrowth': function() {
    var currentUser = Meteor.userId();
    var player = Players.findOne({createdBy: currentUser}, {fields: {money: 1, growthCost: 1}});

    var cost = player.growthCost;
    cost = Math.ceil(cost);
    var totalCost = 0;
    var max = 0;
    while (player.money >= totalCost) {
      cost = Math.ceil(cost * 1.01);
      totalCost = totalCost + cost;
      max = max + 1;
    }
    if (totalCost > player.money) {
      max = max - 1;
    }
    console.log("Max: "+ max);
    console.log("TotalCost: "+ totalCost);
    console.log("Money: "+ player.money);
    console.log("GrowthCost: "+ player.growthCost);

    Meteor.call('purchaseGrowth', max);
  },
  'click input.resetGrowthRate': function() {
    Meteor.call('resetGrowthRate');
  },
  'click input.killCitizens': function() {
    Meteor.call('killCitizens');
  },
  'click input.killWorkers': function() {
    Meteor.call('killWorkers');
  },
});

Template.training.onCreated(function() {
  this.subscribe('thisPlayer');
});
