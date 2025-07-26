"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscriberSchema = exports.subscribersSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.subscribersSchema = joi_1.default.object({
    email: joi_1.default.string().required()
});
exports.unsubscriberSchema = joi_1.default.object({
    token: joi_1.default.string().required(),
    email: joi_1.default.string().required()
});
//# sourceMappingURL=subscribersListValidation.js.map