Template.training.helpers({
  'player':function() {
    var currentUser = Meteor.userId();
    return Players.findOne({createdBy: currentUser});
  },
  'resources':function() {
    var currentUser = Meteor.userId();
    var resourcesArray = Resources.findOne().resources;
    var resource = _.find(resourcesArray, function(obj) { return obj.name === 'Ore'});
    return resource;
  },
  'soldiers':function() {
    var currentUser = Meteor.userId();
    return Soldiers.findOne().soldiers;
  },
  'workers':function() {
    var currentUser = Meteor.userId();
    return Workers.findOne().workers;
  },
  'floor':function (number) {
    if (number || number === 0) {
      var num = number;
      num = Math.floor(num);
      return num;
    } else {
      return undefined;
    }
  },
  'formatNumber':function(number) {
    if (number || number === 0) {
      var num = number && number.toLocaleString();
      return num;
    } else {
      return undefined;
    }
  },
  'round':function (number) {
    if (number || number === 0) {
      var num = number;
      num = num.toFixed(2);
      return num;
    } else {
      return undefined;
    }
  },
});

Template.training.events({
  'submit .train': function(event) {
    event.preventDefault(); // prevent submit form default from occuring and refreshing page
    var number = event.target.number.value; // get number to train
    var name = event.target.id; // get name of unit to train
    if (number === "" || number == 0) { // if the number is blank or 0 set it 1
      number = 1;
    }
    number = parseInt(number); // check that a number was entered and parse it a non number will result in NaN which we check for later


    // check the workers table for the name of the unit we're training if unit is not a worker will result in undefined
    var workersArray = Workers.findOne().workers;
    var worker = _.find(workersArray, function(obj) { return obj.name === name});

    if (worker) { // if worker is undefined we skip this
      if (isNaN(number)) { // if a non Integer was entered we buy the max
        var currentUser = Meteor.userId(); // get the current user
        var player = Players.findOne({createdBy: currentUser}, {fields: {credits: 1, citizens: 1, }}); // get the player for that user

        var max = Math.floor(player.credits / worker.cost); // set the max buyable for the player based on credits
        if(max > player.citizens) { // if they can afford more than they have citizens max them at their citizens
          max =  Math.floor(player.citizens); // set to citizens
        }
        Meteor.call('trainWorker', name, max, function(error, result){ // call our function get alert either way
          if (error) {
            Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
            console.log(result);
          } else {
            Bert.alert( result, 'success', 'growl-top-right', 'fa-check' );
          }
        });
      } else { // a specific number was entered
        Meteor.call('trainWorker', name, number, function(error, result) { // call our function get alert either way
          if (error) {
            Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
          } else {
            Bert.alert( result, 'success', 'growl-top-right', 'fa-check' );
          }
        });
      }
    } else { // there was no worker with that name which meant worker was undefined
      // find the soldier with that name
      var soldiersArray = Soldiers.findOne().soldiers;
      var soldier = _.find(soldiersArray, function(obj) { return obj.name === name});
      var type = soldier.type || "citizens"; // get the type of unit needed to train that soldier, if no type can be found set it to citizen
      if (isNaN(number)) { // buy max
        var currentUser = Meteor.userId();

        var type = soldier.type || "citizens"; // check what unit type is needed for this soldier; if nothing defined set to citizens
        if (type !== "citizens") { // if a unit type other than citizens is needed to train
          var player = Players.findOne({createdBy: currentUser}, {fields: {credits: 1}});
          var max = Math.floor(player.credits / soldier.cost); // get the max we can afford to train based on current credits

          var soldierTypeArray = Soldiers.findOne().soldiers; // get the information for that specific soldier type
          var soldierType = _.find(soldierTypeArray, function(obj) { return obj.name === type});

          if(max > soldierType.number) { // determine if our max is more than the number of a specific unit type
            max =  Math.floor(soldierType.number); // if more set to that number as max
          }
          Meteor.call('trainSoldier', name, max, function(error, result){ // call our function get alert either way
            if (error) {
              Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
            } else {
              Bert.alert( result, 'success', 'growl-top-right', 'fa-check' );
            }
          });
        } else { // our required unit type to train was citizens
          var player = Players.findOne({createdBy: currentUser}, {fields: {credits: 1, citizens: 1, }});

          var max = Math.floor(player.credits / soldier.cost); // get the max we can afford to train based on current credits
          if(max > player.citizens) { // determine if our max is more than the number of a specific unit type
            max =  Math.floor(player.citizens);// if more set to that number as max
          }
          Meteor.call('trainSoldier', name, max, function(error, result){ // call our function get alert either way
            if (error) {
              Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
            } else {
              Bert.alert( result, 'success', 'growl-top-right', 'fa-check' );
            }
          });
        }
      } else { // a specific number was entered
        Meteor.call('trainSoldier', name, number, function(error, result) { // call our function get alert either way
          if (error) {
            Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
          } else {
            Bert.alert( result, 'success', 'growl-top-right', 'fa-check' );
          }
        });
      }
    }
    event.target.number.value = "";
  },
  'submit .buyGrowth': function(event) {
    event.preventDefault(); // prevent submit form default from occuring and refreshing page
    var number = event.target.number.value; // get number to grow
    if (number === "" || number == 0) { // if the number is blank or 0 set it 1
      number = 1;
    }
    number = parseInt(number); // check that a number was entered and parse it a non number will result in NaN which we check for later


    // if a NaN was returned in parsing run the max buy
    if (isNaN(number)) { // buy max
      var currentUser = Meteor.userId(); // get currentUser
      var player = Players.findOne({createdBy: currentUser}, {fields: {credits: 1, growthCost: 1}}); // get the player created by this user

      var cost = player.growthCost; // determine the current growth cost for this player
      cost = Math.ceil(cost); // round the cost up so we work in whole numbers (this is just for housekeeping purposes)
      var totalCost = cost; // set totalCost to the number we just pulled from the DB
      var max = 1; // set our current max to 1
      var credits = player.credits; // get the amount of the players credits
      if (credits >= totalCost) { // if we have enough to buy the 1 then we check if there is enough for more
        while (credits >= totalCost) { // while loop that increments that amount we're checking to see what can be afforded
          cost = Math.ceil(cost * 1.01); // we increase the cost by 1% for each purchase and round it up for integers
          totalCost = totalCost + cost; // add the current total to the next levels cost
          max = max + 1; // increase our max we can purchase and reloop
        }
      }

      if (totalCost >= player.credits) { // if our loop goes too high back the max off by 1 number
        max = max - 1;
      }

      Meteor.call('purchaseGrowth', max, function(error) { // call our function get alert either way
        if (error) {
          Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
        } else {
          Bert.alert( "Congrats on your purchase.", 'success', 'growl-top-right', 'fa-check' );
        }
      });
    }
    else { // buy a specific quantity
      Meteor.call('purchaseGrowth', number, function(error) { // call our function get alert either way
        if (error) {
          Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
        } else {
          Bert.alert( "Congrats on your purchase.", 'success', 'growl-top-right', 'fa-check' );
        }
      });
    }
    event.target.number.value = "";
  },
  'click input.resetGrowthRate': function() {
    Meteor.call('resetGrowthRate');
  },
  'click input.killCitizens': function() {
    Meteor.call('killCitizens');
  },
  'click input.killWorkers': function() {
    Meteor.call('killWorkers');
  },
  'click input.resetMoney': function() {
    Meteor.call('resetMoney');
  }
});

Template.training.onCreated(function() {
  this.subscribe('thisPlayer');
});
