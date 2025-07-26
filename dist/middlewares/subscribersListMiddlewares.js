"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSubscriberExist = exports.isSubscriber = void 0;
const subscribersListRepository_1 = __importDefault(require("../repository/subscribersListRepository"));
const isSubscriber = async (req, res, next) => {
    try {
        const { email } = req.body;
        const subscribers = await subscribersListRepository_1.default.findSubscriberByEmail(email);
        if (!subscribers) {
            return res.status(404).json({
                status: 404,
                message: "User Not Found"
            });
        }
        req.subscribers = subscribers;
        next();
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.isSubscriber = isSubscriber;
const isSubscriberExist = async (req, res, next) => {
    try {
        const { email } = req.body;
        const checkSubscriber = await subscribersListRepository_1.default.findSubscriberByEmail(email);
        if (checkSubscriber) {
            return res.status(400).json({
                status: 400,
                message: "You have arleady subscribed to our newsletter."
            });
        }
        next();
    }
    catch (error) {
        res.status(500).jon({
            status: 500,
            message: error.message
        });
    }
};
exports.isSubscriberExist = isSubscriberExist;
exports.default = {
    isSubscriber: exports.isSubscriber,
    isSubscriberExist: exports.isSubscriberExist
};
//# sourceMappingURL=subscribersListMiddlewares.js.map