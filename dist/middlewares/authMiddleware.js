"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserExistByUsername = exports.isUserExistsById = exports.isUserExists = void 0;
const authRepositories_1 = __importDefault(require("../repository/authRepositories"));
const isUserExists = async (req, res, next) => {
    try {
        const user = await authRepositories_1.default.findUserByAttribute("email", req.body.email);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }
        req.user = user;
        return next();
    }
    catch (error) {
        console.error("Error checking user existences", error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.isUserExists = isUserExists;
const isUserExistsById = async (req, res, next) => {
    try {
        const id = req.body._id || req.params.userId;
        const user = await authRepositories_1.default.findUserByAttribute("_id", id);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }
        req.user = user;
        return next();
    }
    catch (error) {
        console.error("Error checking user existences", error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.isUserExistsById = isUserExistsById;
const isUserExistByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({
                status: 400,
                message: "Username is required."
            });
        }
        const user = await authRepositories_1.default.findUserByUsernames(username);
        if (!user) {
            return res.status(404).json({
                statu: 404,
                message: `Author with "${username}" Username is not found.`
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.isUserExistByUsername = isUserExistByUsername;
//# sourceMappingURL=authMiddleware.js.map