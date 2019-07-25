import GuidelinesArea from '../models/guidelines/area';

export default {
  name: 'dummy:sketches',
  initialize(container) {
    container.register('sketch:node/guidelines/types/area', GuidelinesArea);
  }
}
