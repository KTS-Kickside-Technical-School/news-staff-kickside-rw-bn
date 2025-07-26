"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleSchema = exports.updateUserSchema = exports.disableUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string(),
    email: joi_1.default.string().required(),
    role: joi_1.default.string().valid('Journalist', 'Editor', 'Admin'),
});
exports.disableUserSchema = joi_1.default.object({
    _id: joi_1.default.string().required(),
    disableReason: joi_1.default.string().required()
});
exports.updateUserSchema = joi_1.default.object({
    _id: joi_1.default.string().required(),
    firstName: joi_1.default.string(),
    lastName: joi_1.default.string(),
    email: joi_1.default.string(),
    password: joi_1.default.string(),
    bio: joi_1.default.string(),
    profile: joi_1.default.string(),
    rank: joi_1.default.string(),
    phone: joi_1.default.string(),
    role: joi_1.default.string()
});
exports.updateRoleSchema = joi_1.default.object({
    _id: joi_1.default.string().required(),
    role: joi_1.default.string().valid('Journalist', 'Editor', 'Admin').required()
});
//# sourceMappingURL=workersValidations.js.map