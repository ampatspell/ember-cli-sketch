import Guidelines, { points } from 'ember-cli-sketch/-private/node/guidelines/basic';
import { round } from 'ember-cli-sketch/util/math';

export default Guidelines.extend({

  points: points('zoom', function({ x, y, width, height }) {
    let { zoom } = this;
    let crop = round(50 * zoom, 1);
    return {
      vertical: [
        x,
        x + crop,
        x + (width / 2),
        x + width - crop,
        x + width - 1
      ],
      horizontal: [
        y,
        y + crop,
        y + (height / 2),
        y + height - crop,
        y + height - 1
      ]
    };
  })

});
