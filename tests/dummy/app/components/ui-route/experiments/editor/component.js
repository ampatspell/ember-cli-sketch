import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { create } from '../../../../utils/model';

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editor' ],
  layout,

  stage: computed(function() {
    let doc = create(this, 'document', { id: 'stage', type: 'stage', x: 0, y: 0, zoom: 1 });
    let stage = create(this, 'stage', { doc });

    let addArea = (id, x, y) => {
      let area = stage.addNode(id, 'area', null, { x, y, width: 300, height: 300 });
      stage.addNode(`${id}-1`, 'rect', area, { x: 10, y: 10, width: 50, height: 50, fill: 'red', opacity: 0.5 });
      stage.addNode(`${id}-2`, 'rect', area, { x: 70, y: 10, width: 50, height: 50, fill: 'green', opacity: 0.5 });
    };

    addArea('1', 0, 0);
    addArea('2', 0, 320);

    setGlobal({ stage });
    return stage;
  }).readOnly(),

  actions: {
    setGlobal(key, value){
      setGlobal({ [key]: value });
    }
  }

});
