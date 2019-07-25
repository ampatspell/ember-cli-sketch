import Guidelines from 'ember-cli-sketch/-private/node/guidelines/basic';

export default Guidelines.extend({

  _buildPointsForFrame(frame, positionKey, sizeKey) {
    let points = this._super(...arguments);

    let position = frame[positionKey];
    let size = frame[sizeKey];

    let offset = 50;

    return [
      ...points,
      position + offset,
      position + size - offset
    ];
  }

});
