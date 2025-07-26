"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleWorker = exports.updateUserRole = exports.updateUser = exports.enableUser = exports.disableUser = exports.getAllWorkers = exports.createUserController = void 0;
const workersRepositories_1 = __importDefault(require("../repository/workersRepositories"));
const authHelpers_1 = require("../helpers/authHelpers");
const emailService_1 = require("../service/emailService");
const createUserController = async (req, res, next) => {
    try {
        const fullNameWords = `${req.body.firstName} ${req.body.lastName}`.trim().split(/\s+/);
        req.body.username = fullNameWords.join('-').toLowerCase();
        const generatedPassword = await (0, authHelpers_1.hashPassword)("1234");
        req.body.password = generatedPassword;
        const user = await workersRepositories_1.default.createUser(req.body);
        try {
            await (0, emailService_1.sendEmail)(user.email, "Account created successfully", 'Welcome to Kickside Rwanda', `
                <b>Welcome to Kickside Rwanda!</b>
                <p>
                We are thrilled to have you as part of our team as a <b>${req.body.role}</b>. It is a great pleasure to connect with you and witness your potential contribution to our platform.

                To get started, please log in to our platform using the following credentials:

                Email: ${user.email}
                Default Password: 1234

                For your security, we highly encourage you to change the default password upon logging in.

                If you have any questions or require assistance, feel free to reach out.
                <br/>
                Best regards,
                <br/>
                Kickside Rwanda Team
                </p>
                `);
        }
        catch (emailError) {
            console.warn("Email sending failed, but continuing:", emailError.message || emailError);
        }
        res.status(201).json({
            status: 201,
            message: 'Worker created successfully.',
            user,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.createUserController = createUserController;
const getAllWorkers = async (req, res, next) => {
    try {
        const workers = await workersRepositories_1.default.findAllWorkers(req.user._id);
        return res.status(200).json({
            status: 200,
            message: "Workers Retrieved Successfully",
            data: { workers }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.getAllWorkers = getAllWorkers;
const disableUser = async (req, res, next) => {
    try {
        req.body.isDisabled = true;
        if (req.user.isDisabled === true) {
            return res.status(400).json({
                status: 400,
                message: "User is already disabled."
            });
        }
        const disabledUser = await workersRepositories_1.default.updateUser(req.user._id, req.body);
        await (0, emailService_1.sendEmail)(req.user.email, "Account disabled.", 'Your account is disabled', `
            <p><b>Your Kickside Account Has Been Disabled</b></p>
            <p>We regret to inform you that your Kickside account has been disabled for the following reason:</p>
            <p class="reason">${req.body.disableReason}</p>
            <p>We are honored to have you as part of our team, serving as a <b>${req.user.role}</b>. We truly appreciate the efforts you have contributed to our platform.</p>
            <p>If you believe this action was taken in error or you need further clarification, please contact our support team for assistance.</p>
            <p>We value your association with Kickside and hope to resolve any concerns promptly.</p>
            <p>Best regards,</p>
            <p><b>Kickside Rwanda Team</b></p>
            `);
        return res.status(200).json({
            status: 200,
            message: "User Account Disabled Successfully",
            data: { disabledUser }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};
exports.disableUser = disableUser;
const enableUser = async (req, res, next) => {
    try {
        req.body.isDisabled = false;
        if (req.user.isDisabled === false) {
            return res.status(400).json({
                status: 400,
                message: "User is already enabled."
            });
        }
        const enabledUser = await workersRepositories_1.default.updateUser(req.user._id, req.body);
        await (0, emailService_1.sendEmail)(req.user.email, "Account enabled.", 'Your account is enabled', `
             <p>We are delighted to inform you that your Kickside account has been re-enabled. It’s great to have you back with us!</p>
            <p>We appreciate your dedication and contribution as a valued team member in your role as <b>${req.user.role}</b>. 
            <br> We are excited to see your continued impact on our platform and community.</p>
            <p>If you have any questions or encounter any issues, feel free to contact our support team. We’re here to assist you!</p>
            <p>Once again, welcome back, and we look forward to working with you!</p>
            <p>Best regards,</p>
            <p><b>Kickside Rwanda Team</b></p>
            `);
        return res.status(200).json({
            status: 200,
            message: "User Account Enabled Successfully",
            data: { enabledUser }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.enableUser = enableUser;
const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await workersRepositories_1.default.updateUser(req.user._id, req.body);
        return res.status(200).json({
            status: 200,
            mesage: "User Details Updated Successfully",
            data: { updatedUser }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.messsage
        });
    }
};
exports.updateUser = updateUser;
const updateUserRole = async (req, res) => {
    try {
        const updatedUser = await workersRepositories_1.default.updateUser(req.user._id, req.body);
        await (0, emailService_1.sendEmail)(req.user.email, "User role changed", "Your role has been updated", `
            <p>We would like to inform you that your role on the Kickside platform has been updated. </p>
            <p><b>Previous Role:</b> ${req.user.role}</p>
            <p><b>New Role:</b> ${req.body.role}</p>
            <p>This change reflects our confidence in your abilities and the value you bring to our team. We believe this new role will allow you to contribute even more effectively to our platform and community.</p>
            <p>If you have any questions about your new role or responsibilities, feel free to reach out to us. We’re here to support you!</p>
            <p>Best regards,</p>
            <p><b>Kickside Rwanda Team</b></p>
            `);
        return res.status(200).json({
            status: 200,
            message: "User Role Changed Successfully",
            data: { updatedUser }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
    ;
};
exports.updateUserRole = updateUserRole;
const getSingleWorker = async (req, res, next) => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Workers Retrieved Successfully",
            data: { worker: req.user }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.getSingleWorker = getSingleWorker;
exports.default = {
    createUserController: exports.createUserController,
    getAllWorkers: exports.getAllWorkers,
    disableUser: exports.disableUser,
    enableUser: exports.enableUser,
    updateUser: exports.updateUser,
    updateUserRole: exports.updateUserRole,
    getSingleWorker: exports.getSingleWorker
};
//# sourceMappingURL=workerscontroller.js.map