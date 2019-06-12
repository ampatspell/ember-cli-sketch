import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({

  source: null, // edges
  target: null, // edges

  matches: computed('source.frame', 'target.frame', function() {
    let {
      source: { frame: { x: sx, y: sy, width: sw, height: sh } },
      target: { frame: { x: tx, y: ty, width: tw, height: th } }
    } = this;

    let tyh = ty + th;
    let txw = tx + tw;
    let syh = sy + sh;
    let sxw = sx + sw;

    return (sy >= ty && sy <= tyh)   ||
           (syh >= ty && syh <= tyh) ||
           (sx >= tx && sx <= txw)   ||
           (sxw >= tx && sxw <= txw);
  }).readOnly(),

  guidelines: computed('matches', function() {
    let { matches, source, target } = this;
    if(!matches) {
      return;
    }
    return source.guidelines(target);
  }).readOnly(),

});
