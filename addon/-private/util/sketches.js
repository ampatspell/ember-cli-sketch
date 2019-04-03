import { getOwner } from '@ember/application';

export default owner => getOwner(owner).lookup('sketch:sketches');
