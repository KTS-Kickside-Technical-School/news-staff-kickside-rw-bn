"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postArticleComment = exports.editArticleSchema = exports.newArticleSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.newArticleSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    coverImage: joi_1.default.string().required(),
    category: joi_1.default.string().required()
});
exports.editArticleSchema = joi_1.default.object({
    title: joi_1.default.string(),
    content: joi_1.default.string(),
    coverImage: joi_1.default.string(),
    category: joi_1.default.string(),
    status: joi_1.default.string()
});
exports.postArticleComment = joi_1.default.object({
    article: joi_1.default.string().required(),
    email: joi_1.default.string(),
    names: joi_1.default.string(),
    comment: joi_1.default.string().required()
});
//# sourceMappingURL=articlesValidations.js.map