Meteor.methods({
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
});
