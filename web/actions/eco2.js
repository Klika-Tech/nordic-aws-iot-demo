import { ECO2_UPDATE } from '../actionTypes';
import { push, fetch } from './common/metric';

export const eco2Fetch = fetch(ECO2_UPDATE, 'eco2');

export const eco2Push = push(ECO2_UPDATE, 'eco2');
