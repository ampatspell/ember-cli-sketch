import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

const transforms = {
  'toFloat': value => parseFloat(value)
};

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editor' ],
  layout,

  sketches: service(),

  documents: computed(function() {
    return getOwner(this).factoryFor('model:documents').create();
  }).readOnly(),

  // TODO: leaks
  model: computed(function() {
    let { documents } = this;
    return this.sketches.factory.model.stage('document-array', { documents });
  }).readOnly(),

  stage: computed(function() {
    return this.model.stage;
  }).readOnly(),

  attachedStage: computed(function() {
    return this.stage;
  }),

  didInsertElement() {
    this._super(...arguments);
    setGlobal({ component: this });
  },

  actions: {
    ready(stage) {
      stage.center();
    },
    toggle() {
      if(this.attachedStage) {
        this.set('attachedStage', null);
      } else {
        this.set('attachedStage', this.stage);
      }
    },
    center(type) {
      this.stage.center({ type });
    },
    fit(type) {
      this.stage.fit({ type, offset: 25 });
    },
    updateZoom(zoom) {
      this.stage.setProperties({ zoom });
    },
    updateStagePosition(key, value) {
      this.stage.frame.setProperties({ [key]: value });
    },
    updateNodePosition(node, key, value) {
      node.frame.setProperties({ [key]: value });
    },
    updateNodeProperty(node, key, transform, value) {
      if(transform) {
        value = transforms[transform](value);
      }
      node.setProperties({ [key]: value });
    },
    select(node) {
      node.select();
    },
    reset() {
      this.stage.reset();
    },
    add(type) {
      let parent = component.stage.selection.all.firstObject;
      if(!parent) {
        return;
      }
      let area;
      if(parent.isArea) {
        area = parent;
      } else {
        area = parent.area;
        if(!area) {
          return
        }
      }
      this.documents.add(area.model.id, 'added', type, { x: 50, y: 50, width: 50, height: 50, fill: 'red', opacity: 0.5 });
    },
    remove(node) {
      node.remove();
    },
    setGlobal(node) {
      setGlobal({ node });
    }
  }

});
