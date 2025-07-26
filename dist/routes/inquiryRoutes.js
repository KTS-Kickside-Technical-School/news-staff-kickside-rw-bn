"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyValidation_1 = __importDefault(require("../middlewares/bodyValidation"));
const inquiryVlidation_1 = require("../validations/inquiryVlidation");
const inquirycontroller_1 = __importDefault(require("../controllers/inquirycontroller"));
const authorization_1 = require("../middlewares/authorization");
const inquiryMiddleware_1 = require("../middlewares/inquiryMiddleware");
const inquiryRoute = express_1.default.Router();
inquiryRoute.post("/create-inquiry", (0, bodyValidation_1.default)(inquiryVlidation_1.inquirySchema), inquirycontroller_1.default.createInquiry);
inquiryRoute.get("/get-all-inquiries", (0, authorization_1.userAuthorization)(["Admin"]), inquirycontroller_1.default.getAllInquiries);
inquiryRoute.get("/get-single-inquiry/:id", (0, authorization_1.userAuthorization)(["Admin"]), inquiryMiddleware_1.checkInquiryExist, inquirycontroller_1.default.getSingleInquiry);
inquiryRoute.patch("/update-status/:id", (0, authorization_1.userAuthorization)(["Admin"]), (0, bodyValidation_1.default)(inquiryVlidation_1.updateInquirySchema), inquiryMiddleware_1.checkInquiryExist, inquirycontroller_1.default.updateInquiry);
exports.default = inquiryRoute;
//# sourceMappingURL=inquiryRoutes.js.map