"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMaybe = exports.isNone = exports.isSome = exports.none = exports.some = exports.maybe = void 0;
function maybe(value) {
    return isMaybe(value) ? value : value === null ? none() : some(value);
}
exports.maybe = maybe;
function some(x) {
    return { exists: true, value: x };
}
exports.some = some;
/**
 * Creates a None value.
 * @return A non-existing Maybe.
 */
function none() {
    return { exists: false };
}
exports.none = none;
/**
 * Determines whether or not a Maybe is a Some.
 * @typeparam T The value's type.
 */
function isSome(x) {
    return x.exists;
}
exports.isSome = isSome;
/**
 * Determines whether or not a Maybe is a None.
 * @typeparam T The value's type.
 */
function isNone(x) {
    return !x.exists;
}
exports.isNone = isNone;
function isMaybe(x) {
    return typeof x === 'object' && x !== null && typeof Reflect.get(x, 'exists') === 'boolean';
}
exports.isMaybe = isMaybe;
//# sourceMappingURL=Maybe.js.map