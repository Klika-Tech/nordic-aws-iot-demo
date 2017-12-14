import { TVOC_UPDATE } from '../actionTypes';
import { push, fetch } from './common/metric';

export const tvocFetch = fetch(TVOC_UPDATE, 'tvoc');

export const tvocPush = push(TVOC_UPDATE, 'tvoc');
