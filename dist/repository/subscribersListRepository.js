"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subscribersList_1 = __importDefault(require("../database/models/subscribersList"));
const saveSubscibers = async (data) => {
    return await subscribersList_1.default.create(data);
};
const findSubscriberByEmail = async (email) => {
    return await subscribersList_1.default.findOne({ email });
};
const unsubscriber = async (email) => {
    return await subscribersList_1.default.findOneAndDelete({ email });
};
const getSubscribersList = async () => {
    return await subscribersList_1.default.find({}).sort({ createdAt: -1 });
};
exports.default = {
    saveSubscibers,
    findSubscriberByEmail,
    unsubscriber,
    getSubscribersList
};
//# sourceMappingURL=subscribersListRepository.js.map