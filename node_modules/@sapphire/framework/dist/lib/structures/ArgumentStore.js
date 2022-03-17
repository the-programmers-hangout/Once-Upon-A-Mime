"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentStore = void 0;
const pieces_1 = require("@sapphire/pieces");
const Argument_1 = require("./Argument");
class ArgumentStore extends pieces_1.AliasStore {
    constructor() {
        super(Argument_1.Argument, { name: 'arguments' });
    }
}
exports.ArgumentStore = ArgumentStore;
//# sourceMappingURL=ArgumentStore.js.map