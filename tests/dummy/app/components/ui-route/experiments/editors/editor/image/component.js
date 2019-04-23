import Component from '@ember/component';
import layout from './template';

// let log = [];

// let wait = () => {
//   let content = document.querySelector('.ui-block-sketch-stage-content');
//   if(content) {
//     log.push(content.innerHTML);
//   }
//   let el = document.querySelector('.ui-block-sketch-stage-ready');
//   if(!el) {
//     setTimeout(wait, 0);
//   } else {
//     debugger;
//   }
// };

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editors-editor-image' ],
  layout,

  // init() {
  //   this._super(...arguments);
  //   wait();
  // },

  actions: {
    ready(stage) {
      stage.node.perform('fit', { offset: 0 });
    }
  }

});
