import { A } from '@ember/array';

export const diff = ({ array, objects, find, create }) => {

  let remove = A(array.slice());
  let add = [];

  objects.forEach(item => {
    let model = find(item);
    if(model) {
      remove.removeObject(model);
    } else {
      model = create(item);
      add.push(model);
    }
  });

  array.removeObjects(remove);
  remove.forEach(model => model.destroy());
  array.pushObjects(add);

  return add.length || remove.length;
}
