"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_PROD_DB
    : process.env.NODE_ENV === 'test'
        ? process.env.MONGO_TEST_DB
        : process.env.MONGO_DEV_DB;
const connect = async () => {
    try {
        if (!uri) {
            throw new Error('Database URI is not defined!');
        }
        await mongoose_1.default.connect(uri);
        console.log('Database connected successfully!');
    }
    catch (error) {
        console.error(`Database connection error: ${error}`);
        process.exit(1);
    }
};
exports.connect = connect;
//# sourceMappingURL=config.js.map