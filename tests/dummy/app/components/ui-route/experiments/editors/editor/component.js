import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editors-editor' ],
  layout,

  isAddingNode: equal('stage.node.tools.selected.type', 'node/add'),

  attached: computed(function() {
    return this.stage;
  }),

  actions: {
    toggle() {
      if(this.attached) {
        this.set('attached', null);
      } else {
        this.set('attached', this.stage);
      }
    },
    ready(stage) {
      stage.node.fit({ offset: 100 });
    },
    center(type) {
      this.stage.node.center({ type });
    },
    fit(type) {
      this.stage.node.fit({ offset: 100, type });
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
      this.stage.update({ [prop]: value });
    },
    resetPosition() {
      this.stage.update({ x: 0, y: 0 });
    },
    updateNodeProperty(node, key, value) {
      node.model.update({ [key]: value });
    },
    toggleNodeProperty(node, key) {
      let value = !node.model[key];
      node.model.update({ [key]: value });
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
    }
  }

});
