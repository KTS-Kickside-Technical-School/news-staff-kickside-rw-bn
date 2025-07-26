"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = void 0;
const authHelpers_1 = require("../helpers/authHelpers");
const authRepositories_1 = __importDefault(require("../repository/authRepositories"));
const emailService_1 = require("../service/emailService");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userLogin = async (req, res) => {
    try {
        const isPasswordMatch = await (0, authHelpers_1.comparePassword)(req.body.password, req.user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                status: 401,
                message: "Email or Password is not correct.",
            });
        }
        if (req.user.isDisabled === true) {
            return res.status(401).json({
                status: 401,
                message: "Your account has been disabled. Please contact the administrator."
            });
        }
        const token = await (0, authHelpers_1.generateToken)(req.user._id);
        const session = await authRepositories_1.default.saveSession({
            user: req.user._id,
            content: token
        });
        const device = req.headers["user-agent"] || "Unknown Devices";
        const ip = req.ip || req.connection.remoteAddress;
        // await sendEmail(req.user.email, 'New Login Detected - Kickside Rw',
        //     'New Account Login',
        //     `<p>New login was detected to you account on <b>${device}</b> with this IP address: <b>${ip}</b>, if this was not you try reseting password.</p>`
        // );
        return res.status(200).json({
            status: 200,
            message: "Login successful",
            user: req.user,
            session
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const resetToken = await (0, authHelpers_1.generateToken)(req.user._id);
        const session = await authRepositories_1.default.saveSession({ user: req.user._id, content: resetToken });
        const reseLink = `${process.env.CLIENT_URL}/staff/reset-password?token=${resetToken}`;
        await (0, emailService_1.sendEmail)(email, "Password reset requested", 'Password Reset Process', `<p>You have request to reset your password,
             click  <a href="${reseLink}">here</a> to reset your password. This link expires in 1 hour.</p>
            <br/>
            Best regards,
            <br/>
           <b> Kickside Rwanda Team</b>
            </p>`);
        return res.status(200).json({
            status: 200,
            message: "Password reset email sent successfully",
            data: { session }
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.messsage
        });
    }
};
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const decoded = (0, authHelpers_1.decodeToken)(token);
        if (!decoded || !decoded._id) {
            return res.status(400).json({
                status: 400,
                message: "Invalid or expired token"
            });
        }
        const user = await authRepositories_1.default.findUserByAttribute("_id", decoded._id);
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Invalid token  or user not found"
            });
        }
        ;
        const session = await authRepositories_1.default.findSessionByUserIdAndToken(user._id, token);
        if (!session) {
            return res.status(400).json({ status: 400, message: "Token expired or invalid" });
        }
        await authRepositories_1.default.deleteSession(session._id);
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await authRepositories_1.default.updateUser(user._id, { password: hashedPassword });
        return res.status(200).json({
            status: 200,
            message: "Password reset successsfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
    ;
};
const userLogout = async (req, res) => {
    try {
        await (0, authHelpers_1.destroyToken)(req.session.content);
        await authRepositories_1.default.deleteSession(req.session._id);
        return res.status(200).json({
            status: 200,
            message: "Logout successful"
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};
const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({
            status: 200,
            message: "User Profile Fetched Successfully",
            data: { user }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(req.body);
        const updatedProfile = await authRepositories_1.default.updateUser(userId, req.body);
        return res.status(200).json({
            status: 200,
            message: "User profile updated successfully",
            data: { updatedProfile }
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.updateUserProfile = updateUserProfile;
exports.default = {
    userLogin,
    forgotPassword,
    resetPassword,
    userLogout,
    getUserProfile: exports.getUserProfile,
    updateUserProfile: exports.updateUserProfile,
};
//# sourceMappingURL=authControllers.js.map