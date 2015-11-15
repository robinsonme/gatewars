Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
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

Router.route('/battleGround', {
  name: 'battleGround'
});

Router.route('/market', {
  name: 'market'
});
