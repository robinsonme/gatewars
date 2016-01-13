Meteor.methods({
  'buy': function(cost, number) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    if(player.money >= cost && cost > 0 && player.citizens >= number && number > 0) {
      Players.update({createdBy: currentUser._id}, {$inc: {'money': (0-cost), 'citizens': (0-number)}});
      return true;
    }
    return false;
  },
  'trainWorker': function(name, number=1) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});
    check(name, String);
    check(number, Number);

    var workersArray = Workers.findOne().workers;
    var worker = _.find(workersArray, function(obj) { return obj.name === name});

    var number = Math.floor(number);
    var cost = worker.cost * number;
    if (Meteor.call('buy', cost, number)) {
      Workers.update({createdBy: currentUser._id, 'workers.name': name}, {$inc:{'workers.$.number':1}});
    } else {
      return Meteor.call('throwError', 1, 'You seem to be short on funds. That would require ' + cost + " to purchase.");
    }
  },
});
