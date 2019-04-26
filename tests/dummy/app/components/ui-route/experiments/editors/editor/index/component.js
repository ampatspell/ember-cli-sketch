import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { equal, and } from '@ember/object/computed';
import { sketches } from 'ember-cli-sketch/sketches'
import setGlobal from '../../../../../../utils/set-global';

const identifier = name => computed(`stage.nodes.@each.identifier`, function() {
  return this.stage.nodes.findBy('identifier', name);
}).readOnly();

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editors-editor-index' ],
  layout,

  isAddingNode: equal('stage.node.tools.selected.type', 'node/add'),

  attached: computed(function() {
    return this.stage;
  }),

  fonts: computed(function() {
    return sketches(this).fonts.families;
  }).readOnly(),

  background: identifier('background'),
  content: identifier('content'),
  backgroundAndContent: and('background', 'content'),

  actions: {
    toggle() {
      if(this.attached) {
        this.set('attached', null);
      } else {
        this.set('attached', this.stage);
      }
    },
    ready(stage) {
      stage.node.perform('fit', { offset: 20, zoom: 3 });
    },
    toggleSelectable() {
      let { stage } = this;
      let value = !stage.selectable;
      this.stage.node.perform('selectable', { value });
    },
    center(type) {
      this.stage.node.perform('center', { type });
    },
    fit(type) {
      this.stage.node.perform('fit', { offset: 15, type, zoom: 3 });
    },
    setGlobal(key, value){
      setGlobal({ [key]: value });
    },
    select(node) {
      node.node.select();
    },
    async addNode(type, props) {
      let model = await this.stage.addNode(null, type, props);

      let delegate = {
        cancel() {
          model.remove();
        },
        commit() {
        }
      };
      this.stage.node.tools.activate('node/add', { model, delegate });
    },
    updateStageProperty(prop, value) {
      this.stage.node.update({ [prop]: value }, { interaction: true });
    },
    performActionValue(node, name, value) {
      node.perform(name, { value });
    },
    performAction(node, name) {
      node.perform(name);
    },
    updateNodeProperty(node, key, value) {
      node.update({ [key]: value });
    },
    toggleNodeProperty(node, key) {
      let value = !node.model[key];
      node.update({ [key]: value });
    },
    setTool(type) {
      let { node } = this.stage;
      node.tools.activate(type);
      node.focus();
    },
    moveUp(node) {
      node.moveUp();
    },
    moveDown(node) {
      node.moveDown();
    },
    updateSizeFromAspect(node) {
      node.updateSizeBasedOnAspectRatio();
    },
    toggleContentBackground() {
      let { content, background } = this;
      if(content.visible) {
        background.update({ selectable: true });
        content.update({ visible: false });
      } else {
        background.update({ selectable: false });
        content.update({ visible: true });
      }
    },
    createPdf() {
      this.stage.generate('pdf', { width: 210, height: 297 });
    },
    createImage() {
      this.stage.generate('image', { width: 1024, height: 1024 });
    },
  }

});
