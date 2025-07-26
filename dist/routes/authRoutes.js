"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const bodyValidation_1 = __importDefault(require("../middlewares/bodyValidation"));
const authValidations_1 = require("../validations/authValidations");
const authControllers_1 = __importDefault(require("../controllers/authControllers"));
const authorization_1 = require("../middlewares/authorization");
const authRoute = express_1.default.Router();
authRoute.post("/login", (0, bodyValidation_1.default)(authValidations_1.userLoginSchema), authMiddleware_1.isUserExists, authControllers_1.default.userLogin);
authRoute.post("/forgot-password", (0, bodyValidation_1.default)(authValidations_1.forgotPasswordSchema), authMiddleware_1.isUserExists, authControllers_1.default.forgotPassword);
authRoute.post("/reset-password", (0, bodyValidation_1.default)(authValidations_1.resetPasswordSchema), authControllers_1.default.resetPassword);
authRoute.post("/logout", (0, authorization_1.userAuthorization)(["Admin", "Journalist", "Editor"]), authControllers_1.default.userLogout);
authRoute.get("/get-profile", (0, authorization_1.userAuthorization)(["Admin", "Journalist", "Editor"]), authControllers_1.default.getUserProfile);
authRoute.put("/update-profile", (0, authorization_1.userAuthorization)(["Admin", "Editor", "Journalist"]), authControllers_1.default.updateUserProfile);
exports.default = authRoute;
//# sourceMappingURL=authRoutes.js.map