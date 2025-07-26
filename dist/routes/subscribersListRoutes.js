"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyValidation_1 = __importDefault(require("../middlewares/bodyValidation"));
const subscribersListValidation_1 = require("../validations/subscribersListValidation");
const subscribersListController_1 = __importDefault(require("../controllers/subscribersListController"));
const subscribersListMiddlewares_1 = require("../middlewares/subscribersListMiddlewares");
const subscribersRoute = express_1.default.Router();
subscribersRoute.post("/user-subcription", (0, bodyValidation_1.default)(subscribersListValidation_1.subscribersSchema), subscribersListMiddlewares_1.isSubscriberExist, subscribersListController_1.default.subscribeUserController);
subscribersRoute.get("/user-unsubcription", (0, bodyValidation_1.default)(subscribersListValidation_1.unsubscriberSchema), subscribersListMiddlewares_1.isSubscriber, subscribersListController_1.default.unsubscribeUserController);
subscribersRoute.get("/get-subscription-list", subscribersListController_1.default.getSubscriptionListController);
exports.default = subscribersRoute;
//# sourceMappingURL=subscribersListRoutes.js.map