"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthorization = void 0;
const authHelpers_1 = require("../helpers/authHelpers");
const authRepositories_1 = __importDefault(require("../repository/authRepositories"));
const userAuthorization = function (roles) {
    return async (req, res, next) => {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ status: 401, message: "Not authorized" });
            }
            const decoded = await (0, authHelpers_1.decodeToken)(token);
            const session = await authRepositories_1.default.findSessionByUserIdAndToken(decoded._id, token);
            if (!session) {
                return res
                    .status(401)
                    .json({ status: 401, message: "Not authorized" });
            }
            const user = await authRepositories_1.default.findUserByAttribute("_id", decoded._id);
            if (!user) {
                return res
                    .status(401)
                    .json({ status: 401, message: "Not authorized" });
            }
            if (!roles.includes(user.role)) {
                return res.status(401).json({
                    status: 401, message: "Not authorized"
                });
            }
            req.user = user;
            req.session = session;
            next();
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    };
};
exports.userAuthorization = userAuthorization;
//# sourceMappingURL=authorization.js.map