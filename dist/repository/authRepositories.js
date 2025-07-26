"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRelatedJournalists = exports.findArticlesByAuthor = exports.findUserByUsernames = exports.deleteSession = exports.updateUser = void 0;
const article_1 = __importDefault(require("../database/models/article"));
const session_1 = __importDefault(require("../database/models/session"));
const user_1 = __importDefault(require("../database/models/user"));
const findUserByAttribute = async (key, value) => {
    return await user_1.default.findOne({ [key]: value }).select("+password");
};
const saveSession = async (data) => {
    return await session_1.default.create(data);
};
const findSessionByUserIdAndToken = async (user, content) => {
    return await session_1.default.findOne({ user, content });
};
const updateUser = async (userId, updateData) => {
    return await user_1.default.findByIdAndUpdate(userId, updateData, { new: true });
};
exports.updateUser = updateUser;
const deleteSession = async (sessionId) => {
    return await session_1.default.findByIdAndDelete(sessionId);
};
exports.deleteSession = deleteSession;
const getUserById = async (id) => {
    return await user_1.default.findById(id);
};
const findUserByUsernames = async (username) => {
    return await user_1.default.findOne({ username,
        isDisabled: false
    });
};
exports.findUserByUsernames = findUserByUsernames;
const findArticlesByAuthor = async (authorId) => {
    return await article_1.default.find({ author: authorId, status: "published" })
        .sort({ createdAt: -1 });
};
exports.findArticlesByAuthor = findArticlesByAuthor;
const findRelatedJournalists = async (currentUserId) => {
    return await user_1.default.find({ _id: { $ne: currentUserId }, isDisabled: false })
        .select("firstName lastName bio username profile")
        .limit(5);
};
exports.findRelatedJournalists = findRelatedJournalists;
exports.default = {
    findUserByAttribute,
    saveSession,
    findSessionByUserIdAndToken,
    updateUser: exports.updateUser,
    deleteSession: exports.deleteSession,
    getUserById,
    findUserByUsernames: exports.findUserByUsernames,
    findArticlesByAuthor: exports.findArticlesByAuthor,
    findRelatedJournalists: exports.findRelatedJournalists
};
//# sourceMappingURL=authRepositories.js.map