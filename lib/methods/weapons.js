Meteor.methods({
  'buy': function(cost, number, type) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    var resourcesArray = Resources.findOne().resource;
    var resource = _.find(resourcesArray, function(obj) { return obj.name === type});

    if (resource.amount >= cost && cost > 0) {
      Soldiers.update({createdBy: player._id, 'soldiers.name': type}, {$inc:{'soldiers.$.number':(0-number)}});
      Resources.update({createdBy: player._id, 'resources.name': type}, {$inc: {'resources.$.amount': (0-cost)}});
      return true;
    }
    return false;
  },
  'buyWeapon': function(name, number) {
    number = number || 1;
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});
    check(name, String);
    check(number, Number);

    var weaponsArray = OffensiveWeapons.findOne().offWeapons;
    var weapon = _.find(weaponsArray, function(obj) { return obj.name === name});

    number = Math.floor(number);

    if (weapon) {
      var cost = weapon.cost * number;

      if (Meteor.call('buy', cost, number, weapon.type)) {
        OffensiveWeapons.update({createdBy: player._id, 'offWeapons.name': name}, {$inc:{'offWeapons.$.number':number}});
        var result = "Congrats on your purchase of " + number + " " + name + "."
        return result;
      } else {
        return Meteor.call('throwError', 1, 'You seem to be short on funds. That would require ' + cost + " credits and " + number + " citizens to purchase.");
      }
    } else {
      var weaponsArray = DefensiveWeapons.findOne().defWeapons;
      var weapon = _.find(weaponsArray, function(obj) { return obj.name === name});

      var cost = weapon.cost * number;

      if (Meteor.call('buy', cost, number, weapon.type)) {
        DefensiveWeapons.update({createdBy: player._id, 'defWeapons.name': name}, {$inc:{'defWeapons.$.number':number}});
        var result = "Congrats on your purchase of " + number + " " + name + "."
        return result;
      } else {
        return Meteor.call('throwError', 1, 'You seem to be short on funds. That would require ' + cost + " credits and " + number + " citizens to purchase.");
      }

    }

  },
});
