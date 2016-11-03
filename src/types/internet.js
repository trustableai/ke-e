/**
 * @module
 */
import {fromGenMaker} from '../arbitrary';
import person from './person';
import {nat} from './number';
import {oneOf,
        pair,
        nearray,
        elements,
        constant} from '../combinators';

const userNameSep = elements(['.', '_', '']);
const userNameSuffix = oneOf([nat.choose(1, 99), constant('')]);

/**
 * Arbitrary to produce internet user name.
 *
 * @type {Arbitrary}
 * @example
 *
 * // returns jack or jack.hand or jack.hand34.
 * ke.internet.userName.generate();
 *
 */
const userName = fromGenMaker(function(firstName, lastName, sepArb) {
  return function(engine) {
    let a = firstName.makeGen()(engine);
    let b = lastName.makeGen()(engine);
    let sep = sepArb.makeGen()(engine);
    let suffix = userNameSuffix.makeGen()(engine);
    let n = nat.choose(0, 1).makeGen()(engine);
    let result = n === 0 ? `${a}` : `${a}${sep}${b}${suffix}`;
    return result;
  };
}, [person.firstName, person.lastName, userNameSep]).name('Internet User Name');

const freeEmailProvider = elements([
  'gmail.com',
  'yahoo.com',
  'hotmail.com'
]).name('Free Email Provider');

/**
 * Arbitrary to produce an email.
 *
 * @type {Arbitrary}
 * @example
 * // returns jack.hand@gmail.com
 * ke.internet.email.generate();
 */
const email = fromGenMaker(function(userName, provider) {
  return function(engine) {
    let a = userName.makeGen()(engine);
    let b = provider.makeGen()(engine);
    return `${a}@${b}`;
  };
}, [userName, freeEmailProvider]).name('Email');

const proto = elements(['http', 'https']).name('Internet Protocol');

const domainWord = person.firstName.transform((name) => {
  return name.replace(/([\\~#&*{}/:<>?|\"'])/ig, '').toLowerCase();
}).name('Domain Word');

const domainSuffix = elements([
  'com',
  'org',
  'io',
  'info',
  'today'
]).name('Domain Suffix');

const domainName = pair(domainWord, domainSuffix)
        .transform((arr) => `${arr[0]}.${arr[1]}`).name('Domain Name');

/**
 * Arbitrary to produce an url.
 *
 * @type {Arbitrary}
 */
const url = pair(proto, domainName).
        transform((arr) => `${arr[0]}://${arr[1]}`).name('URL');

const ipRange = nat.choose(0, 255).name('IP Range');

/**
 * Arbitrary to produce an IP v4 address.
 *
 * @type {Arbitrary}
 */
const ip = nearray(ipRange).choose(4, 4)
        .transform(arr => arr.join('.'))
        .name('IP v4 Address');

const ipV6Range = nat.choose(0, 15)
        .transform(n => n.toString(16))
        .name('IPV6 Range');

const ipv6Block = nearray(ipV6Range)
        .choose(4, 4)
        .transform(arr => arr.join(''))
        .name('IPV6 Block');

/**
 * Arbitrary to produce an IP v6 address.
 *
 * @type {Arbitrary}
 */
const ipv6 = nearray(ipv6Block)
        .choose(8, 8)
        .transform(arr => arr.join(':'))
        .name('IP v6 Address');

export default {
  userName,
  email,
  url,
  ip,
  ipv6
};
