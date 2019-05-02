import Tool from '../-base';

export default Tool.extend({

  resizing: false,
  model: null,
  delegate: null,

  cursor: 'none',

  update({ delta }={}) {
    let { model: { node }, mouse: { absolute }, zoom } = this;

    let parent = node.parent.frame.absolute;
    let frame = node.frame.properties;

    let { x, y, width, height } = frame;

    if(delta) {
      width += (delta.x / zoom);
      height += (delta.y / zoom);
    } else {
      let calc = (dimension, size) => absolute[dimension] - parent[dimension] - (frame[size] / 2);
      x = calc('x', 'width');
      y = calc('y', 'height');
    }

    node.update({ x, y, width, height, visible: true });
  },

  commit() {
    let { model, model: { node }, delegate } = this;

    node.perform('move-to-container');
    node.select();
    delegate.commit && delegate.commit(model);

    this.reset();
    this.done();
  },

  _resizing() {
    this.set('resizing', true);
    this.model.node.select();
  },

  onMouseDown({ button }) {
    if(button !== 0) {
      this.done();
      return;
    }
    this._resizing();
  },

  onMouseMove({ delta }) {
    if(this.resizing) {
      this.update({ delta });
    } else {
      this.update();
    }
  },

  onMouseUp() {
    this.commit();
  },

  activate({ model, delegate }) {
    let { stage } = this;

    stage.focus();
    stage.selection.reset();

    this.setProperties({ model, delegate });

    this.update();
    model.node.hover();
  },

  deactivate() {
    let { delegate, model } = this;
    if(delegate) {
      model.node.deselect();
      delegate.cancel && delegate.cancel(model);
    }
    this.reset();
  },

  reset() {
    this.setProperties({ model: null, delegate: null, resizing: false });
  }

});
