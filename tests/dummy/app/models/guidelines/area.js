import Guidelines from 'ember-cli-sketch/-private/node/guidelines/basic';

export default Guidelines.extend({

  calculatePointsForFrame({ x, y, width, height }) {
    return {
      vertical: [
        x,
        x + 50,
        x + (width / 2),
        x + width - 50,
        x + width - 1
      ],
      horizontal: [
        y,
        y + 50,
        y + (height / 2),
        y + height - 50,
        y + height - 1
      ]
    };
  }

});
