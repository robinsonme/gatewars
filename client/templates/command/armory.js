Template.armory.helpers({
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
  'offWeapon':function() {
    var currentUser = Meteor.userId();
    return OffensiveWeapons.findOne().offWeapons;
  },
  'defWeapon':function() {
    var currentUser = Meteor.userId();
    return DefensiveWeapons.findOne().defWeapons;
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

Template.armory.events({
  'submit .buy': function(event) {
    event.preventDefault(); // prevent submit form default from occuring and refreshing page
    var number = event.target.number.value; // get number to train
    var name = event.target.id; // get name of unit to train
    if (number === "" || number == 0) { // if the number is blank or 0 set it 1
      number = 1;
    }

    // check to see if the weapon is offensive
    var weaponsArray = OffensiveWeapons.findOne().offWeapons;
    var weapon = _.find(weaponsArray, function(obj) { return obj.name === name});

    if (weapon) { // if weapon is offsensive continue otherwise go to else
      if (isNaN(number)) { // something other than number requested calculate max
        var currentUser = Meteor.userId(); // get the current user

        // get the resource required amount
        var resourcesArray = Resources.findOne().resources;
        var resource = _.find(resourcesArray, function(obj) { return obj.name === weapon[type]});

        number = Math.floor(resource.amount / weapon.cost); // set the max buyable for the player based on ore

        Meteor.call('buyWeapon', name, number, function(error, result) { // call our function get alert either way
          if (error) {
            Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
            console.log(result);
          } else {
            Bert.alert( result, 'success', 'growl-top-right', 'fa-check' );
          }
        });
      } else { // a specific number is input
        Meteor.call('buyWeapon', name, number, function(error, result) { // call our function get alert either way
          if (error) {
            Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
            console.log(result);
          } else {
            Bert.alert( result, 'success', 'growl-top-right', 'fa-check' );
          }
        });
      }
    } else { // weapon was not offensive
      var weaponsArray = DefensiveWeapons.findOne().defWeapons;
      var weapon = _.find(weaponsArray, function(obj) { return obj.name === name});

      if (isNaN(number)) { // something other than number requested calculate max
        var currentUser = Meteor.userId(); // get the current user

        // get the resource required amount
        var resourcesArray = Resources.findOne().resources;
        var resource = _.find(resourcesArray, function(obj) { return obj.name === weapon[type]});

        number = Math.floor(resource.amount / weapon.cost); // set the max buyable for the player based on ore

        Meteor.call('buyWeapon', name, number, function(error, result) { // call our function get alert either way
          if (error) {
            Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
            console.log(result);
          } else {
            Bert.alert( result, 'success', 'growl-top-right', 'fa-check' );
          }
        });
      } else { // a specific number is input
        Meteor.call('buyWeapon', name, number, function(error, result) { // call our function get alert either way
          if (error) {
            Bert.alert( error.reason, 'danger', 'growl-top-right', 'fa-frown-o' );
            console.log(result);
          } else {
            Bert.alert( result, 'success', 'growl-top-right', 'fa-check' );
          }
        });
      }
    }
  },
});

Template.armory.onCreated(function() {
  this.subscribe('thisPlayer');
});
