import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { assign } from '@ember/polyfills';
import { getOwner } from '@ember/application';

const transforms = {
  'toFloat': value => parseFloat(value)
};

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editor' ],
  layout,

  sketches: service(),

  stage: computed(function() {
    let { sketches: { factory } } = this;
    let stage = factory.stage.create({ frame: { x: 50, y: 50 } });

    let createRects = (parent, ox, oy) => {
      {
        let node = factory.node.create('rect', {
          frame: { x: ox, y: oy, width: 50, height: 50, rotation: 2 },
          constraints: { horizontal: { min: 20, max: 100 }, vertical: { min: 20, max: 100 } },
          fill: '#ff9c66',
          opacity: 0.5
        });
        parent.nodes.addNode(node);
      }
      {
        let node = factory.node.create('rect', {
          frame: { x: ox+50, y: oy, width: 50, height: 50, rotation: -2 },
          fill: '#80ff88',
          opacity: 0.3
        });
        parent.nodes.addNode(node);
      }
      {
        let node = factory.node.create('rect', {
          frame: { x: ox, y: oy+50, width: 50, height: 50, rotation: -2 },
          fill: '#668fff',
          opacity: 0.2
        });
        parent.nodes.addNode(node);
      }
      {
        let node = factory.node.create('rect', {
          frame: { x: ox+50, y: oy+50, width: 50, height: 50, rotation: 2 },
          fill: '#ff7d66',
          opacity: 0.2
        });
        parent.nodes.addNode(node);
      }
    }

    let createArea = (parent, ox, oy) => {
      let area = factory.node.area({
        frame: { x: ox, y: oy, width: 500, height: 200 },
        // constraints: {
        //   horizontal: { resize: false, move: false },
        //   vertical: { resize: true, min: 100, max: 400 }
        // }
      });
      createRects(area, 20, 20);
      let group = area.nodes.addNode(factory.node.group());
      createRects(group, 160, 20);
      parent.nodes.addNode(area);
    }

    createArea(stage, 10, 10);
    createArea(stage, 10, 250);
    createRects(stage, 20, 470);
    return stage;
  }).readOnly(),

  attachedStage: computed(function() {
    return this.stage;
  }),

  documents: computed(function() {
    let array = A();
    let add = (parentId, id, type, props) => array.pushObject(getOwner(this).factoryFor('model:document').create(assign({ parentId, id, type }, props)));

    add(null, 'area-1', 'area', { x: 0, y: 0, width: 500, height: 200 });
    add('area-1', 'rect-1', 'rect', { x: 10, y: 10, width: 50, height: 50, rotation: 2, fil: 'red', opacity: 0.5 });
    add('area-1', 'rect-2', 'rect', { x: 70, y: 10, width: 50, height: 50, rotation: 2, fil: 'green', opacity: 0.5 });

    return array;
  }).readOnly(),

  actions: {
    ready(stage) {
      let { documents } = this;
      setGlobal({ documents });
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
