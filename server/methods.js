Meteor.methods({
  'click': function() {
    var currentUser = Meteor.user();
    Players.update({createdBy:currentUser._id}, {$inc:{'money': 25}});
  },
  'buy': function(amount) {
    var currentUser = Meteor.user();
    var player = Players.findOne({createdBy: currentUser._id});

    if(player.money >= amount && amount > 0) {
      Players.update({createdBy: currentUser._id}, {$inc: {'rate': (Math.floor(amount/500)), 'money': (0-amount)}});
    }
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
  }
});
