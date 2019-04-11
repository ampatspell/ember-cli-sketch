import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('experiments', function() {
    this.route('editors', function() {
      this.route('editor', { path: ':editor_id' }, function() {
        this.route('render', { path: 'render/:width/:height' });
      });
    });
  });

});

export default Router;
