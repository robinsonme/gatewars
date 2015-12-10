Meteor.methods({
  'buy': function(amount, number) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    if(player.money >= amount && amount > 0 && player.citizens >= number && number > 0) {
      Players.update({createdBy: currentUser._id}, {$inc: {'money': (0-amount), 'citizens': (0-number)}});
      return true;
    }
    return false;
  },
  'buyGrowth': function(amount) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    if(player.money >= amount && amount > 0) {
      Players.update({createdBy: currentUser._id}, {$inc: {'money': (0-amount)}});
      return true;
    }
    return false;
  },
  'calculateGrowthCost': function(number) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    var cost = player.growthCost;
    var totalCost = Math.ceil(cost * 1.001);
    for (var i = 0; i < number; i++) {
      totalCost = Math.ceil(totalCost * 1.001);
    }
    return totalCost;
  },
  'calculateRate': function() {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    var workers = Workers.find().fetch();
    var totalRate = 0;
    for (var i = 0; i < workers.length; i++) {
      var cost = workers[i].cost;
      var name = workers[i].name;
      var number = player[name];
      var rate = (Math.floor(cost/500));
      if(number) {
        totalRate += rate * number;
      }
    }
    return totalRate;
  },
  'click': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy:currentUser._id}, {$inc:{'money': 25}});
  },
  'clickBig': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy:currentUser._id}, {$inc:{'money': 500}});
  },
  'clickBiggest': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy:currentUser._id}, {$inc:{'money': 5000000}});
  },
  'createPlayer': function(user) {
    var currentPlayer = user;
    var data = {
      username: currentPlayer.username,
      createdBy: currentPlayer._id,
      rate: 0,
      money: 0,
      citizens: 10,
      growth: 1,
      growthCost: 100,
      createdOn: new Date()
    }
    Players.insert(data);
  },
  'purchase': function(name, number=1) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});
    check(name, String);
    check(number, Number);

    var number = Math.floor(number);
    var cost = Workers.findOne({name: name});
    cost = cost.cost * number;
    if (Meteor.call('buy', cost, number)) {
      Players.update({createdBy: currentUser._id}, {$inc:{[name]: number}});
      Players.update({createdBy: currentUser._id}, {$set:{'rate': Meteor.call("calculateRate")}})
    } else {
      Bert.alert('Check your math!', 'danger', 'growl-top-right');
    }
  },
  'purchaseGrowth': function(cost, number=1) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});
    //check(cost, Number);
    check(number, Number);

    var number = Math.floor(number);
    var cost = cost * number;
    console.log(calculateGrowthCost(number));
    if (Meteor.call('buyGrowth', cost)) {
      Players.update({createdBy: currentUser._id}, {$inc:{"growth": number }});
      Players.update({createdBy: currentUser._id}, {$set:{'growthCost': Meteor.call("calculateGrowthCost(number)")}})
    } else {
      Bert.alert('Check your math!', 'danger', 'growl-top-right');
    }
  },
});
