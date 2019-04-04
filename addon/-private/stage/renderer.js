import EmberObject from '@ember/object';
import { readOnly, bool } from '@ember/object/computed';
import { assert } from '@ember/debug';

export default EmberObject.extend({

  stage: null,

  _component: null,

  isAttached: bool('_component'),
  size: readOnly('_component.size'),

  attach(_component) {
    assert(`Stage ${this} is already attached to ${this._component}`, !this._component);
    this.setProperties({ _component });
  },

  detach() {
    this.setProperties({ _component: null });
  },

  recalculateSize() {
    let { isAttached, _component } = this;
    if(!isAttached) {
      return;
    }
    _component.recalculateSize();
  },

  focus() {
    let { isAttached, _component } = this;
    if(!isAttached) {
      return;
    }
    _component.focus();
  }

});
