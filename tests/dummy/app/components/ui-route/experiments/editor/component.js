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
    let { sketches: { factory }, documents } = this;
    let stage = factory.stage.create({ frame: { x: 50, y: 50 } });

    let nodes = {};
    documents.forEach(doc => {

      let { parentId, id, x, y, width, height, rotation, fill, opacity } = doc;
      let node = factory.node.create(doc.type, { frame: { x, y, width, height, rotation }, fill, opacity });
      nodes[id] = node;

      let parent = stage;
      if(parentId) {
        parent = nodes[parentId];
      }

      parent.nodes.addNode(node);
    });
    return stage;
  }).readOnly(),

  attachedStage: computed(function() {
    return this.stage;
  }),

  documents: computed(function() {
    let array = A();
    let add = (parentId, id, type, props) => array.pushObject(getOwner(this).factoryFor('model:document').create(assign({ parentId, id, type }, props)));

    let addArea = (id, x, y) => {
      add(null, id, 'area', { x, y, width: 500, height: 200 });
      add(id, `${id}-rect-1`, 'rect', { x: 10, y: 10, width: 50, height: 50, rotation: 2, fill: 'red', opacity: 0.5 });
      add(id, `${id}-rect-2`, 'rect', { x: 70, y: 10, width: 50, height: 50, rotation: 2, fill: 'green', opacity: 0.5 });
    }

    addArea('area-1', 0, 0);
    addArea('area-2', 0, 240);

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
