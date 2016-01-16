Meteor.methods({
  'click': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy:currentUser._id}, {$inc:{'credits': 25}});
  },
  'clickBig': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy:currentUser._id}, {$inc:{'credits': 500}});
  },
  'clickBiggest': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy:currentUser._id}, {$inc:{'credits': 5000000}});
  },
  'calculateRate': function() {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});
    var workersArray = Workers.findOne().workers;
    var worker = _.find(workersArray, function(obj) { return obj.name === "Asteroid Miner"});

    var facilitiesArray = Facilities.findOne().facilities;
    var facility = _.find(facilitiesArray, function(obj) { return obj.name === "Mining Facility"});

    Facilities.update({createdBy:player._id, 'facilities.name': "Mining Facility"}, {$set:{ 'facilities.$.productionRate': worker.number/10 }});
    Resources.update({createdBy:player._id, 'resources.name': "Ore"}, {$set:{ 'resources.$.productionRate': worker.number/10 }});

  },
});
