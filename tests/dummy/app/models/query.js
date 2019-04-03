import EmberObject, { computed } from '@ember/object';
import { A } from '@ember/array';
import { create } from '../utils/model';
import { assign } from '@ember/polyfills';

export default EmberObject.extend({

  ref: null,

  models: computed(function() {
    return A();
  }).readOnly(),

  start() {
    return new Promise(resolve => {
      let first = true;
      this.ref.onSnapshot(snapshot => {
        this.onSnapshot(snapshot);
        if(first) {
          first = false;
          resolve(this);
        }
      });
    });
  },

  createDocument(snapshot) {
    let doc = create(this, 'document', { ref: snapshot.ref, keys: this.keys });
    doc.onSnapshot(snapshot);
    return doc;
  },

  createModel(doc) {
    let { type } = doc;
    let { props } = this;
    return create(this, `node/${type}`, assign({ doc }, props));
  },

  onSnapshot(snapshot) {
    let { models } = this;
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      let { type, oldIndex, newIndex, doc: snapshot } = change;
      let path = snapshot.ref.path;
      if(type === 'added') {
        let doc = this.createDocument(snapshot);
        let model = this.createModel(doc);
        models.insertAt(newIndex, model);
      } else if(type === 'modified') {
        let model = models.objectAt(oldIndex);
        let doc = model.doc;
        if(!doc || doc.get('ref.path') !== path) {
          doc = models.findBy('doc.ref.path', path);
        }
        doc.onSnapshot(snapshot);
        if(oldIndex !== newIndex) {
          models.removeAt(oldIndex);
          models.insertAt(newIndex, model);
        }
      } else if(type === 'removed') {
        models.objectAt(oldIndex).remove();
        models.removeAt(oldIndex);
      }
    });
  }

});
