"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../database/models/user"));
const findWorkerByAttribute = async (key, value) => {
    return user_1.default.findOne({ [key]: value });
};
const createUser = async (userData) => {
    return await user_1.default.create(userData);
};
const findAllWorkers = async (excludeId, filter = {}, sort = 'createdAt') => {
    const finalFilter = { ...filter, _id: { $ne: excludeId } };
    const workers = await user_1.default.find(finalFilter, '-password').sort(sort);
    return workers;
};
const updateUser = async (id, data) => {
    return await user_1.default.findByIdAndUpdate(id, data, { new: true });
};
const getUserById = async (id) => {
    return await user_1.default.findById(id);
};
exports.default = {
    findWorkerByAttribute,
    createUser,
    findAllWorkers,
    updateUser,
    getUserById
};
//# sourceMappingURL=workersRepositories.js.map