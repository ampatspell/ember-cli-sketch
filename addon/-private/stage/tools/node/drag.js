import Tool from '../-base';
import StateDeltaMixin from './-state-delta-mixin';

export default Tool.extend(StateDeltaMixin, {

  guidelines: true,

  update(delta) {
    delta = this.zoomedDelta(delta);

    this.state.forEach(state => {
      let { node } = state;
      state.invoke(delta, point => {
        node.update(point);
        node.perform('snap-to-guidelines');
      });
      node.perform('move-to-container');
    });
  },

  onMouseMove({ delta }) {
    this.hover.reset();
    this.update(delta);
  },

  onMouseUp() {
    this.done();
  },

  activate() {
    this.state = this.createStateForNodes(this.selection.selectable);
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.state = null;
  }

});
