Template.training.helpers({
  'player':function() {
    var currentUser = Meteor.userId();
    return Players.findOne({createdBy: currentUser});
  },
  'workers':function() {
    var currentUser = Meteor.userId();
    return Workers.findOne({createdBy: currentUser}).workers;
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
    if (number || number == 0) {
      var num = number && number.toLocaleString();
      return num;
    } else {
      return undefined;
    }
  },
});

Template.training.events({
  'click input.trainWorker': function(event) {
    var number = event.target.dataset.number;
    var workerName = event.target.id;
    number = parseInt(number);

    Meteor.call('trainWorker', workerName, number, function(error) {
      if (error) {
        Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
      } else {
        Bert.alert( "Congrats on your purchase.", 'success', 'growl-top-right', 'fa-check' );
      }
    });
  },
  'click input.trainMax': function(event) {
    var currentUser = Meteor.userId();
    var workerName = event.target.id;
    var workersArray = Workers.findOne().workers;
    var worker = _.find(workersArray, function(obj) { return obj.name === workerName});

    var player = Players.findOne({createdBy: currentUser}, {fields: {money: 1, citizens: 1, }});

    var max = Math.floor(player.money / worker.cost);
    if(max > player.citizens) {
      max = player.citizens;
    }
    Meteor.call('purchase', event.target.id, max);
  },
  'click input.buyGrowth': function(event) {
    var number = event.target.dataset.number;
    number = parseInt(number);

    // if a NaN was returned in parsing run the max buy
    if (isNaN(number)) { // buy max
      var currentUser = Meteor.userId();
      var player = Players.findOne({createdBy: currentUser}, {fields: {money: 1, growthCost: 1}});

      var cost = player.growthCost;
      cost = Math.ceil(cost);
      var totalCost = cost;
      var max = 1;
      var money = player.money;
      if (money >= totalCost) {
        while (money >= totalCost) {
          cost = Math.ceil(cost * 1.01);
          totalCost = totalCost + cost;
          max = max + 1;
        }
      }

      if (totalCost >= player.money) {
        max = max - 1;
      }

      Meteor.call('purchaseGrowth', max, function(error) {
        if (error) {
          Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
        } else {
          Bert.alert( "Congrats on your purchase.", 'success', 'growl-top-right', 'fa-check' );
        }
      });
    }
    else { // buy a specific quantity
      Meteor.call('purchaseGrowth', number, function(error) {
        if (error) {
          Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
        } else {
          Bert.alert( "Congrats on your purchase.", 'success', 'growl-top-right', 'fa-check' );
        }
      });
    }
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
  'click input.resetMoney': function() {
    Meteor.call('resetMoney');
  }
});

Template.training.onCreated(function() {
  this.subscribe('thisPlayer');
});
