"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articlesRoutes_1 = __importDefault(require("./articlesRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const workersRoutes_1 = __importDefault(require("./workersRoutes"));
const inquiryRoutes_1 = __importDefault(require("./inquiryRoutes"));
const subscribersListRoutes_1 = __importDefault(require("./subscribersListRoutes"));
const indexRoute = express_1.default.Router();
indexRoute.use("/auth", authRoutes_1.default);
indexRoute.use("/articles", articlesRoutes_1.default);
indexRoute.use("/workers", workersRoutes_1.default);
indexRoute.use("/inquiry", inquiryRoutes_1.default);
indexRoute.use("/subscribers", subscribersListRoutes_1.default);
exports.default = indexRoute;
//# sourceMappingURL=index.js.map