import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('experiments', function() {
    this.route('editors', function() {
      this.route('editor', { path: ':editor_id' }, function() {
        this.route('pdf', { path: 'pdf/:width/:height' });
        this.route('image');
      });
    });
  });

});

export default Router;
