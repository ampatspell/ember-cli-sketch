import { readOnly } from '@ember/object/computed';

export const model = key => readOnly(`owner.model.${key}`);
