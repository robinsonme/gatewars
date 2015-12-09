Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('players');
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
  name: 'home'
});

Router.route('/about', {
  name: 'about'
});

Router.route('/contact', {
  name: 'contact'
});

Router.route('/command', {
  name: 'command'
});

Router.route('/armory', {
  name: 'armory'
});

Router.route('/training', {
  name: 'training'
});

Router.route('/science', {
  name: 'science'
});

Router.route('/battleground', {
  name: 'battleground'
});

Router.route('/market', {
  name: 'market'
});

Router.onBeforeAction(mustBeSignedIn, {except: ['home', 'about', 'contact']});
Router.onBeforeAction(goToCommand, {only: ['home', 'about', 'contact']});
