Template.armory.helpers({
  'player':function() {
    var currentUser = Meteor.userId();
    return Players.findOne({createdBy: currentUser});
  },
  'soldiers':function() {
    var currentUser = Meteor.userId();
    return Soldiers.findOne().soldiers;
  },
  'offWeapon':function() {
    var currentUser = Meteor.userId();
    return OffensiveWeapons.findOne().offWeapons;
  },
  'defWeapon':function() {
    var currentUser = Meteor.userId();
    return DefensiveWeapons.findOne().defWeapons;
  },
  'floor':function (number) {
    if (number || number === 0) {
      var num = number;
      num = Math.floor(num);
      return num;
    } else {
      return undefined;
    }
  },
  'formatNumber':function(number) {
    if (number || number === 0) {
      var num = number && number.toLocaleString();
      return num;
    } else {
      return undefined;
    }
  },
  'round':function (number) {
    if (number || number === 0) {
      var num = number;
      num = num.toFixed(2);
      return num;
    } else {
      return undefined;
    }
  },
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
