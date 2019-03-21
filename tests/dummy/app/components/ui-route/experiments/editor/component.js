import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const transforms = {
  'toFloat': value => parseFloat(value)
};

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editor' ],
  layout,

  sketches: service(),

  stage: computed(function() {
    let { sketches: { factory } } = this;
    let stage = factory.stage.create();
    stage.position.setProperties({ x: 100, y: 50 });
    {
      let area = factory.area({ frame: { x: 70, y: 0, width: 560, height: 360 }, constraints: { width: { resize: false, move: false }, height: { resize: true, min: 100, max: 400 } } });
      window.area = area;
      {
        let group = factory.node('group');
        area.setGroup(group);
        {
          let node = factory.node('rect', {
            frame: { x: 300, y: 100, width: 50, height: 50, rotation: 10 },
            constraints: { width: { min: 20, max: 100 }, height: { min: 20, max: 100 } },
            fill: 'red', opacity: 0.5
          });
          group.addNode(node);
        }
        {
          let node = factory.node('rect', { frame: { x: 100, y: 80, width: 50, height: 50, rotation: 8 }, fill: 'green', opacity: 0.3 });
          group.addNode(node);
        }
        {
          let node = factory.node('rect', { frame: { x: 200, y: 150, width: 50, height: 50, rotation: -24 }, fill: 'blue', opacity: 0.2 });
          group.addNode(node);
        }
      }
      stage.areas.add(area);
    }
    {
      let area = factory.area({
        frame: { x: 0, y: 430, width: 560, height: 200 },
        constraints: { width: { min: 100, max: 600 }, height: { min: 100, max: 200 } }
      });
      {
        let group = factory.node('group');
        area.setGroup(group);
        {
          let node = factory.node('rect', { frame: { x: 150, y: 80, width: 50, height: 50, rotation: 23 }, fill: '#990099', opacity: 0.5 });
          group.addNode(node);
        }
      }
      stage.areas.add(area);
    }
    window.stage = stage;
    return stage;
  }).readOnly(),

  attachedStage: computed(function() {
    return this.stage;
  }),

  actions: {
    ready(stage) {
      stage.position.center({ y: 100 });
    },
    toggle() {
      if(this.attachedStage) {
        this.set('attachedStage', null);
      } else {
        this.set('attachedStage', this.stage);
      }
    },
    center() {
      this.stage.position.center();
    },
    fit() {
      this.stage.position.fit({ offset: 25 });
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
      let group = stage.areas.all.firstObject.group;
      let node = this.sketches.factory.node(type, { frame: { x: 100, y: 100, width: 50, height: 50 }, fill: '#990000' });
      group.addNode(node, { select: true });
    },
    remove(node) {
      node.remove();
    }
  }

});
