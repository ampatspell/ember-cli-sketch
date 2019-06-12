import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({

  source: null, // edges
  target: null, // edges

  matches: computed('source.frame', 'target.frame', function() {
    let source = this.source.frame;
    let target = this.target.frame;

    let { x: sx, y: sy, width: sw, height: sh } = source;
    let { x: tx, y: ty, width: tw, height: th } = target;

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

    return [
      { direction: 'horizontal', x: 10, y: 10, length: 100 }
    ];
  }).readOnly(),

});
