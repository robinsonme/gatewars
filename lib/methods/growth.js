Meteor.methods({
  'buyGrowth': function(cost) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    if(player.credits >= cost && cost > 0) {
      Players.update({createdBy: currentUser._id}, {$inc: {'credits': (0-cost)}});
      return true;
    }
    return false;
  },
  'calculateGrowthCost': function(number) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    var cost = player.growthCost;
    var totalCost = Math.ceil(cost);
    for (var i = 0; i < number; i++) {
      totalCost = Math.ceil(totalCost * 1.01);
    }
    return totalCost;
  },
  'calculateGrowthPurchaseCost': function(number) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    var cost = player.growthCost;
    cost = Math.ceil(cost);
    var totalCost = cost;
    for (var i = 1; i < number; i++) {
      cost = Math.ceil(cost * 1.01);
      totalCost = totalCost + cost;
    }
    return totalCost;
  },
  'purchaseGrowth': function(number=1) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});
    check(number, Number);

    var number = Math.floor(number);
    var cost = Meteor.call("calculateGrowthPurchaseCost",number);
    if (Meteor.call('buyGrowth', cost)) {
      Players.update({createdBy: currentUser._id}, {$inc:{"growth": number/100 }});
      Players.update({createdBy: currentUser._id}, {$set:{'growthCost': Meteor.call("calculateGrowthCost", number)}});
    } else {
      return Meteor.call('throwError', 1, 'You seem to be short on funds. That would require ' + cost + " to purchase.");
    }
  },
});
