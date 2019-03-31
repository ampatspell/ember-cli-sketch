import Mixin from '@ember/object/mixin';
import { readOnly } from '@ember/object/computed';

const model = key => readOnly(`owner.model.${key}`);

export const Position = Mixin.create({

  x: model('x'),
  y: model('y')

});

export const Size = Mixin.create({

  width:  model('width'),
  height: model('height')

});

export const Rotation = Mixin.create({

  rotation: model('rotation')

});
