import Mixin from '@ember/object/mixin';
import { next } from '@ember/runloop';

export default Mixin.create({
  classNameBindings: [ 'show:show' ],

  show: false,

  didInsertElement() {
    this._super(...arguments);
    next(() => {
      if(this.isDestroying) {
        return;
      }
      this.set('show', true)
    });
  }

});
