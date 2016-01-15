Meteor.startup(function(){
  Meteor.setInterval(function(){
    Players.find({}).map(function(player) {
      Players.update({_id: player._id}, {$inc:{ "citizens": player.growth}});

      var facilitiesArray = Facilities.findOne({createdBy: player._id}).facilities;
      var facility = _.find(facilitiesArray, function(obj) { return obj.name === "Mining Facility"});
      Resources.update({createdBy: player._id, 'resources.name': 'Ore'}, {$inc: {'resources.$.amount': facility.productionRate}});


    });
  }, 1000);

  /* Hold off for now
  var timerData = [{name: "Turns", time: 300}, {name: "Births", time: 1800}, {name: "Work", time: 3600}];

  var timers = [];
  for (var i = 0; i < timerData.length; i++) {
    timers[timerData[i].name.toLowerCase() + "Timer"] = new Countdown(timerData[i].time);
  }

  if(Timers.find().count() === 0) {
    for (var i = 0; i < timerData.length; i++) {
      Timers.insert(timers[i]);
    }
  }
  */



});
