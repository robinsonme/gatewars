Template.armory.helpers({
  'player':function() {
    var currentUser = Meteor.userId();
    return Players.findOne({createdBy: currentUser});
  },
  'soldier':function() {
    return Soldiers.find({});
  },
  'offWeapon':function() {
    return OffensiveWeapons.find({});
  },
  'defWeapon':function() {
    return DefensiveWeapons.find({});
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

Template.armory.events({
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
});

Template.armory.onCreated(function() {
  this.subscribe('thisPlayer');
});
