import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editor' ],
  layout,

  sketches: service(),

  stage: computed(function() {
    let { sketches: { factory } } = this;
    let stage = factory.stage.create();
    stage.position.setProperties({ x: 100, y: 50 });
    {
      let area = factory.area({ frame: { x: 20, y: 20, width: 560, height: 360 } });
      {
        let group = factory.node('group');
        area.setGroup(group);
        {
          let node = factory.node('rect', { frame: { x: 300, y: 100, width: 50, height: 50 }, fill: 'red' });
          group.addNode(node);
        }
        {
          let node = factory.node('rect', { frame: { x: 100, y: 80, width: 50, height: 50 }, fill: 'red' });
          group.addNode(node);
        }
        {
          let node = factory.node('rect', { frame: { x: 200, y: 150, width: 50, height: 50 }, fill: 'red' });
          group.addNode(node);
        }
      }
      stage.addArea(area);
    }
    {
      let area = factory.area({ frame: { x: 20, y: 420, width: 560, height: 200 } });
      {
        let group = factory.node('group');
        area.setGroup(group);
        {
          let node = factory.node('rect', { frame: { x: 150, y: 80, width: 50, height: 50 }, fill: 'red' });
          group.addNode(node);
        }
      }
      stage.addArea(area);
    }
    return stage;
  }).readOnly(),

  attachedStage: computed(function() {
    return this.stage;
  }),

  actions: {
    toggle() {
      if(this.attachedStage) {
        this.set('attachedStage', null);
      } else {
        this.set('attachedStage', this.stage);
      }
    },
    updateZoom(zoom) {
      this.stage.setProperties({ zoom });
    },
    updatePosition(key, value) {
      this.stage.position.setProperties({ [key]: value });
    },
    updateNodePosition(node, key, value) {
      node.frame.setProperties({ [key]: value });
    },
    select(node) {
      node.select();
    },
    reset() {
      this.stage.reset();
    }
  }

});
