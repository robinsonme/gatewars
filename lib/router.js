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

Router.route('/bank', {
  name: 'bank'
});

Router.route('/contact', {
  name: 'contact'
});

Router.route('/command', {
  name: 'command',
  waitOn: function() {
    return Meteor.subscribe('workers');
  }
});

Router.route('/armory', {
  name: 'armory'
});

Router.route('/training', {
  name: 'training',
  waitOn: function() {
    return Meteor.subscribe('workers');
  }
});

Router.route('/science', {
  name: 'science'
});

Router.route('/battleground', {
  name: 'battleground',
  waitOn: function() {
    return Meteor.subscribe('players');
  }
});

Router.route('/market', {
  name: 'market'
});

Router.onBeforeAction(mustBeSignedIn, {except: ['home', 'about', 'contact']});
Router.onBeforeAction(goToCommand, {only: ['home', 'about', 'contact']});
