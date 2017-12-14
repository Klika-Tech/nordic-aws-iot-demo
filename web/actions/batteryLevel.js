import { BATTERY_UPDATE } from '../actionTypes';
import { push, fetch } from './common/metric';

export const batteryLevelFetch = fetch(BATTERY_UPDATE, 'batteryLevel');

export const batteryLevelPush = push(BATTERY_UPDATE, 'batteryLevel');
