Meteor.methods({
  'buy': function(cost, number, type) {
    type = type || "citizens";
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    if (type !== "citizens") {
      var soldiersArray = Soldiers.findOne().soldiers;
      var soldier = _.find(soldiersArray, function(obj) { return obj.name === type});

      if (player.credits >= cost && cost > 0 && soldier.number >= number && number > 0) {
        Soldiers.update({createdBy: player._id, 'soldiers.name': type}, {$inc:{'soldiers.$.number':(0-number)}});
        Players.update({createdBy: currentUser._id}, {$inc: {'credits': (0-cost)}});
        return true;
      }
      return false;
    }

    if(player.credits >= cost && cost > 0 && player[type] >= number && number > 0) {
      if (type == "citizens") {
        Players.update({createdBy: currentUser._id}, {$inc: {'credits': (0-cost), citizens: (0-number)}});
      }
      return true;
    }
    return false;
  },
  'trainWorker': function(name, number) {
    number = number || 1;
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});
    check(name, String);
    check(number, Number);

    var workersArray = Workers.findOne().workers;
    var worker = _.find(workersArray, function(obj) { return obj.name === name});

    number = Math.floor(number);
    var cost = worker.cost * number;
    if (Meteor.call('buy', cost, number)) {
      Workers.update({createdBy: player._id, 'workers.name': name}, {$inc:{'workers.$.number':number}});
      Meteor.call('calculateRate');
      var result = "Congrats on your purchase of " + number + " " + name + "."
      return result;
    } else {
      return Meteor.call('throwError', 1, 'You seem to be short on funds. That would require ' + cost + " credits and " + number + " citizens to purchase.");
    }
  },
  'trainSoldier': function(name, number) {
    number = number || 1;
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});
    check(name, String);
    check(number, Number);

    var soldiersArray = Soldiers.findOne().soldiers;
    var soldier = _.find(soldiersArray, function(obj) { return obj.name === name});
    number = Math.floor(number);
    var cost = soldier.cost * number;
    if (Meteor.call('buy', cost, number, soldier.type)) {
      Soldiers.update({createdBy: player._id, 'soldiers.name': name}, {$inc:{'soldiers.$.number':number}});
    } else {
      return Meteor.call('throwError', 1, "Check your resources and population. You're missing something.");
    }
  },
});
