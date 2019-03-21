import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import { assert } from '@ember/debug';

export const sketches = owner => getOwner(owner).lookup('service:sketches');

export default Service.extend({

  model(name, props) {
    let fullName = `model:sketch/${name}`;
    let factory = getOwner(this).factoryFor(fullName);
    assert(`Factory '${fullName}' not registered`, !!factory);
    let model = factory.create();
    model.prepare(props);
    return model;
  },

  factory: computed(function() {
    return this.model('factory', { owner: this });
  }).readOnly()

});
