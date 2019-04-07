import Service from '@ember/service';
import { computed } from '@ember/object';
import { create } from '../utils/model';

export default Service.extend({

  firestore: computed(function() {
    return window.firebase.firestore();
  }).readOnly(),

  async doc(path, keys) {
    let ref = this.firestore.doc(path);
    let model = create(this, 'document', { ref, keys });
    await model.start();
    return model;
  },

  async add(path, props) {
    let ref = this.firestore.collection(path).doc();
    await ref.set(props);
    return ref.id;
  },

  async query(path, keys, props) {
    let ref = this.firestore.collection(path);
    let model = create(this, 'query', { ref, keys, props });
    await model.start();
    return model;
  }

})
