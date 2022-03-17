"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classExtends = exports.isClass = void 0;
/**
 * Determines whether or not a value is a class.
 * @param value The piece to be checked.
 * @private
 */
function isClass(value) {
    return typeof value === 'function' && typeof value.prototype === 'object';
}
exports.isClass = isClass;
/**
 * Checks whether or not the value class extends the base class.
 * @param value The constructor to be checked against.
 * @param base The base constructor.
 * @private
 */
function classExtends(value, base) {
    let ctor = value;
    while (ctor !== null) {
        if (ctor.constructor === base.constructor)
            return true;
        ctor = Object.getPrototypeOf(ctor);
    }
    return false;
}
exports.classExtends = classExtends;
//# sourceMappingURL=Shared.js.map