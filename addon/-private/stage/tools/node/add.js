import Tool from '../-base';

export default Tool.extend({

  update() {
    let { model: { node }, mouse: { absolute } } = this;
    let parent = node.parent.frame.absolute;
    let calc = (prop, o) => absolute[prop] - parent[prop] + o;
    let x = calc('x', 12);
    let y = calc('y', 3);
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
