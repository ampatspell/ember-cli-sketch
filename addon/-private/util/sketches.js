import { getOwner } from '@ember/application';

export default owner => owner.sketches || getOwner(owner).lookup('sketch:sketches');
