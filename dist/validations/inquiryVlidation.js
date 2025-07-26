"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInquirySchema = exports.inquirySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.inquirySchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string(),
    email: joi_1.default.string().required(),
    topic: joi_1.default.string().required(),
    message: joi_1.default.string().required(),
});
exports.updateInquirySchema = joi_1.default.object({
    status: joi_1.default.string().required().valid("pending", "solved")
});
//# sourceMappingURL=inquiryVlidation.js.map