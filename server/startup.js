Meteor.startup(function(){
  Meteor.setInterval(function(){
    Players.find({}).map(function(player) {
      Players.update({_id: player._id}, {$inc:{"money": player.rate, "citizens": player.growth}})
    });
  }, 1000);

  // create the worker DB
  var workerData = [{name: "Miner", cost: 500}, {name: "Engineer", cost: 5000}, {name: "Foreman", cost: 25000}, {name: "Supervisor", cost: 100000}, {name: "Excavator", cost: 500000}, {name: "John Henry", cost: 5000000}];
  // fill the worker DB if it doesn't already have info
  if(Workers.find().count() === 0) {
    for (var i = 0; i < workerData.length; i++) {
      Workers.insert(workerData[i]);
    }
  }

  // create the soldier DB
  var soldierData = [{name: "Recruit", cost: 500}, {name: "Soldier", cost: 5000}, {name: "Offensive Specialist", cost: 25000}, {name: "Defensive Specialist", cost: 25000}, {name: "Covert Operative", cost: 5000}, {name: "Internal Security", cost: 5000}];
  // fill the soldier DB if if doesn't already have info
  if(Soldiers.find().count() === 0) {
    for (var i = 0; i < soldierData.length; i++) {
      Soldiers.insert(soldierData[i]);
    }
  }

  // create the offensive weapons DB
  var offWeaponData = [{name: "9mm", cost: 500}, {name: "MP-5", cost: 5000}, {name: "50cal", cost: 25000}, {name: "Laser Cannon", cost: 100000}, {name: "Plasma Cannon", cost: 500000}];
  // fill the weapons DB if if doesn't already have info
  if(OffensiveWeapons.find().count() === 0) {
    for (var i = 0; i < offWeaponData.length; i++) {
      OffensiveWeapons.insert(offWeaponData[i]);
    }
  }

  // create the defensive weapons DB
  var defWeaponData = [ {name: "Riot Shield", cost: 500}, {name: "Body Armor", cost: 5000}, {name: "Mechanoid Suit", cost: 25000}, {name: "Personal Force Field", cost: 100000}, {name: "Holographic Projection", cost: 500000} ];
  // fill the weapons DB if if doesn't already have info
  if(DefensiveWeapons.find().count() === 0) {
    for (var i = 0; i < defWeaponData.length; i++) {
      DefensiveWeapons.insert(defWeaponData[i]);
    }
  }

  // create the facilities DB
  var facilityData = [ {name: "Solar Array", cost: 500}, {name: "H-3 Collector", cost: 500}, {name: "Hydroponics Bay", cost: 500}, {name: "Science Lab",  cost: 50000}];
  // fill the facilities DB if if doesn't already have info
  if(Facilities.find().count() === 0) {
    for (var i = 0; i < facilityData.length; i++) {
      Facilities.insert(facilityData[i]);
    }
  }

  var timerData = [{name: "Turns", time: 300}, {name: "Births", time: 1800}, {name: "Work", time: 3600}];

  if(Timers.find().count() === 0) {
    for (var i = 0; i < timerData.length; i++) {
      Timers.insert(timerData[i]);
    }
  }

  var timers = [];
  for (var i = 0; i < timerData.length; i++) {
    timers[timerData[i].name.toLowerCase() + "Timer"] = new Countdown(timerData[i].time);
  }

});
