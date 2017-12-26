import { COMPASS_UPDATE } from '../actionTypes';
import { fetch, push } from './common/dimensions';

export const compassFetch = fetch(COMPASS_UPDATE, 'compass');

export const compassPush = push(COMPASS_UPDATE, 'compass');

