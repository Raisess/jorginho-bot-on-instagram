import { debug } from '../config.json';

export const log = (...toLog: any): void => debug ? console.log(toLog) : undefined;

