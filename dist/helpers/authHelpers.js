"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenBlacklisted = exports.destroyToken = exports.comparePassword = exports.decodeToken = exports.generateToken = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword = async (password) => {
    return await bcrypt_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
const generateToken = async (_id) => {
    return await jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET);
};
exports.generateToken = generateToken;
const decodeToken = (token) => {
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        console.error("Token verification error:", error.message);
        return { status: 401, message: "Token verification failed" };
    }
};
exports.decodeToken = decodeToken;
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const blacklist = new Set();
const destroyToken = async (token) => {
    blacklist.add(token); // Add token to the blacklist
};
exports.destroyToken = destroyToken;
const isTokenBlacklisted = (token) => {
    return blacklist.has(token);
};
exports.isTokenBlacklisted = isTokenBlacklisted;
//# sourceMappingURL=authHelpers.js.map