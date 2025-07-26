"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInquiryExist = void 0;
const inquiryRepository_1 = __importDefault(require("../repository/inquiryRepository"));
const checkInquiryExist = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("ID", id);
        const inquiry = await inquiryRepository_1.default.findInquiryByAttribute("_id", id);
        if (!inquiry) {
            return res.staus(404).json({
                status: 404,
                message: "Inquiry Not Found"
            });
        }
        ;
        req.inquiry = inquiry;
        next();
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};
exports.checkInquiryExist = checkInquiryExist;
exports.default = {
    checkInquiryExist: exports.checkInquiryExist
};
//# sourceMappingURL=inquiryMiddleware.js.map