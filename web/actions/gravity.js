import { GRAVITY_UPDATE } from '../actionTypes';
import { fetch, push } from './common/dimensions';

export const gravityFetch = fetch(GRAVITY_UPDATE, 'gravity');

export const gravityPush = push(GRAVITY_UPDATE, 'gravity');

