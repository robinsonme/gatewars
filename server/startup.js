Meteor.startup(function(){
  Meteor.setInterval(function(){
    Players.find({}).map(function(player) {
      Players.update({_id: player._id}, {$inc:{"money": player.rate}})
    });
  }, 1000)
});
