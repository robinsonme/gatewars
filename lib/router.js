Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('timers');
  }
});

var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('home');
  } else {
    this.next();
  }
};

var goToCommand = function(pause) {
  if (Meteor.loggingIn()) {
    Router.go('command');
  } else {
    this.next();
  }
};

Router.route('/', {
  name: 'home',
  waitOn: function() {
    return Meteor.subscribe('players');
  }
});

Router.route('/about', {
  name: 'about'
});

Router.route('/contact', {
  name: 'contact'
});

Router.route('/command', {
  name: 'command',
  waitOn: function() {
    return [ Meteor.subscribe('workers'), Meteor.subscribe("soldiers") ];
  }
});

Router.route('/bank', {
  name: 'bank'
});

Router.route('/battleground', {
  name: 'battleground',
  waitOn: function() {
    return Meteor.subscribe('players');
  }
});

Router.route('/facilities', {
  name: 'facilities',
  waitOn: function() {
    return [ Meteor.subscribe('workers'), Meteor.subscribe('facilities') ];
  }
});

Router.route('/training', {
  name: 'training',
  waitOn: function() {
    return [ Meteor.subscribe('workers'), Meteor.subscribe("soldiers"), Meteor.subscribe("resources"), Meteor.subscribe('facilities') ];
  }
});

Router.route('/armory', {
  name: 'armory',
  waitOn: function() {
    return [ Meteor.subscribe('workers'), Meteor.subscribe("soldiers"),
      Meteor.subscribe('offWeapons'), Meteor.subscribe('defWeapons') ];
  }
});

Router.route('/science', {
  name: 'science'
});

Router.route('/market', {
  name: 'market'
});

Router.onBeforeAction(mustBeSignedIn, {except: ['home', 'about', 'contact']});
Router.onBeforeAction(goToCommand, {only: ['home', 'about', 'contact']});

Router.route('/cancel', {
  name: 'cancel'
});

Router.route('/success', {
  name: 'success'
});
