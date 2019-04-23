import { Promise } from 'rsvp';
import { next as _next, schedule as _schedule, later as _later } from '@ember/runloop';

export const next = () => new Promise(resolve => _next(resolve));
export const afterRender = () => new Promise(resolve => _schedule('afterRender', resolve));
export const actions = () => new Promise(resolve => _schedule('actions', resolve));
export const later = delay => new Promise(resolve => _later(resolve, delay));
