Meteor.methods({
  'resetGrowthRate': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy: currentUser._id}, {$set:{"growth": .01, growthCost: 100 }});
  },
  'killCitizens': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy: currentUser._id}, {$set:{"citizens": 10 }});
  },
  'killWorkers': function() {
    var currentUser = Meteor.user();
    var workers = Workers.findOne({createdBy: currentUser._id}).workers;
    for (var i = 0; i < workers.length; i++) {
      var name = workers[i].name;
      Workers.update({createdBy: currentUser._id, 'workers.name': name}, {$set:{'workers.$.number':0}});
      Players.update({createdBy: currentUser._id}, {$set:{'rate': Meteor.call("calculateRate")}})
    }
  },
  'resetMoney': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy:currentUser._id}, {$set:{'money': 100 }});
  }
});
