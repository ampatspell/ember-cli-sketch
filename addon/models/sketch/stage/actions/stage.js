import Actions, { model } from './-actions';

const stage = type => model(`stage/${type}`);

export default Actions.extend({

  zoom: stage('zoom')

});
