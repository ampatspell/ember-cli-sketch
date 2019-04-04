import Component from '@ember/component';
import layout from './template';
import { assign } from '@ember/polyfills';

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editors-editor' ],
  layout,

  actions: {
    ready(stage) {
      stage.node.center();
    },
    center() {
      this.stage.node.center();
    },
    fit() {
      this.stage.node.fit({ offset: 100 });
    },
    setGlobal(key, value){
      setGlobal({ [key]: value });
    },
    async addNode(type, props) {
      let pos = (p, s) => this.stage.node.frame.absolute[p] - props[s];
      let x = pos('x', 'width');
      let y = pos('y', 'height');
      let model = await this.stage.addNode(null, type, assign({ x, y }, props));

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
    setTool(type) {
      let { node } = this.stage;
      node.tools.activate(type);
      node.focus();
    }
  }

});
