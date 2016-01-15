Meteor.methods({
  'resetGrowthRate': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy: currentUser._id}, {$set:{"growth": STARTING_GROWTH, growthCost: STARTING_GROWTH_COST }});
  },
  'killCitizens': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy: currentUser._id}, {$set:{"citizens": STARTING_CITIZENS }});
  },
  'killWorkers': function() {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});
    var workers = Workers.findOne({createdBy: player._id}).workers;
    for (var i = 0; i < workers.length; i++) {
      var name = workers[i].name;
      Workers.update({createdBy: player._id, 'workers.name': name}, {$set:{'workers.$.number':0}});
      Players.update({createdBy: currentUser._id}, {$set:{'rate': Meteor.call("calculateRate")}})
    }
  },
  'resetMoney': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy:currentUser._id}, {$set:{'credits': STARTING_CREDITS }});
  }
});
