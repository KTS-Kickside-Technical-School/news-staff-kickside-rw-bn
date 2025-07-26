"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.updateProfileSchema = exports.logoutSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.userLoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userLoginSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().required()
});
exports.resetPasswordSchema = joi_1.default.object({
    password: joi_1.default.string().required(),
    token: joi_1.default.string().required()
});
exports.logoutSchema = joi_1.default.object({
    token: joi_1.default.string().required()
});
exports.updateProfileSchema = joi_1.default.object({
    firstName: joi_1.default.string().optional(),
    lastName: joi_1.default.string().optional(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().optional(),
    password: joi_1.default.string().optional(),
    bio: joi_1.default.string().optional(),
    profile: joi_1.default.string().optional(),
    phone: joi_1.default.string().optional()
});
exports.changePasswordSchema = joi_1.default.object({
    password: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required()
});
//# sourceMappingURL=authValidations.js.map