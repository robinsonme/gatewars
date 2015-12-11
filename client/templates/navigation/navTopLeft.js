Template.navTopLeft.helpers({
  'activeIfTemplateIs': function(template) {
    var currentRoute = Router.current();
    return currentRoute &&
      template === currentRoute.lookupTemplate() ? 'active' : '';
  },
  'formatNumber':function(number) {
    return number.toLocaleString();
  },
  'player':function() {
    var currentUser = Meteor.userId();
    return Players.findOne({createdBy: currentUser});
  }
});

Template.navTopLeft.onCreated(function() {
  this.subscribe('thisPlayer');
});
