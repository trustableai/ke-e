/**
 * @module
 */
import Random from 'random-js';
import {fromGenMaker} from '../arbitrary';

/**
 * Integer Arbitrary
 *
 * @type {Arbitrary}
 *
 * @example
 * // Produce an integer within inclusive range [-5, 5].
 * ke.int.choose(-5, 5).generate();
 */
export const int = fromGenMaker(Random.integer,
                                [-Number.MAX_SAFE_INTEGER,
                                 Number.MAX_SAFE_INTEGER]).name('Integer');

/**
 * Positive Integer Arbitary
 *
 * @type {Arbitary}
 */
export const pint = int
  .choose(0, Number.MAX_SAFE_INTEGER)
  .name('Positive Integer');

/**
 * Negative Arbitrary
 *
 * @type {Arbitrary}
 */
export const nint = int.
  choose(-Number.MAX_SAFE_INTEGER, -1)
  .name('Negative Integer');

/**
 * Nature Number Arbitary
 *
 * @type {Arbitrary}
 */
export const nat = int
  .choose(1, Number.MAX_SAFE_INTEGER)
  .name('Nat');

/**
 * Nature Number Arbitary
 *
 * @type {Arbitrary}
 */
export const number = fromGenMaker(
  Random.real ,
  [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])
  .name('Number');

/**
 * Positive Number Arbitary
 *
 * @type {Arbitrary}
 */
export const pnumber = number
  .choose(0, Number.MAX_SAFE_INTEGER)
  .name('Positive Number');

/**
 * Negative Number Arbitary
 *
 * @type {Arbitrary}
 */
export const nnumber = number
  .choose(-Number.MAX_SAFE_INTEGER, -0.0000000001)
  .name('Negative Number');
