Meteor.startup(function(){
  Meteor.setInterval(function(){
    Players.find({}).map(function(player) {
      Players.update({_id: player._id}, {$inc:{"money": player.rate}})
    });
  }, 1000);

  var workerData = [{name: "Miner", cost: 500}, {name: "Engineer", cost: 5000}, {name: "Foreman", cost: 25000}, {name: "Supervisor", cost: 100000}, {name: "Excavator", cost: 500000}, {name: "John Henry", cost: 5000000}];

  if(Workers.find().count() === 0) {
    for (var i = 0; i < workerData.length; i++) {
      Workers.insert(workerData[i]);
    }
  }
});
