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
    let stage = factory.stage.create({ frame: { x: 100, y: 50 } });
    {
      let area = factory.stage.node('area', { frame: { x: 70, y: 0, width: 560, height: 360 }, constraints: { horizontal: { resize: false, move: false }, vertical: { resize: true, min: 100, max: 400 } } });
      // {
      //   let group = factory.stage.node('group');
      //   area.nodes.addNode(group);
      //   // let group = area;
      //   {
      //     let node = factory.stage.node('rect', {
      //       frame: { x: 300, y: 100, width: 50, height: 50, rotation: 10 },
      //       constraints: { horizontal: { min: 20, max: 100 }, vertical: { min: 20, max: 100 } },
      //       fill: 'red', opacity: 0.5
      //     });
      //     group.nodes.addNode(node);
      //   }
      //   {
      //     let node = factory.stage.node('rect', { frame: { x: 100, y: 80, width: 50, height: 50, rotation: 8 }, fill: 'green', opacity: 0.3 });
      //     group.nodes.addNode(node);
      //   }
      //   {
      //     let node = factory.stage.node('rect', { frame: { x: 200, y: 150, width: 50, height: 50, rotation: -24 }, fill: 'blue', opacity: 0.2 });
      //     group.nodes.addNode(node);
      //   }
      // }
      setGlobal({ area });
      stage.nodes.addNode(area);
    }
    // {
    //   let area = factory.stage.node('area', {
    //     frame: { x: 0, y: 430, width: 560, height: 200 },
    //     constraints: { horizontal: { min: 100, max: 600 }, vertical: { min: 100, max: 200 } }
    //   });
    //   {
    //     let group = factory.stage.node('group');
    //     area.nodes.addNode(group);
    //     // let group = area;
    //     {
    //       let node = factory.stage.node('rect', { frame: { x: 150, y: 80, width: 50, height: 50, rotation: 23 }, fill: '#990099', opacity: 0.5 });
    //       group.nodes.addNode(node);
    //     }
    //   }
    //   stage.nodes.addNode(area);
    // }
    // stage.nodes.addNode(factory.stage.node('rect', { frame: { x: 330, y: 700, width: 50, height: 50, rotation: -9 }, fill: '#999900', opacity: 0.3 }));
    setGlobal({ stage });
    return stage;
  }).readOnly(),

  attachedStage: computed(function() {
    return this.stage;
  }),

  actions: {
    ready(stage) {
      // stage.center();
    },
    toggle() {
      if(this.attachedStage) {
        this.set('attachedStage', null);
      } else {
        this.set('attachedStage', this.stage);
      }
    },
    center() {
      this.stage.center();
    },
    fit() {
      this.stage.fit({ offset: 25 });
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
      let group = this.stage.areas.all.firstObject.group;
      let node = this.sketches.factory.node(type, { frame: { x: 100, y: 100, width: 50, height: 50 }, fill: '#990000' });
      group.addNode(node, { select: true });
    },
    remove(node) {
      node.remove();
    },
    setGlobal(node) {
      setGlobal({ node });
    }
  }

});
