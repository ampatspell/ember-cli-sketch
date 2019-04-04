import Component from '@ember/component';
import layout from './template';

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
    addNode(type, props) {
      let selection = this.stage.node.selection.attached.lastObject;
      let model = selection && selection.model;
      if(!model) {
        model = this.stage;
      }
      this.stage.addNode(model, type, props);
    },
    updateStageProperty(prop, value) {
      this.stage.update({ [prop]: value });
    },
    resetPosition() {
      this.stage.update({ x: 0, y: 0 });
    },
    updateNodeProperty(node, key, value) {
      node.model.update({ [key]: value });
    }
  }

});
