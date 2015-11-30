Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('players');
  }
});

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
