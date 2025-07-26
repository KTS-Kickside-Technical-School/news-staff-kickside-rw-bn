"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquiry_1 = __importDefault(require("../database/models/inquiry"));
const saveArticleInquiry = async (data) => {
    return await inquiry_1.default.create(data);
};
const getAllInquiries = async () => {
    return await inquiry_1.default.find().sort({ createdAt: -1 });
};
const updateInquiryStatus = async (_id, status) => {
    return await inquiry_1.default.findByIdAndUpdate(_id, { status: status }, { new: true });
};
const findInquiryByAttribute = async (key, value) => {
    return await inquiry_1.default.findOne({ [key]: value });
};
exports.default = {
    saveArticleInquiry,
    getAllInquiries,
    updateInquiryStatus,
    findInquiryByAttribute
};
//# sourceMappingURL=inquiryRepository.js.map