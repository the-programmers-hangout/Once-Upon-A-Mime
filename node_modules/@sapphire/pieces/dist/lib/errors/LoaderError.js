"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderError = exports.LoaderErrorType = void 0;
var LoaderErrorType;
(function (LoaderErrorType) {
    LoaderErrorType["EmptyModule"] = "EMPTY_MODULE";
    LoaderErrorType["UnloadedPiece"] = "UNLOADED_PIECE";
    LoaderErrorType["IncorrectType"] = "INCORRECT_TYPE";
})(LoaderErrorType = exports.LoaderErrorType || (exports.LoaderErrorType = {}));
/**
 * Describes a loader error with a type for easy indentification.
 */
class LoaderError extends Error {
    constructor(type, message) {
        super(message);
        /**
         * The type of the error that was thrown.
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.type = type;
    }
    get name() {
        return `${super.name} [${this.type}]`;
    }
}
exports.LoaderError = LoaderError;
//# sourceMappingURL=LoaderError.js.map