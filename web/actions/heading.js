import { HEADING_UPDATE } from '../actionTypes';
import { push, fetch } from './common/metric';

export const headingFetch = fetch(HEADING_UPDATE, 'heading');

export const headingPush = push(HEADING_UPDATE, 'heading');
