"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWorkerAlreadyExists = void 0;
const workersRepositories_1 = __importDefault(require("../repository/workersRepositories"));
const isWorkerAlreadyExists = async (req, res, next) => {
    try {
        const worker = await workersRepositories_1.default.findWorkerByAttribute("email", req.body.email);
        if (worker) {
            return res.status(400).json({
                status: 400,
                message: "Worker already exists"
            });
        }
        return next();
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.isWorkerAlreadyExists = isWorkerAlreadyExists;
//# sourceMappingURL=workersMiddleware.js.map