Meteor.methods({
  'buy': function(amount) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    if(player.money >= amount && amount > 0) {
      Players.update({createdBy: currentUser._id}, {$inc: {'money': (0-amount)}});
      return true;
    }
    return false;
  },
  'click': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy:currentUser._id}, {$inc:{'money': 25}});
  },
  'clickBig': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy:currentUser._id}, {$inc:{'money': 500}});
  },
  'createPlayer': function(user) {
    var currentPlayer = user;
    var data = {
      username: currentPlayer.username,
      createdBy: currentPlayer._id,
      rate: 0,
      money: 0,
      createdOn: new Date()
    }
    Players.insert(data);
  },
  'purchase': function(name) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});
    check(name, String);

    var cost = Workers.findOne({name: name});
    if (Meteor.call('buy', cost.cost)) {
      Players.update({createdBy: currentUser._id}, {$inc:{[name]: 1}});
    } else {
      Bert.alert('Check your math!', 'danger', 'growl-top-right');
    }
  },
});
