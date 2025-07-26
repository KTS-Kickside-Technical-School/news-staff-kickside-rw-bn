"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workerscontroller_1 = __importDefault(require("../controllers/workerscontroller"));
const workersValidations_1 = require("../validations/workersValidations");
const bodyValidation_1 = __importDefault(require("../middlewares/bodyValidation"));
const authorization_1 = require("../middlewares/authorization");
const workersMiddleware_1 = require("../middlewares/workersMiddleware");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const workersRoute = express_1.default.Router();
workersRoute.post("/create-user", (0, authorization_1.userAuthorization)(["Admin"]), (0, bodyValidation_1.default)(workersValidations_1.createUserSchema), workersMiddleware_1.isWorkerAlreadyExists, workerscontroller_1.default.createUserController);
workersRoute.get("/get-all-users", (0, authorization_1.userAuthorization)(["Admin"]), workerscontroller_1.default.getAllWorkers);
workersRoute.get("/get-single-user/:userId", (0, authorization_1.userAuthorization)(["Admin"]), authMiddleware_1.isUserExistsById, workerscontroller_1.default.getSingleWorker);
workersRoute.put("/disable-user", (0, authorization_1.userAuthorization)(["Admin"]), (0, bodyValidation_1.default)(workersValidations_1.disableUserSchema), authMiddleware_1.isUserExistsById, workerscontroller_1.default.disableUser);
workersRoute.put("/enable-user/:userId", (0, authorization_1.userAuthorization)(["Admin"]), authMiddleware_1.isUserExistsById, workerscontroller_1.default.enableUser);
workersRoute.put("/update-user", (0, authorization_1.userAuthorization)(["Admin"]), (0, bodyValidation_1.default)(workersValidations_1.updateUserSchema), authMiddleware_1.isUserExistsById, workerscontroller_1.default.updateUser);
workersRoute.put("/update-user-role", (0, authorization_1.userAuthorization)(["Admin"]), (0, bodyValidation_1.default)(workersValidations_1.updateRoleSchema), authMiddleware_1.isUserExistsById, workerscontroller_1.default.updateUserRole);
exports.default = workersRoute;
//# sourceMappingURL=workersRoutes.js.map