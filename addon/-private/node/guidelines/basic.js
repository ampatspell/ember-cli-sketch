import Guidelines from '../guidelines';

export default Guidelines.extend({

  recompute(source, target) {
    let lines = [];

    // horizontal

    // TODO: this needs top-middle, top-bottom and so on permutations

    // top - top
    if(source.y === target.y) {
      lines.push({ direction: 'horizontal', y: source.y });
    }

    // middle - middle
    if(source.y + (source.height / 2) === target.y + (target.height / 2)) {
      lines.push({ direction: 'horizontal', y: source.y + (source.height / 2) });
    }

    // bottom - bottom
    if(source.y + source.height === target.y + target.height) {
      lines.push({ direction: 'horizontal', y: source.y + source.height });
    }

    // vertical

    // left - left
    if(source.x === target.x) {
      lines.push({ direction: 'vertical', x: source.x });
    }

    // middle - middle
    if(source.x + (source.width / 2) === target.x + (target.width / 2)) {
      lines.push({ direction: 'vertical', x: source.x + (source.width / 2) });
    }

    // right - right
    if(source.x + source.width === target.x + target.width) {
      lines.push({ direction: 'vertical', x: source.x + source.width });
    }

    return lines;
  }

});
