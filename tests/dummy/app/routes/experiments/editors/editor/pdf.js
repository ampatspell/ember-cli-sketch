import Route from '@ember/routing/route';

export default Route.extend({

  model({ width, height }) {
    return this.modelFor('experiments.editors.editor').prepareForRender({ width, height });
  }

});
