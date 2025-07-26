"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquiryRepository_1 = __importDefault(require("../repository/inquiryRepository"));
const emailService_1 = require("../service/emailService");
const createInquiry = async (req, res) => {
    try {
        const { email } = req.body;
        const inquiry = await inquiryRepository_1.default.saveArticleInquiry(req.body);
        await (0, emailService_1.sendEmail)(email, "Inquiry Recieved successfully", 'Your Inquiry is Being Processed', `<p>Thank you for reaching out to Kickside Rwanda. Your inquiry has been received successfully and is currently under review by our team.</p>
            <p>We appreciate your patience as we process your request. Our team will get back to you as soon as possible with the necessary feedback or support.</p>
            <br/>
            <br/>
            Best regards,
            <br/>
           <b> Kickside Rwanda Team</b>
            </p>`);
        return res.status(201).json({
            status: 201,
            message: "Inquiry created successfully",
            data: { inquiry }
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await inquiryRepository_1.default.getAllInquiries();
        return res.status(200).json({
            status: 200,
            message: "Inquiries retrieved successfully",
            data: { inquiries }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const updateInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedInquiry = await inquiryRepository_1.default.updateInquiryStatus(id, status);
        return res.status(200).json({
            status: 200,
            message: "Inquiry updated successfully",
            data: { updatedInquiry }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const getSingleInquiry = async (req, res) => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Inquiry retrieved successfully",
            data: { inquiry: req.inquiry }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.default = {
    createInquiry,
    getAllInquiries,
    updateInquiry,
    getSingleInquiry
};
//# sourceMappingURL=inquirycontroller.js.map