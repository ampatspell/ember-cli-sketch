import Tool from '../-base';

export default Tool.extend({

  cursor: 'none',

  update() {
    let { model: { node }, mouse: { absolute } } = this;
    let parent = node.parent.frame.absolute;
    let frame = node.frame.absolute;
    let calc = (dimension, size) => absolute[dimension] - parent[dimension] - (frame[size] / 2);
    let x = calc('x', 'width');
    let y = calc('y', 'height');
    node.update({ x, y });
  },

  commit() {
    let { stage, model, model: { node }, delegate } = this;

    stage.moveNodeToOverlappingContainer(node);
    node.select();
    delegate.commit && delegate.commit(model);

    this.reset();
    this.done();
  },

  onMouseMove() {
    this.update();
  },

  onMouseClick({ button }) {
    if(button !== 0) {
      return;
    }
    this.commit();
  },

  activate({ model, delegate }) {
    let { stage } = this;

    stage.focus();
    stage.selection.reset();

    this.setProperties({ model, delegate });

    let { node } = model;

    node.show();
    node.hover();

    this.update();
  },

  deactivate() {
    let { delegate, model } = this;
    if(delegate) {
      delegate.cancel && delegate.cancel(model);
    }
    this.reset();
  },

  reset() {
    this.setProperties({ model: null, delegate: null });
  }

});
