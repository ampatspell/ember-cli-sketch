import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editor' ],
  layout,

  actions: {
    ready(stage) {
      // stage.node.center();
    },
    center() {
      this.stage.node.center();
    },
    fit() {
      this.stage.node.fit();
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
    }
  }

});
