Meteor.startup(function(){
  Meteor.setInterval(function(){
    Players.find({}).map(function(player) {
      Players.update({_id: player._id}, {$inc:{"money": player.rate, "citizens": player.growth}})
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
