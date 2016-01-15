Meteor.methods({
  'createPlayer': function(user) {
    var currentPlayer = user;

    var data = {
      username: currentPlayer.username,
      createdBy: currentPlayer._id,
      credits: STARTING_CREDITS,
      citizens: STARTING_CITIZENS,
      growth: STARTING_GROWTH,
      growthCost: STARTING_GROWTH_COST,
      populationMax: STARTING_POPULATION_MAX,
      createdOn: new Date()
    }
    Players.insert(data);
    var player = Players.findOne({createdBy:currentPlayer._id});

    Meteor.call('createWorkerDB', player);
    Meteor.call('createResourceDB', player);
    Meteor.call('createSoldierDB', player);
    Meteor.call('createOffensiveDB', player);
    Meteor.call('createDefensiveDB', player);
    Meteor.call('createFacilitiesDB', player);
  },
  'createWorkerDB': function(player) {
    var currentPlayer = player;

    // create the worker DB
    var workerData = {
      createdBy: currentPlayer._id,
      workers: [
        {name: "Asteroid Miner", cost: STARTING_ASTEROID_MINER_COST, number: 0},
        {name: "Covert Operative", cost: STARTING_COVERT_OPERATIVE_COST, number: 0},
        {name: "Internal Security", cost: STARTING_INTERNAL_SECURITY_COST, number: 0}
      ]
    };

    // create this player's workers table
    Workers.insert(workerData);
  },
  'createResourceDB': function(player) {
    var currentPlayer = player;

    // create the resource DB
    var resourceData = {
      createdBy: currentPlayer._id,
      resources: [
        {name: "Credits", amount: STARTING_CREDITS, consumptionRate: 0},
        {name: "Ore", amount: STARTING_MINERALS, consumptionRate: 0},
      ]
    };

    // create this player's workers table
    Resources.insert(resourceData);
  },
  'createSoldierDB': function(player) {
    var currentPlayer = player;

    // create the soldier DB
    var soldierData = {
      createdBy: currentPlayer._id,
      soldiers: [
        {name: "Recruit", cost: STARTING_RECRUIT_COST, number: 0},
        {name: "Soldier", cost: STARTING_SOLDIER_COST, number: 0, type: "Recruit"},
        {name: "Offensive Specialist", cost: STARTING_OFFENSIVE_SPECIALIST_COST, number: 0, type: "Soldier"},
        {name: "Defensive Specialist", cost: STARTING_DEFENSIVE_SPECIALIST_COST, number: 0, type: "Soldier"},
      ]
    };

    // create this player's soldiers table
    Soldiers.insert(soldierData);
  },
  'createOffensiveDB': function(player) {
    var currentPlayer = player;

    // create the offensive weapons DB
    var offensiveData = {
      createdBy: currentPlayer._id,
      offWeapons: [
        {name: "9mm", cost: STARTING_9MM_COST, power: 1},
        {name: "MP-5", cost: STARTING_MP5_COST, power: 5},
        {name: ".50 Caliber Rifle", cost: STARTING_50_CALIBER_COST, power: 25},
        {name: "Laser Cannon", cost: STARTING_LASER_CANNON_COST, power: 100},
        {name: "Plasma Cannon", cost: STARTING_PLASMA_CANNON_COST, power: 500},
      ]
    };

    // create this player's offensive weapons table
    OffensiveWeapons.insert(offensiveData);
  },
  'createDefensiveDB': function(player) {
    var currentPlayer = player;

    // create the defensive weapons DB
    var defensiveData = {
      createdBy: currentPlayer._id,
      defWeapons: [
        {name: "Riot Shield", cost: STARTING_RIOT_SHIELD_COST, power: 1},
        {name: "Body Armor", cost: STARTING_BODY_ARMOR_COST, power: 5},
        {name: "Mechanoid Suit", cost: STARTING_MECHANOID_SUIT_COST, power: 25},
        {name: "Personal Force Field", cost: STARTING_PERSONAL_FORCE_FIELD_COST, power: 100},
        {name: "Holographic Projection System", cost: STARTING_HOLOGRAPHIC_PROJECTION_SYSTEM_COST, power: 500},
      ]
    };

    // create this player's defensive weapons table
    DefensiveWeapons.insert(defensiveData);
  },
  'createFacilitiesDB': function(player) {
    var currentPlayer = player;

    // create the facilities DB
    var facilityData = {
      createdBy: currentPlayer._id,
      facilities: [
        {name: "Mining Facility", amount: 0, cost: STARTING_MINING_FACILITY_COST, productionRate: 0},
      ]
    };

    // create this player's facilities table
    Facilities.insert(facilityData);
  },
});
