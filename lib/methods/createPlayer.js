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
    Meteor.call('createWorkerDB', user);
    Meteor.call('createResourceDB', user);
    Meteor.call('createSoldierDB', user);
    Meteor.call('createOffensiveDB', user);
    Meteor.call('createDefensiveDB', user);
    Meteor.call('createFacilitiesDB', user);
  },
  'createWorkerDB': function(user) {
    var currentPlayer = user;

    // create the worker DB
    var workerData = {
      createdBy: currentPlayer._id,
      workers: [
        {name: "Solar Technician", cost: STARTING_SOLAR_TECHNICIAN_COST, number: 0},
        {name: "Botonist", cost: STARTING_BOTONIST_COST, number: 0},
        {name: "Asteroid Miner", cost: STARTING_ASTEROID_MINER_COST, number: 0},
        {name: "He-3 Harvester", cost: STARTING_HE_3_HARVESTER_COST, number: 0},
        {name: "Administrator", cost: STARTING_ADMINISTRATOR_COST, number: 0},
        {name: "Scientist", cost: STARTING_SCIENTIST_COST, number: 0},
        {name: "Armorer", cost: STARTING_ARMORER_COST, number: 0},
        {name: "Engineer", cost: STARTING_ENGINEER_COST, number: 0},
        {name: "Broker", cost: STARTING_BROKER_COST, number: 0},
        {name: "Covert Operative", cost: STARTING_COVERT_OPERATIVE_COST, number: 0},
        {name: "Internal Security", cost: STARTING_INTERNAL_SECURITY_COST, number: 0}
      ]
    };

    // create this player's workers table
    Workers.insert(workerData);
  },
  'createResourceDB': function(user) {
    var currentPlayer = user;

    // create the resource DB
    var resourceData = {
      createdBy: currentPlayer._id,
      resources: [
        {name: "Power", amount: STARTING_POWER, consumptionRate: 0},
        {name: "Ore", amount: STARTING_MINERALS, consumptionRate: 0},
        {name: "He-3", amount: 0, consumptionRate: 0},
        {name: "Food", amount: STARTING_FOOD, consumptionRate: 0},
      ]
    };

    // create this player's workers table
    Resources.insert(resourceData);
  },
  'createSoldierDB': function(user) {
    var currentPlayer = user;

    // create the soldier DB
    var soldierData = {
      createdBy: currentPlayer._id,
      soldiers: [
        {name: "Recruit", cost: STARTING_RECRUIT_COST, number: 0},
        {name: "Soldier", cost: STARTING_SOLDIER_COST, number: 0},
        {name: "Offensive Specialist", cost: STARTING_OFFENSIVE_SPECIALIST_COST, number: 0},
        {name: "Defensive Specialist", cost: STARTING_DEFENSIVE_SPECIALIST_COST, number: 0},
      ]
    };

    // create this player's soldiers table
    Soldiers.insert(soldierData);
  },
  'createOffensiveDB': function(user) {
    var currentPlayer = user;

    // create the offensive weapons DB
    var offensiveData = {
      createdBy: currentPlayer._id,
      offWeapons: [
        {name: "9mm", cost: STARTING_9MM_COST, power: 0},
        {name: "MP-5", cost: STARTING_MP5_COST, power: 0},
        {name: ".50 Caliber Rifle", cost: STARTING_50_CALIBER_COST, power: 0},
        {name: "Laser Cannon", cost: STARTING_LASER_CANNON_COST, power: 0},
        {name: "Plasma Cannon", cost: STARTING_PLASMA_CANNON_COST, power: 0},
      ]
    };

    // create this player's offensive weapons table
    OffensiveWeapons.insert(offensiveData);
  },
  'createDefensiveDB': function(user) {
    var currentPlayer = user;

    // create the defensive weapons DB
    var defensiveData = {
      createdBy: currentPlayer._id,
      defWeapons: [
        {name: "Riot Shield", cost: STARTING_RIOT_SHIELD_COST, power: 0},
        {name: "Body Armor", cost: STARTING_BODY_ARMOR_COST, power: 0},
        {name: "Mechanoid Suit", cost: STARTING_MECHANOID_SUIT_COST, power: 0},
        {name: "Personal Force Field", cost: STARTING_PERSONAL_FORCE_FIELD_COST, power: 0},
        {name: "Holographic Projection System", cost: STARTING_HOLOGRAPHIC_PROJECTION_SYSTEM_COST, power: 0},
      ]
    };

    // create this player's defensive weapons table
    DefensiveWeapons.insert(defensiveData);
  },
  'createFacilitiesDB': function(user) {
    var currentPlayer = user;

    // create the facilities DB
    var facilityData = {
      createdBy: currentPlayer._id,
      facilities: [
        {name: "Space Station", amount: 0, cost: STARTING_SOLAR_ARRAY_COST, productionRate: 0},
        {name: "Solar Array", amount: 0, cost: STARTING_SOLAR_ARRAY_COST, productionRate: 0},
        {name: "Hydroponics Bay", amount: 0, cost: STARTING_HYDROPONICS_BAY_COST, productionRate: 0},
        {name: "Mining Facility", amount: 0, cost: STARTING_MINING_FACILITY_COST, productionRate: 0},
        {name: "He-3 Collector", amount: 0, cost: STARTING_HE_3_COLLECTOR_COST, productionRate: 0},
        {name: "Habitation Pod", amount: 0, cost: STARTING_HABITATION_POD_COST, productionRate: 0},
        {name: "Exchange", amount: 0, cost: STARTING_EXCHANGE_COST, productionRate: 0},
        {name: "Science Lab", amount: 0, cost: STARTING_SCIENCE_LAB_COST, productionRate: 0},
        {name: "Weapons Lab", amount: 0, cost: STARTING_WEAPONS_LAB_COST, productionRate: 0},
        {name: "Observatory", amount: 0, cost: STARTING_OBSERVATORY_COST, productionRate: 0},
        {name: "Embassy", amount: 0, cost: STARTING_EMBASSY_COST, productionRate: 0},
        {name: "Shipyard", amount: 0, cost: STARTING_SHIPYARD_COST, productionRate: 0},
      ]
    };

    // create this player's facilities table
    Facilities.insert(facilityData);
  },
});
